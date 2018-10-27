<template>
 <div class="todo-list">
    <div class="header">
      <span class="todo-list-name">{{name}}</span>
      <div class="new-todo">
        <input v-model="newItem"/>
        <button @click="addItem()" :disabled="!newItem">Add</button>
      </div>
    </div>
    <div class="todos">
      <Container
        @drop="onDrop(items, $event)"
        :should-accept-drop="() => true"
        :get-child-payload="getChildPayload">
      <Draggable v-for="item in items" :key="item.id">
        <div
          class="todo-item"
          @click="selectItem(item.id)"
          :style="getTodoColorStyle(item.color)">
            {{item.name}}
            <a @click.stop="deleteItem(item.id)"
            :style="getTodoDeleteColorStyle(item.color)"
            class="delete-todo-link">[Delete]</a>
        </div>
      </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
import todoColorMixin from '../mixins/todoColorMixin';
import { ADD_TODO, DELETE_TODO } from '../constants/mutations';

export default {
  mixins: [todoColorMixin],
  components: { Container, Draggable },
  props: ['id', 'name'],
  data() {
    return {
      newItem: '',
    };
  },
  computed: {
    items() {
      return this.$store.getters.getTodosForList(this.id);
    },
  },
  methods: {
    deleteItem(todoId) {
      const params = {
        listId: this.id,
        todoId,
      };
      this.$store.commit(DELETE_TODO, params);
    },
    addItem() {
      const params = {
        listId: this.id,
        todoName: this.newItem,
      };
      this.$store.commit(ADD_TODO, params);
      this.newItem = '';
    },
    selectItem(todoId) {
      this.$router.push({
        name: 'todoDetails',
        params: {
          todoId,
        },
      });
    },
    getChildPayload(index) {
      return this.items[index];
    },
    onDrop(source, dropResult) {
      // TODO indirect store modification
      const { removedIndex, addedIndex, payload } = dropResult;

      const itemToAdd =
        removedIndex !== null ? source.splice(removedIndex, 1)[0] : payload;
      if (addedIndex !== null) {
        source.splice(addedIndex, 0, itemToAdd);
      }
    },
  },
};
</script>

<style scoped>
.todo-list {
  float: left;
  margin: 10px;
}

.todo-item {
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}
.todo-list {
  width: 250px;
  background-color: aliceblue;
}
.header {
  padding: 5px;
}
.header .todo-list-name {
  font-size: 14pt;
  font-weight: bold;
}
</style>
