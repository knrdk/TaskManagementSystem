<template>
 <div class="todo-list">
    <div class="header">
      {{name}}
    </div>
    <div class="footer">
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
      <Draggable v-for="(item, index) in items" :key="`todo-${index}`">
        <div class="todo-item">
            {{item}} <a @click="deleteItem(index)" class="delete-todo-link">[Delete]</a>
        </div>
      </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';

export default {
  components: { Container, Draggable },
  props: ['name'],
  data() {
    return {
      listName: 'To Do',
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
    getChildPayload(index) {
      return this.items[index];
    },
    onDrop(source, dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult;

      const itemToAdd = removedIndex !== null ? source.splice(removedIndex, 1)[0] : payload;
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
.delete-todo-link {
  color: red;
}
.todo-item {
  border-style: solid;
  border-width: 1px;
  margin: 5px;
  padding: 5px;
}
.todo-list {
  width: 250px;
  background-color: aliceblue;
}
</style>
