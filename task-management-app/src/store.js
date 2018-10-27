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

let wasListLoaded = false;
export default new Vuex.Store({
  state: {
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
      console.log(todoName);
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
  },
  actions: {
    [Actions.LOAD_LIST]({ commit }) {
      if (wasListLoaded) {
        return;
      }
      axios.get('/api/TodoList')
        .then((result) => {
          wasListLoaded = true;
          commit(Mutations.SET_LISTS, result.data);
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
