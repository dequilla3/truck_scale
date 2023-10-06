<template>
  <main-container>
    <h1 class="font-semibold drop-shadow-md page_header text-xl">SCALE</h1>
    <br />
    <div class="flex">
      <button-primary
        @click.native="openModal('PROCESS')"
        class="text-sm mb-2"
        text="New Transaction"
      />
    </div>
    <!-- MAIN TABLE -->
    <my-table :fields="tFields" :items="trans" action>
      <template v-slot:actions="{ row }">
        <div class="flex">
          <btn-action
            class="mr-1"
            @click.native="openModal('UPDATE', row)"
            label="Update"
            isVariantDefault
            icon="pen-to-square"
          ></btn-action>
        </div>
      </template>
    </my-table>

    <!-- TRANSACTION MODAL -->
    <lg-modal ref="modal">
      <template v-slot:title>
        <div class="pl-40">{{ modalTitle }}</div>
      </template>

      <form @submit="onSubmitModal" class="pl-40 pr-40 pb-20">
        <div class="flex">
          <div class="w-full mr-5 text-xs">
            <!-- SELECT TRANSCATION TYPE-->
            <div class="flex">
              <input-group
                v-model="transType.desc"
                class="mt-2 w-full"
                labelName="Select Transaction Type"
                inputType="text"
                required
                disabled
              >
                <button
                  type="button"
                  :class="getBtnSelecStyle"
                  @click="openSelectModal('TRANS_TYPE')"
                >
                  <font-awesome-icon :icon="['fas', 'arrow-turn-down']" />
                </button>
              </input-group>
            </div>
            <!-- SELECT SUB-TRANSCATION TYPE-->
            <div class="flex">
              <input-group
                v-model="subTransType.desc"
                class="mt-2 w-full"
                labelName="Select Sub-Transaction Type"
                inputType="text"
                required
                disabled
              >
                <button
                  type="button"
                  :class="getBtnSelecStyle"
                  @click="openSelectModal('SUB_TRANS_TYPE')"
                >
                  <font-awesome-icon :icon="['fas', 'arrow-turn-down']" />
                </button>
              </input-group>
            </div>

            <!-- SELECT DRIVER -->
            <div class="flex">
              <input-group
                v-model="driver.desc"
                class="mt-2 w-full"
                labelName="Select Driver"
                inputType="text"
                required
                disabled
              >
                <button
                  type="button"
                  :class="getBtnSelecStyle"
                  @click="openSelectModal('DRIVER')"
                >
                  <font-awesome-icon :icon="['fas', 'arrow-turn-down']" />
                </button>
              </input-group>
            </div>

            <!-- SELECT SUPPLIER -->
            <div class="flex">
              <input-group
                v-model="supplier.desc"
                class="mt-2 w-full"
                labelName="Select Supplier"
                inputType="text"
                required
                disabled
              >
                <button
                  type="button"
                  :class="getBtnSelecStyle"
                  @click="openSelectModal('SUPPLIER')"
                >
                  <font-awesome-icon :icon="['fas', 'arrow-turn-down']" />
                </button>
              </input-group>
            </div>
          </div>

          <div class="w-full text-xs">
            <!-- SELECT ITEM -->
            <div class="flex">
              <input-group
                v-model="item.desc"
                class="mt-2 w-full"
                labelName="Select Item"
                inputType="text"
                required
                disabled
              >
                <button
                  type="button"
                  :class="getBtnSelecStyle"
                  @click="openSelectModal('ITEM')"
                >
                  <font-awesome-icon :icon="['fas', 'arrow-turn-down']" />
                </button>
              </input-group>
            </div>

            <input-group
              v-model="qty"
              class="mt-2"
              labelName="Quantity"
              inputType="text"
              required
            />
            <input-group
              v-model="plate"
              class="mt-2"
              labelName="Plate No."
              inputType="text"
              required
            />

            <input-group
              v-model="inBoundW"
              class="mt-2"
              labelName="In-bound Weight"
              inputType="text"
              required
            />
          </div>
        </div>
        <button-primary
          type="submit"
          class="text-sm mt-8"
          :text="action == 'PROCESS' ? 'Process Transaction' : 'Update Transaction'"
          :load="isLoading"
          icon="cogs"
        />
      </form>
    </lg-modal>

    <!-- SELECT MODAL -->
    <select-modal ref="selectModal">
      <template v-slot:title>
        <div>{{ selectModalTitle }}</div>
      </template>

      <my-table :fields="getSelectModalTableFields" :items="getSelectModalTableItems">
        <template v-slot:actions="{ row }">
          <div class="flex">
            <btn-action
              class="mr-1"
              @click.native="onSelectModalData(row)"
              label="Update"
              isVariantDefault
              icon="check"
            ></btn-action>
          </div>
        </template>
      </my-table>
    </select-modal>

    <MessageBoxInfo ref="msgBoxInfo" />
    <ConfirmationModal ref="confirmModal" />
  </main-container>
