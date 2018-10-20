<template>
<div>
    <sweet-modal ref="modal" title="Task details">
      <div v-if="item!=null">
        Name: {{item.name}}
      </div>
    </sweet-modal>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue';

export default {
  components: { SweetModal },
  data() {
    return {
      item: null,
    };
  },
  methods: {
    open(selectedItem) {
      this.item = selectedItem;
      this.$refs.modal.open();
    },
  },
};
</script>

<style scoped>
</style>
