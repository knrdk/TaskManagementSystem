<template>
  <div class="status-board">
    <div class="todos">
      <Container @drop="onDrop(items, $event)">
      <Draggable v-for="(item, index) in items" :key="`todo-${index}`">
        <div class="todo-item">
            {{item}} <a @click="deleteItem(index)" class="delete-todo-link">[Delete]</a>
        </div>
      </Draggable>
      </Container>
    </div>
    <div class="footer">
      <div class="new-todo">
          <input v-model="newItem"/>
          <button @click="addItem()" :disabled="!newItem">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';

export default {
  components: { Container, Draggable },
  data() {
    return {
      items: ['First item', 'Second item', 'Third item'],
      newItem: '',
    };
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    addItem() {
      this.items.push(this.newItem);
      this.newItem = '';
    },
    onDrop(source, dropResult) {
      const { removedIndex, addedIndex } = dropResult;

      if (removedIndex !== null && addedIndex !== null) {
        const itemToAdd = source.splice(removedIndex, 1)[0];
        source.splice(addedIndex, 0, itemToAdd);
      }
    },
  },
};
</script>

<style scoped>
.delete-todo-link {
  color: red;
}
.todo-item {
  border-style: solid;
  border-width: 1px;
  margin: 5px;
  padding: 5px;
}
.status-board {
  width: 250px;
  background-color: aliceblue;
}
</style>