</template>
<script>
import axios from "axios";

export default {
  layout: "custom",
  data() {
    return {
      modalTitle: "",
      selectModalTitle: "",
      isLoading: false,

      modalDialogSelected: "",

      //HEADER
      transId: "",
      transType: {
        id: "",
        desc: "",
      },
      subTransType: {
        id: "",
        desc: "",
      },
      driver: {
        id: "",
        desc: "",
      },
      supplier: {
        id: "",
        desc: null,
      },
      item: {
        id: "",
        desc: "",
      },
      qty: "",
      plate: "",
      inBoundW: "",

      //trans type
      transTypeFields: [
        { key: "company_name", label: "TRANSACTION TYPE NAME" },
        { key: "actions", label: "Actions" },
      ],
      transTypes: [],

      //sub trans
      subTransTypeFields: [
        { key: "subtranstype_name", label: "SUB-TRANSACTION TYPE NAME" },
        { key: "actions", label: "Actions" },
      ],
      subTransTypes: [],

      //drivers
      driversFields: [
        { key: "firstname", label: "First Name" },
        { key: "lastname", label: "Last Name" },
        { key: "actions", label: "Actions" },
      ],
      driverList: [],

      //suppliers
      suppliersFields: [
        { key: "firs_tname", label: "First Name" },
        { key: "last_name", label: "Last Name" },
        { key: "actions", label: "Actions" },
      ],
      supplierList: [],

      //items
      itemFields: [
        { key: "item_name", label: "Item Name" },
        { key: "actions", label: "Actions" },
      ],
      itemList: [],

      action: "",
      tFields: [
        { key: "company_name", label: "Transaction Type" },
        { key: "subtranstype_name", label: "Sub-Transaction Type" },
        { key: "firs_tname", label: "First Name" },
        { key: "last_name", label: "Last Name" },
        { key: "item_name", label: "Item Name" },
        { key: "uom", label: "UOM" },
        { key: "plate_no", label: "Plate No." },
        { key: "inbound_weight", label: "In-bound weight" },
        { key: "outbound_weight", label: "Out-bound weight" },
        { key: "net_weight", label: "Net Weight" },
        { key: "trans_date", label: "Transaction Date" },
        { key: "actions", label: "Actions" },
      ],
      trans: [],
    };
  },

  methods: {
    openSelectModal(select) {
      this.modalDialogSelected = select;

      switch (select) {
        case "TRANS_TYPE":
          this.selectModalTitle = "Transaction Type";
          this.$refs.selectModal.showModal();
          this.$store.dispatch("fetchTransType").then((res) => {
            this.transTypes = res;
          });
          break;
        case "SUB_TRANS_TYPE":
          this.selectModalTitle = "Sub-Transaction Type";
          this.$refs.selectModal.showModal();
          this.$store.dispatch("fetchSubTrans").then((res) => {
            this.subTransTypes = res;
          });
          break;
        case "DRIVER":
          this.selectModalTitle = "Drivers";
          this.$refs.selectModal.showModal();
          this.$store.dispatch("fetchDrivers").then((res) => {
            this.driverList = res;
          });
          break;

        case "SUPPLIER":
          this.selectModalTitle = "Suppliers";
          this.$refs.selectModal.showModal();
          this.$store.dispatch("fetchSuppliers").then((res) => {
            this.supplierList = res;
          });
          break;

        case "ITEM":
          this.selectModalTitle = "Items";
          this.$refs.selectModal.showModal();
          this.$store.dispatch("fetchItem").then((res) => {
            this.itemList = res;
          });
          break;
      }
    },

    onSelectModalData(row) {
      switch (this.modalDialogSelected) {
        case "TRANS_TYPE":
          this.transType = {
            id: row.transtypeid,
            desc: row.company_name,
          };
          break;

        case "SUB_TRANS_TYPE":
          this.subTransType = {
            id: row.subtranstypeid,
            desc: row.subtranstype_name,
          };
          break;

        case "DRIVER":
          this.driver = {
            id: row.driverid,
            desc: `${row.firstname} ${row.lastname}`,
          };
          break;

        case "SUPPLIER":
          this.supplier = {
            id: row.supplierid,
            desc: `${row.firs_tname} ${row.last_name}`,
          };
          break;

        case "ITEM":
          this.item = {
            id: row.itemid,
            desc: row.item_name,
          };
          break;
      }

      this.$refs.selectModal.hideModal();
    },

    openModal(action, rowValue) {
      this.action = action;
      this.resetModalFields();
      this.$refs.modal.showModal();

      if (action == "UPDATE") {
        this.modalTitle = "Update Transaction";
        //Populate data on fields
        this.form = {
          id: rowValue.id,
          fname: rowValue.name.split(" ")[0],
          lname: rowValue.name.split(" ")[1],
          address: rowValue.address,
        };
        return;
      }

      this.modalTitle = "Create Transaction";
    },

    async onSubmitModal(e) {
      e.preventDefault();

      this.$refs.confirmModal
        .showModal(
          "Please confirm!",
          `Are you sure you want to ${this.action.toLocaleLowerCase()} transaction?`,
          "Yes, Proceed!"
        )
        .then((val) => {
          if (!val) return;

          if (this.action == "UPDATE") {
            this.doUpdateTransaction();
            return;
          }

          this.doProcessTransaction();
        });
    },

    resetModalFields() {
      this.form = {
        id: "",
        fname: "",
        lname: "",
        address: "",
      };
    },

    doProcessTransaction() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/createTransaction`,
        data: {
          trans_type: this.transType.id,
          subtrans_type: this.subTransType.id,
          driver_id: this.driver.id,
          supplier_id: this.supplier.id,
          item_id: this.item.id,
          quantity: this.quantity,
          plate_no: this.plate.toUpperCase(),
        },
      }).then(
        (res) => {
          this.$refs.msgBoxInfo.showAlert({
            title: "Successfully Process!",
            subTitle: "",
            success: true,
          });

          this.isLoading = false;
          this.fetchTransactions();
          this.$refs.modal.hideModal();
        },
        (err) => {
          this.$refs.msgBoxInfo.showAlert({
            title: err,
            subTitle: "",
            danger: true,
          });
          this.isLoading = false;
          this.$refs.modal.hideModal();
        }
      );
    },

    doUpdateTransaction() {
      this.isLoading = true;
      axios({
        method: "PUT",
        url: `${this.$axios.defaults.baseURL}/updateSupplier/${this.form.id}`,
        data: {
          firstname: this.form.fname.toUpperCase(),
          lastname: this.form.lname.toUpperCase(),
          address: this.form.address.toUpperCase(),
        },
      }).then((res) => {
        this.$refs.msgBoxInfo.showAlert({
          title: "Successfully Updated!",
          subTitle: "",
          success: true,
        });
        this.isLoading = false;
        this.fetchTransactions();
        this.$refs.modal.hideModal();
      });
    },

    async fetchTransactions() {
      this.$store.dispatch("fetchTransactions").then((res) => {
        this.trans = res;
        res.map((val) => {});
      });
    },
  },

  computed: {
    getBtnSelecStyle() {
      return "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 float-bottom h-full";
    },

    getSelectModalTableFields() {
      switch (this.modalDialogSelected) {
        case "TRANS_TYPE":
          return this.transTypeFields;

        case "SUB_TRANS_TYPE":
          return this.subTransTypeFields;

        case "DRIVER":
          return this.driversFields;

        case "SUPPLIER":
          return this.suppliersFields;

        case "ITEM":
          return this.itemFields;
      }
    },
    getSelectModalTableItems() {
      switch (this.modalDialogSelected) {
        case "TRANS_TYPE":
          return this.transTypes;

        case "SUB_TRANS_TYPE":
          return this.subTransTypes;

        case "DRIVER":
          return this.driverList;

        case "SUPPLIER":
          return this.supplierList;

        case "ITEM":
          return this.itemList;
      }
    },
  },

  created() {
    this.fetchTransactions();
  },
};
</script>
