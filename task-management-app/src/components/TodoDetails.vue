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
      item: this.$route.params.todoId,
    };
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
};
</script>

<style scoped>
</style>
