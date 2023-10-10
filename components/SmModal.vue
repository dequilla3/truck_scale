<template>
  <div>
    <div v-if="show" class="top-5 bg-black modal-overlay static"></div>
    <div v-if="show" class="top-0 bg-black modal modal-select rounded-md h-fit">
      <button
        type="button"
        class="absolute top-5 right-5 text-2xl hover:drop-shadow-md"
        @click="hideModal()"
      >
        <font-awesome-icon v-on:click="hideModal()" :icon="['fas', 'xmark']" />
      </button>

      <h1 class="font-semibold text-lg drop-shadow-md">
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
.modal-select {
  width: 40%;
  margin-top: 8%;
  margin-left: 30%;
  margin-right: 30%;
  padding: 34px;
}
</style>
