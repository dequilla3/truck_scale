<template>
  <div class="relative overflow-x-auto table-wrp block max-h-table">
    <table class="w-full text-sm text-left">
      <caption></caption>
      <thead class="text-xxs text-gray-700 uppercase bg-gray-200 sticky top-0">
        <tr>
          <th v-for="(col, index) in fields" scope="col" class="px-6 py-3">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="overflow-y-auto">
        <tr v-for="row in items" class="bg-white border-b hover:bg-amber-100 text-xxs">
          <td :key="col.key" class="px-6 py-4" v-for="col in fields">
            {{ row[col.key] }}
            <slot :name="col.key" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    fields: Array,
    items: Array,
    action: Boolean,
  },
};
</script>
