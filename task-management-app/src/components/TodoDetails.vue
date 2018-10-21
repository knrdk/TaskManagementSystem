<template>
  <sweet-modal
    ref="modal"
    @close="onClose()"
    title="Task details">
    <div>Id: {{ item }}</div>
  </sweet-modal>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue';

export default {
  components: { SweetModal },
  data() {
    return {
      item: this.todoId,
    };
  },
  props: ['todoId'],
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
