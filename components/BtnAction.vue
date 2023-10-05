<template>
  <div>
    <button title="UPDATE" :class="getVariant">
      {{ label }}
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      variantDefault:
        "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xxs px-4 py-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
      variantDanger:
        "text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xxs px-4 py-1.5 dark:bg-red-800 dark:hover:bg-red-700 dark:focus:ring-red-700 dark:border-red-700",
    };
  },

  computed: {
    getVariant() {
      if (this.isVariantDefault) {
        return this.variantDefault;
      }

      if (this.isVariantDanger) {
        return this.variantDanger;
      }
    },
  },
  props: {
    label: String,
    update: Boolean,
    isVariantDefault: Boolean,
    isVariantDanger: Boolean,
  },
};
</script>
