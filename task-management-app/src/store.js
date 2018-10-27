import Vue from 'vue';
import Vuex from 'vuex';
import Uuid from 'uuid/v4';
import axios from 'axios';
import { defaultColor, allColors } from './constants/availableColors';
import ConvertApiDtoToLocalModel from './mappers/TodoListMapper';
import * as Mutations from './constants/mutations';
import * as Actions from './constants/actions';

Vue.use(Vuex);

function CreateTodoItem(name) {
  return {
    name,
    id: Uuid(),
    color: defaultColor,
  };
}

function CreateList(name) {
  return {
    id: Uuid(),
    name,
    todos: [],
  };
}

function GetAuthorizationHeader(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

let wasListLoaded = false;

export default new Vuex.Store({
  state: {
    authentication: {
      isAuthenticated: false,
      token: '',
    },
    lists: [],
    availableColors: allColors,
  },
  mutations: {
    [Mutations.SET_LISTS](state, lists) {
      state.lists.push(...ConvertApiDtoToLocalModel(lists));
    },
    [Mutations.ADD_NEW_LIST](state, name) {
      state.lists.push(CreateList(name));
    },
    [Mutations.ADD_TODO](state, { listId, todoName }) {
      const list = this.getters.getListById(listId);
      const item = CreateTodoItem(todoName);
      list.todos.push(item);
    },
    [Mutations.DELETE_TODO](state, { listId, todoId }) {
      const todos = this.getters.getTodosForList(listId);
      const element = todos.find(x => x.id === todoId);
      todos.splice(element, 1);
    },
    [Mutations.CHANGE_TODO_COLOR](state, { todoId, newColor }) {
      const todo = this.getters.getTodoById(todoId);
      todo.color = newColor;
    },
    [Mutations.CHANGE_AUTHENTICATION_TOKEN](state, token) {
      const { authentication } = state;
      localStorage.setItem('token', token);
      authentication.token = token;
    },
    [Mutations.CHANGE_AUTHENTICATION_STATUS](state, isAuthenticated) {
      const { authentication } = state;
      authentication.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    [Actions.LOAD_LIST]({ commit }) {
      if (wasListLoaded || !this.state.authentication.isAuthenticated) {
        return;
      }

      const config = GetAuthorizationHeader(this.state.authentication.token);
      axios.get('/api/TodoList', config)
        .then((result) => {
          wasListLoaded = true;
          commit(Mutations.SET_LISTS, result.data);
        })
        .catch(console.error);
    },
    [Actions.LOGIN]({ commit }, user) {
      axios.post('api/authentication', { userName: user.name, password: user.password })
        .then((result) => {
          const { data } = result;
          commit(Mutations.CHANGE_AUTHENTICATION_TOKEN, data);
          commit(Mutations.CHANGE_AUTHENTICATION_STATUS, true);
        })
        .catch(console.error);
    },
    [Actions.LOAD_TOKEN_FROM_LOCAL_STORAGE]({ commit }) {
      const token = localStorage.getItem('token');

      const config = GetAuthorizationHeader(token);

      axios.get('/api/authentication', config)
        .then(() => {
          commit(Mutations.CHANGE_AUTHENTICATION_TOKEN, token);
          commit(Mutations.CHANGE_AUTHENTICATION_STATUS, true);
        })
        .catch(console.error);
    },
  },
  getters: {
    getListById: state => id => state.lists.find(x => x.id === id),
    getTodosForList: (state, getters) => (id) => {
      const { todos } = getters.getListById(id);
      return todos;
    },
    getTodoById: state => (id) => {
      for (let i = 0; i < state.lists.length; i += 1) {
        const list = state.lists[i];
        const element = list.todos.find(x => x.id === id);
        if (element) {
          return element;
        }
      }
      return {}; // TODO error handling
    },
  },
});
