<template>
  <div class="z-30">
    <div v-if="show" class="top-5 bg-black modal-overlay"></div>
    <div v-if="show" class="top-0 bg-black modal modal-dialog rounded-md h-fit shadow-md">
      <button
        type="button"
        class="absolute top-5 right-5 text-2xl hover:drop-shadow-xl"
        @click="hideModal()"
      >
        <font-awesome-icon v-on:click="hideModal()" :icon="['fas', 'xmark']" />
      </button>

      <h1 class="font-semibold text-2xl drop-shadow-md mb-5">
        {{ title == "" ? "Confirm!" : title }}
      </h1>

      <hr />

      <h1 class="font-semibold text-lg drop-shadow-md mt-5">
        {{ message == "" ? "Are you sure?" : message }}
      </h1>

      <div class="mt-20 flex float-right">
        <button
          type="button"
          class="bg-neutral-600 hover:bg-neutral-500 text-white font-semibold py-2 px-4 w-fit mr-3 w-20"
          @click="onCancel"
        >
          Cancel
        </button>

        <button
          type="button"
          :class="`${danger ? 'bg-red-600' : 'bg-amber-600'} hover:${
            danger ? 'bg-red-500' : 'bg-amber-500'
          } text-white font-semibold py-2 px-4 w-fit`"
          @click="onOk"
        >
          {{ okTitle == "" ? "Confirm" : okTitle }}
        </button>
      </div>

      <br />
    </div>
  </div>
</template>
<script>
let myRes;
export default {
  data() {
    return {
      show: false,
      title: "",
      message: "test",
      danger: false,
      okTitle: "",
    };
  },

  methods: {
    onOk() {
      myRes(true);
    },

    onCancel() {
      myRes(false);
    },

    hideModal() {
      this.show = false;
    },

    async showModal(title, message, okTitle, danger) {
      return new Promise((resolve) => {
        this.show = true;
        this.title = title;
        this.message = message;
        this.danger = danger;
        this.okTitle = okTitle;
        myRes = resolve;
      }).then((res) => {
        this.hideModal();
        return res;
      });
    },
  },

  created() {},
};
</script>
<style lang="scss" scoped>
.modal-dialog {
  width: 40%;
  margin-top: 5%;
  margin-left: 30%;
  margin-right: 30%;
  padding: 34px;
}
</style>
