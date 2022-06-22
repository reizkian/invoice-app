<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exit? Your changes will not be saved!</p>
      <div class="action flex">
        <button @click="closeModal" class="purple">Return</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Modal",
  methods: {
    ...mapMutations(["TOGGLE_INVOICE", "TOGGLE_MODAL"]),
    closeModal() {
      console.log("close modal");
      this.TOGGLE_MODAL();
    },
    closeInvoice() {
      console.log("close invoice");
      this.TOGGLE_MODAL();
      this.TOGGLE_INVOICE();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;

  .modal-content {
    color: #fff;
    background-color: #252945;
    padding: 48px 32px;
    border-radius: 25px;
  }

  p {
    text-align: center;
  }

  .action {
    margin-top: 24px;
    button {
      flex: 1;
      margin: 5px;
    }
  }
}
</style>
