<template>
  <button
    type=""
    class="bg-neutral-900 hover:bg-black text-white font-semibold py-2 px-4 w-full"
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
