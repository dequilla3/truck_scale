<template>
  <div class="rounded overflow-hidden">
    <label for="inp" class="block text-gray-600">{{ labelName }}</label>
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      v-on:change="$emit('change', $event.target.value)"
      :type="inputType"
      id="inp"
      name="inp"
      class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      autocomplete="off"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: this.value,
    };
  },
  props: {
    labelName: String,
    inputType: String,
    value: String,
  },
  methods: {},
};
</script>
