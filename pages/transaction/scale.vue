<template>
  <main-container>
    <h1 class="font-semibold drop-shadow-md page_header text-xl">SCALE</h1>
    <br />
    <div class="flex">
      <button-primary
        @click.native="openModal('PROCESS')"
        class="text-xs mb-2"
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

          <btn-action
            class="mr-1"
            @click.native="openOutBoundModal(row)"
            label="Outbound"
            isVariantDefault
            icon="truck-arrow-right"
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
    <sm-modal ref="selectModal">
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
    </sm-modal>

    <!-- OUTBOUND MODAL -->
    <sm-modal ref="outBoundModal">
      <template v-slot:title>
        <div>OUTBOUND</div>
      </template>

      <div class="text-xs">
        <form @submit="onSUbmitOutBoundWt">
          <input-group
            v-model="outBoundWt"
            class="mt-2 w-full"
            labelName="Input Outbound Weight"
            inputType="text"
            required
          />

          <button class="mt-2" type="submit" :class="getBtnSelecStyle">
            <font-awesome-icon :icon="['fas', 'plus']" />
            ADD OUTBOUND WEIGHT
          </button>
        </form>
      </div>
    </sm-modal>

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
      userId: "",
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
        { key: "fname", label: "Name" },
        { key: "quantity", label: "QTY" },
        { key: "uom", label: "UOM" },
        { key: "plate_no", label: "Plate No." },
        { key: "inbound_weight", label: "In-bound weight" },
        { key: "outbound_weight", label: "Out-bound weight" },
        { key: "net_weight", label: "Net Weight" },
        { key: "trans_date", label: "Transaction Date" },
        { key: "actions", label: "Actions" },
      ],
      trans: [],
      selectedRowOutbound: [],
      outBoundWt: "",
    };
  },

  methods: {
    openOutBoundModal(row) {
      this.selectedRowOutbound = row;
      this.$refs.outBoundModal.showModal();
    },
    onSUbmitOutBoundWt(e) {
      e.preventDefault();

      console.log(
        `${this.$axios.defaults.baseURL}/addOutboundWeight/${this.selectedRowOutbound.transactionid}`
      );

      axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/addOutboundWeight`,
        data: {
          weight: parseInt(this.outBoundWt),
          user_id: this.userId,
          transId: this.selectedRowOutbound.transactionid,
        },
      }).then(
        (res) => {
          this.$refs.msgBoxInfo.showAlert({
            title: "Successfully Added outbound weight!",
            subTitle: "",
            success: true,
          });
          this.$refs.outBoundModal.hideModal();
          this.fetchTransactions();
        },
        (err) => {
          this.$refs.msgBoxInfo.showAlert({
            title: err,
            subTitle: "",
            danger: true,
          });
          console.log(err);
        }
      );
    },
    openSelectModal(select) {
      this.modalDialogSelected = select;

      switch (select) {
        case "TRANS_TYPE":
          this.selectModalTitle = "Transaction Type";
          this.$refs.selectModal.showModal();
          break;
        case "SUB_TRANS_TYPE":
          this.selectModalTitle = "Sub-Transaction Type";
          this.$refs.selectModal.showModal();
          break;
        case "DRIVER":
          this.selectModalTitle = "Drivers";
          this.$refs.selectModal.showModal();
          break;

        case "SUPPLIER":
          this.selectModalTitle = "Suppliers";
          this.$refs.selectModal.showModal();
          break;

        case "ITEM":
          this.selectModalTitle = "Items";
          this.$refs.selectModal.showModal();
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

    async openModal(action, rowValue) {
      this.action = action;
      this.resetModalFields();
      this.$refs.modal.showModal();

      if (action == "UPDATE") {
        await this.fetchRawTransactions().then((rawTrans) => {
          let selectedTrans;
          rawTrans.map((mapTrans) => {
            if (mapTrans.transactionid == rowValue.transactionid)
              selectedTrans = mapTrans;
          });

          const driverName = `${
            this.getDriverById(selectedTrans.driverid)[0].firstname
          } ${this.getDriverById(selectedTrans.driverid)[0].lastname}`;

          const suppliersName = `${
            this.getSupplierId(selectedTrans.supplierid)[0].firs_tname
          } ${this.getSupplierId(selectedTrans.supplierid)[0].last_name}`;

          const itemName = `${this.getItemById(selectedTrans.itemid)[0].item_name}`;

          this.modalTitle = "Update Transaction";

          //insert transaction details on update
          this.transId = selectedTrans.transactionid;
          this.qty = rowValue.quantity;
          this.plate = rowValue.plate_no;
          this.inBoundW = rowValue.inbound_weight;
          this.transType = {
            id: selectedTrans.transtypeid,
            desc: rowValue.company_name,
          };
          this.subTransType = {
            id: selectedTrans.subtranstypeid,
            desc: rowValue.subtranstype_name,
          };
          this.driver = {
            id: selectedTrans.driverid,
            desc: driverName,
          };

          this.supplier = {
            id: selectedTrans.supplierid,
            desc: suppliersName,
          };

          this.item = {
            id: selectedTrans.itemid,
            desc: itemName,
          };
        });
        return;
      }
      this.modalTitle = "Create Transaction";
    },

    validinputs() {
      return (
        this.transType.id != "" &&
        this.subTransType.id &&
        this.driver.id != "" &&
        this.supplier.id != "" &&
        this.item.id != ""
      );
    },

    async onSubmitModal(e) {
      e.preventDefault();
      if (!this.validinputs()) {
        this.$refs.msgBoxInfo.showAlert({
          title: "Please fill in required fields!",
          subTitle: "",
          danger: true,
        });
        return;
      }

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
      this.transId = "";
      this.qty = "";
      this.plate = "";
      this.inBoundW = "";
      this.transType = {
        id: "",
        desc: "",
      };
      this.subTransType = {
        id: "",
        desc: "",
      };
      this.driver = {
        id: "",
        desc: "",
      };

      this.supplier = {
        id: "",
        desc: "",
      };

      this.item = {
        id: "",
        desc: "",
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
          quantity: parseInt(this.qty),
          plate_no: this.plate.toUpperCase(),
        },
      }).then(
        (res) => {
          // add inbound wt
          axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/addInboundWeight`,
            data: {
              weight: this.inBoundW,
              user_id: this.userId,
              transId: res.data.others.rows[0].transaction_id,
            },
          }).then(() => {
            //success
            this.$refs.msgBoxInfo.showAlert({
              title: "Successfully Process!",
              subTitle: "",
              success: true,
            });

            this.isLoading = false;
            this.fetchTransactions();
            this.$refs.modal.hideModal();
          });
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
        url: `${this.$axios.defaults.baseURL}/updateTransaction/${this.transId}`,
        data: {
          trans_type: this.transType.id,
          subtrans_type: this.subTransType.id,
          driver_id: this.driver.id,
          supplier_id: this.supplier.id,
          item_id: this.item.id,
          quantity: parseInt(this.qty),
          plate_no: this.plate.toUpperCase(),
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

    async fetchRawTransactions() {
      return this.$store.dispatch("fetchRawTransactions");
    },

    async fetchTransactions() {
      this.trans = [];
      this.$store.dispatch("fetchTransactions").then((res) => {
        res.map((val) => {
          val.trans_date = new Date(val.trans_date).toLocaleDateString("en-US");
          val.fname = `${val.firs_tname} ${val.last_name}`;
          if (val.transactionid != null) this.trans.push(val);
        });
      });
    },

    async fetchTransType() {
      this.$store.dispatch("fetchTransType").then((res) => {
        this.transTypes = res;
      });
    },

    async fetchSubTrans() {
      this.$store.dispatch("fetchSubTrans").then((res) => {
        this.subTransTypes = res;
      });
    },

    async fetchDrivers() {
      this.$store.dispatch("fetchDrivers").then((res) => {
        this.driverList = res;
      });
    },

    async fetchSuppliers() {
      this.$store.dispatch("fetchSuppliers").then((res) => {
        this.supplierList = res;
      });
    },

    async fetchItem() {
      this.$store.dispatch("fetchItem").then((res) => {
        this.itemList = res;
      });
    },

    getUserByEmpId() {
      return this.$store.dispatch("fetchUsers").then((res) => {
        for (let user of res) {
          if (user.employeeid == localStorage.empId) {
            return user;
          }
        }
      });
    },

    getDriverById(id) {
      return this.driverList.filter((val) => {
        return val.driverid == id;
      });
    },

    getSupplierId(id) {
      return this.supplierList.filter((val) => {
        return val.supplierid == id;
      });
    },

    getItemById(id) {
      return this.itemList.filter((val) => {
        return val.itemid == id;
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
    this.fetchTransType();
    this.fetchSubTrans();
    this.fetchDrivers();
    this.fetchSuppliers();
    this.fetchItem();

    // get user by emp id
    this.getUserByEmpId().then((user) => {
      this.userId = user.userid;
    });
  },
};
</script>
