<template>
  <sweet-modal
    ref="modal"
    @close="onClose()"
    title="Task details">
    <div>Name: {{ item.name }}, Id: {{ item.id }}</div>
  </sweet-modal>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue';

export default {
  components: { SweetModal },
  props: ['todoId'],
  computed: {
    item() {
      const requestedId = this.todoId;
      return this.$store.getters.getTodoById(requestedId);
    },
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
    onClose() {
      this.$router.push('/statusBoard');
    },
  },
  mounted() {
    this.open();
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => next(), 100);
  },
};
</script>

<style scoped>
</style>
