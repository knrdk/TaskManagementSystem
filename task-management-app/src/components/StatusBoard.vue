<template>
<div class="status-board">
  <div><h2>Lista tasków</h2></div>
  <TodoList v-for="(name, index) in listNames" :key="index" :name="name"/>
  <div class="new-list">
    <input v-model="newItem"/>
    <button @click="addItem()" :disabled="!newItem">Add new list</button>
  </div>
  </div>
</template>

<script>
import TodoList from './TodoList.vue';

const newListDefaultName = 'New list';

export default{
  components: { TodoList },
  data() {
    return {
      listNames: ['ToDo', 'In Progress', 'Done'],
      newItem: newListDefaultName,
    };
  },
  methods: {
    addItem() {
      this.listNames.push(this.newItem);
      this.newItem = newListDefaultName;
    },
  },
};
</script>

<style scoped>
.new-list{
  float:left;
}
</style>
