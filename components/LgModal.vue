<template>
  <div>
    <div v-if="show" class="absolute top-5 bg-black modal-overlay"></div>
    <div v-if="show" class="absolute top-0 bg-black modal rounded-md h-fit">
      <button
        type="button"
        class="absolute top-5 right-5 text-2xl hover:drop-shadow-md"
        @click="hideModal()"
      >
        <font-awesome-icon onclick="hideModal()" :icon="['fas', 'xmark']" />
      </button>

      <h1 class="font-semibold text-lg drop-shadow-md">{{ title }}</h1>

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

  props: { title: String },

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
.modal {
  width: 60%;
  margin-top: 5%;
  margin-left: 20%;
  margin-right: 20%;
  padding: 34px;
}
</style>
