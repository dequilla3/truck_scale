<template>
  <div class="z-0">
    <div v-if="show" class="top-5 bg-black modal-overlay static"></div>
    <div v-if="show" class="top-0 bg-black modal modal-lg rounded-md h-fit">
      <button
        type="button"
        class="absolute top-5 right-5 text-2xl hover:drop-shadow-md"
        @click="hideModal()"
      >
        <font-awesome-icon v-on:click="hideModal()" :icon="['fas', 'xmark']" />
      </button>

      <h1 class="font-semibold text-lg drop-shadow-md pt-10">
        <slot name="title"></slot>
      </h1>

      <br />

      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },

  methods: {
    hideModal() {
      this.show = false;
    },
    showModal() {
      this.show = true;
    },
  },

  created() {},
};
</script>
<style lang="scss" scoped>
.modal-lg {
  width: 60%;
  margin-top: 5%;
  margin-left: 20%;
  margin-right: 20%;
  padding: 34px;
}
</style>
