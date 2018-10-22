<template>
  <tr>
      <td>Color</td>
      <td>
        <span
        v-for="(availableColor, index) in availableColors"
        :key="index"
        @click="select(availableColor)"
        :class="{selected: availableColor === color}"
        :style="{color: availableColor}">
          {{ availableColor }}
        </span>
      </td>
  </tr>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      availableColors: ['orange', 'green', 'blue'],
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
      this.$store.commit('changeTodoColor', request);
    },
  },
};
</script>

<style scoped>
.selected {
    font-weight: bold;
}
</style>
