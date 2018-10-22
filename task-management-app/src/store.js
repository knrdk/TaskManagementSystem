import Vue from 'vue';
import Vuex from 'vuex';
import Uuid from 'uuid/v4';

Vue.use(Vuex);

function CreateTodoItem(name) {
  return {
    name,
    id: Uuid(),
    color: '',
  };
}

function CreateList(name) {
  return {
    id: Uuid(),
    name,
    todos: [CreateTodoItem('First item'), CreateTodoItem('Second item'), CreateTodoItem('Third item')],
  };
}

export default new Vuex.Store({
  state: {
    lists: [CreateList('ToDo'), CreateList('In Progress'), CreateList('Done')],
  },
  mutations: {
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
