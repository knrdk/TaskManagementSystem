<template>
<div class="status-board">
  <div><h2>Lista tasków</h2></div>
  <TodoList v-for="(list, index) in lists" :key="index" :name="list.name" :id="list.id" />
  <div class="new-list">
    <input v-model="newItem"/>
    <button @click="addItem()" :disabled="!newItem">Add new list</button>
  </div>
  <router-view></router-view>
  </div>
</template>

<script>
import TodoList from './TodoList.vue';

const newListDefaultName = 'New list';

export default{
  components: { TodoList },
  data() {
    return {
      newItem: newListDefaultName,
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    addItem() {
      this.$store.commit('addNewList', this.newItem);
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
