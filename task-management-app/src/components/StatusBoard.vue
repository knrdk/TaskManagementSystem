<template>
  <div class="status-board">
      <div class="new-todo">
          <input v-model="newItem"/>
          <button @click="addItem()" :disabled="!newItem">Add</button>
      </div>
    <ul>
        <li v-for="(item, index) in items" :key="`todo-${index}`">
            {{item}} <a @click="deleteItem(index)" class="delete-todo-link">[Delete]</a>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['First item', 'Second item'],
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
  },
};
</script>

<style scoped>
.delete-todo-link {
    color: red;
}
</style>
