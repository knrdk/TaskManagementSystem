import Vue from 'vue';
import Vuex from 'vuex';
import Uuid from 'uuid/v4';
import axios from 'axios';

Vue.use(Vuex);

const defaultColor = {
  name: 'Default',
  backgroundColor: '#d5e1df',
  fontColor: '#3e4444',
  deleteColor: '#d64161',
};

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

function ConvertItemDto(item) {
  return {
    name: item.name,
    id: item.id,
    color: defaultColor,
  };
}

function ConverListDto(list) {
  return {
    id: list.id,
    name: list.name,
    todos: list.todos.map(ConvertItemDto),
  };
}

function ConvertApiDtoToLocalModel(lists) {
  return lists.map(ConverListDto);
}

function GetColors() {
  return [
    defaultColor,
    {
      name: 'Cherry',
      backgroundColor: '#eca1a6',
      fontColor: '#563f46',
      deleteColor: '#d64161',
    },
    {
      name: 'Banana',
      backgroundColor: '#f2e394',
      fontColor: '#d96459',
      deleteColor: '#d64161',
    },
    {
      name: 'Pear',
      backgroundColor: '#588c7e',
      fontColor: '#96ceb4',
      deleteColor: '#d64161',
    },
    {
      name: 'Sky',
      backgroundColor: '#87bdd8',
      fontColor: '#667292',
      deleteColor: '#d64161',
    },
  ];
}
let wasListLoaded = false;
export default new Vuex.Store({
  state: {
    lists: [], // [CreateList('ToDo'), CreateList('In Progress'), CreateList('Done')],
    availableColors: GetColors(),
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
