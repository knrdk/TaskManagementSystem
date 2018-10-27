<template>
  <tr>
      <td>Color</td>
      <td>
        <div class="color-item"
        v-for="(item, index) in availableColors"
        :key="index"
        @click="select(item)"
        :class="{selected: item === color}"
        :style="getTodoColorStyle(item)">
          {{ item.name }}
        </div>
      </td>
  </tr>
</template>

<script>
import todoColorMixin from '../mixins/todoColorMixin';
import { CHANGE_TODO_COLOR } from '../constants/mutations';

export default {
  mixins: [todoColorMixin],
  props: ['id'],
  data() {
    return {
      availableColors: this.$store.state.availableColors,
    };
  },
  computed: {
    color() {
      const todo = this.$store.getters.getTodoById(this.id);
      return todo.color;
    },
  },
  methods: {
    select(colorToSelect) {
      const request = {
        todoId: this.id,
        newColor: colorToSelect,
      };
      this.$store.commit(CHANGE_TODO_COLOR, request);
    },
  },
};
</script>

<style scoped>
.selected {
    font-weight: bold;
    text-decoration: underline;
}
.color-item {
  border-radius: 3px;
  display: inline;
  margin: 0px 5px;
  padding: 5px;
}
</style>
