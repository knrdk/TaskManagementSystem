<template>
  <sweet-modal
    ref="modal"
    @close="onClose()"
    :title="item.name">
    <div>
      <table>
        <tr>
          <td>Name</td>
          <td>{{ item.name }}</td>
        </tr>
        <tr>
          <td>Id</td>
          <td>{{ item.id }}</td>
        </tr>
        <ColorPicker :id="item.id"></ColorPicker>
      </table>
    </div>
  </sweet-modal>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue';
import ColorPicker from './ColorPicker.vue';

export default {
  components: { SweetModal, ColorPicker },
  props: ['todoId'],
  computed: {
    item() {
      return this.$store.getters.getTodoById(this.todoId);
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
table >>> td {
  padding: 5px;
  text-align: left;
}

table tr >>> td:first-child {
  text-align: right;
  font-weight: bold;
}
</style>
