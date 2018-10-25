import Vue from 'vue';
import Vuex from 'vuex';
import Uuid from 'uuid/v4';
import axios from 'axios';
import { defaultColor, allColors } from './constants/availableColors';
import ConvertApiDtoToLocalModel from './mappers/TodoListMapper';

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
    setLists(state, lists) {
      state.lists.push(...ConvertApiDtoToLocalModel(lists));
    },
    addNewList(state, name) {
      state.lists.push(CreateList(name));
    },
    addTodo(state, { listId, todoName }) {
      console.log(todoName);
      const list = this.getters.getListById(listId);
      const item = CreateTodoItem(todoName);
      list.todos.push(item);
    },
    deleteTodo(state, { listId, todoId }) {
      const todos = this.getters.getTodosForList(listId);
      const element = todos.find(x => x.id === todoId);
      todos.splice(element, 1);
    },
    changeTodoColor(state, { todoId, newColor }) {
      const todo = this.getters.getTodoById(todoId);
      todo.color = newColor;
    },
  },
  actions: {
    loadList({ commit }) {
      if (wasListLoaded) {
        return;
      }
      axios.get('/api/TodoList')
        .then((result) => {
          wasListLoaded = true;
          commit('setLists', result.data);
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
