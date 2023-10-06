<template>
  <button
    type="button"
    class="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 px-4 w-fit"
    :disabled="load"
  >
    <div class="items-center">
      <font-awesome-icon :icon="['fas', `${icon ? icon : 'plus'}`]" class="mr-1" />
      {{ text }}
      <t-sipinner class="ml-1" v-show="load" />
    </div>
  </button>
</template>
<script>
export default {
  props: {
    text: String,
    load: Boolean,
    icon: String,
  },
  created() {},
};
</script>
