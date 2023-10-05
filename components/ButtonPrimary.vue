<template>
  <button
    type="button"
    class="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 px-4 w-fit"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  props: {
    text: String,
  },
};
</script>
