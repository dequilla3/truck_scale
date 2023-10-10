<template>
  <main-container>
    <div class="dontPrint">
      <h1 class="font-semibold drop-shadow-md page_header text-xl">ALL TRANSCATION</h1>
      <br />
      <div class="flex">
        <button-primary
          icon="print"
          @click.native="print()"
          class="text-sm mb-2"
          text="Print"
        />
      </div>
    </div>

    <h1 class="print text-xl mb-10 text-center">ALL TRANSCATIONS</h1>

    <!-- MAIN TABLE -->
    <table class="w-full text-sm text-left">
      <caption></caption>
      <thead class="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th v-for="(col, index) in tFields" scope="col" class="px-6 py-3">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="overflow-y-auto">
        <tr v-for="row in trans" class="bg-white border-b hover:bg-amber-100 text-xxs">
          <td :key="col.key" class="px-6 py-4" v-for="col in tFields">
            {{ row[col.key] }}
            <slot :name="col.key" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </main-container>
</template>
<script>
export default {
  layout: "custom",
  data() {
    return {
      tFields: [
        { key: "company_name", label: "Transaction Type" },
        { key: "subtranstype_name", label: "Sub-Transaction Type" },
        { key: "fname", label: "Name" },
        { key: "item_name", label: "Item Name" },
        { key: "quantity", label: "QTY" },
        { key: "uom", label: "UOM" },
        { key: "plate_no", label: "Plate No." },
        { key: "inbound_weight", label: "In-bound weight" },
        { key: "outbound_weight", label: "Out-bound weight" },
        { key: "net_weight", label: "Net Weight" },
        { key: "trans_date", label: "Transaction Date" },
      ],
      trans: [],
    };
  },

  methods: {
    async fetchTransactions() {
      this.trans = [];
      this.$store.dispatch("fetchTransactions").then((res) => {
        res.map((val) => {
          if (val.transactionid != null) {
            val.trans_date = new Date(val.trans_date).toLocaleDateString("en-US");
            val.fname = `${val.firs_tname} ${val.last_name}`;
            this.trans.push(val);
          }
        });
      });
    },

    print() {
      window.print();
    },
  },

  computed: {
    getBtnSelecStyle() {
      return "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 float-bottom h-full";
    },
  },

  created() {
    this.fetchTransactions();
  },
};
</script>
