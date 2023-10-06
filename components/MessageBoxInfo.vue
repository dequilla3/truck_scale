<template>
  <div v-if="show" :class="getClass" role="alert">
    <div class="flex">
      <font-awesome-icon
        v-if="success || successDanger"
        class="text-3xl mr-5"
        :icon="['fas', 'circle-check']"
      />
      <font-awesome-icon
        v-if="danger"
        class="text-3xl mr-5"
        :icon="['fas', 'circle-xmark']"
      />
      <div>
        <p class="font-bold">{{ title }}</p>
        <p class="text-sm">{{ subTitle }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      title: "",
      subTitle: "",
      success: false,
      danger: false,
      successDanger: false,
    };
  },

  created() {},

  computed: {
    getClass() {
      const success = `absolute bottom-10 right-0 w-2/5 bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md`;
      const danger = `absolute bottom-10 right-0 w-2/5 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md`;
      const successDanger = `absolute bottom-10 right-0 w-2/5 bg-red-100 border-t-4 border-red-500 rounded-b text-green-700 px-4 py-3 shadow-md`;

      if (this.success) return success;
      if (this.danger) return danger;
      if (this.successDanger) return successDanger;

      return "";
    },
  },

  methods: {
    hideAlert() {
      this.show = false;
    },
    showAlert({ title, subTitle, success, danger, successDanger }) {
      this.title = title;
      this.subTitle = subTitle;
      this.success = success;
      this.danger = danger;
      this.successDanger = successDanger;
      this.show = true;

      setTimeout(() => {
        this.hideAlert();
      }, 3000);
    },
  },
};
</script>
