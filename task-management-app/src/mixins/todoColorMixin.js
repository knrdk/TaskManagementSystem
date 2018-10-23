export default {
  methods: {
    getTodoColorStyle(colorItem) {
      return {
        background: colorItem.backgroundColor,
        color: colorItem.fontColor,
      };
    },
    getTodoDeleteColorStyle(colorItem) {
      return {
        color: colorItem.deleteColor,
      };
    },
  },
};
