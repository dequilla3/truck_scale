<template>
  <main-container>
    <h1 class="font-semibold drop-shadow-md page_header text-xl">SUPPLIER</h1>
    <br />
    <div class="flex">
      <button-primary
        @click.native="openModal('ADD')"
        class="text-xs mb-2"
        text="Add Supplier"
      />
    </div>
    <!-- MAIN TABLE -->
    <my-table :fields="suppliersFields" :items="suppliers" action>
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
            @click.native="doDeleteSupplier(row)"
            label="Delete"
            isVariantDanger
            icon="trash"
          ></btn-action>
        </div>
      </template>
    </my-table>

    <!-- MODAL -->
    <lg-modal ref="modal">
      <template v-slot:title>
        <div class="pl-40">{{ modalTitle }}</div>
      </template>
      <form @submit="onSubmitModal" class="pl-40 pr-40 pb-20">
        <div class="text-sm">
          <input-group
            v-model="form.fname"
            class="mt-2"
            labelName="First Name"
            inputType="text"
            required
          />
          <input-group
            v-model="form.lname"
            class="mt-2"
            labelName="Last Name"
            inputType="text"
            required
          />
          <input-group
            v-model="form.address"
            class="mt-2"
            labelName="Address"
            inputType="text"
            required
          />
          <button-primary
            type="submit"
            class="w-44 text-sm mt-8"
            :text="action == 'ADD' ? 'Add Supplier' : 'Update Supplier'"
            :load="isLoading"
          />
        </div>
      </form>
    </lg-modal>
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
      isLoading: false,

      form: {
        id: "",
        fname: "",
        lname: "",
        address: "",
      },
      action: "",
      suppliersFields: [
        { key: "name", label: "Name" },
        { key: "address", label: "Address" },
        { key: "actions", label: "Actions" },
      ],
      suppliers: [],
    };
  },

  methods: {
    openModal(action, rowValue) {
      this.action = action;
      this.resetModalFields();
      this.$refs.modal.showModal();

      if (action == "UPDATE") {
        this.modalTitle = "Update Supplier";
        //Populate data on fields
        this.form = {
          id: rowValue.id,
          fname: rowValue.name.split(" ")[0],
          lname: rowValue.name.split(" ")[1],
          address: rowValue.address,
        };
        return;
      }

      this.modalTitle = "Add Supplier";
    },

    async fetchSuppliers() {
      this.suppliers = [];
      this.$store.dispatch("fetchSuppliers").then((res) => {
        for (let sup of res) {
          this.suppliers.push({
            id: sup.supplierid,
            name: `${sup.firs_tname} ${sup.last_name}`,
            address: sup.address,
          });
        }
      });
    },

    async onSubmitModal(e) {
      e.preventDefault();

      this.$refs.confirmModal
        .showModal(
          "Please confirm!",
          `Are you sure you want to ${this.action.toLocaleLowerCase()} Supplier?`,
          "Yes, Proceed!"
        )
        .then((val) => {
          if (!val) return;

          if (this.action == "UPDATE") {
            this.doUpdateSupplier();
            return;
          }

          this.doAddSupplier();
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

    doAddSupplier() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/addSupplier`,
        data: {
          firstname: this.form.fname.toUpperCase(),
          lastname: this.form.lname.toUpperCase(),
          address: this.form.address.toUpperCase(),
        },
      }).then((res) => {
        this.$refs.msgBoxInfo.showAlert({
          title: "Successfully Added!",
          subTitle: "",
          success: true,
        });

        this.isLoading = false;
        this.fetchSuppliers();
        this.$refs.modal.hideModal();
      });
    },

    doUpdateSupplier() {
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
        this.fetchSuppliers();
        this.$refs.modal.hideModal();
      });
    },

    doDeleteSupplier(row) {
      this.isLoading = true;

      this.$refs.confirmModal
        .showModal(
          // @params: title, message, okTitle, danger
          "Please confirm!",
          "Are you sure you want to delete Supplier?",
          "Yes, Proceed!",
          true
        )
        .then((val) => {
          if (!val) return;

          axios({
            method: "DELETE",
            url: `${this.$axios.defaults.baseURL}/deleteSupplier/${row.id}`,
          }).then((res) => {
            this.$refs.msgBoxInfo.showAlert({
              title: res.data.message ?? res.data,
              subTitle: "",
              successDanger: true,
            });
            this.isLoading = false;
            this.fetchSuppliers();
          });
        });
    },
  },

  computed: {},

  created() {
    this.fetchSuppliers();
  },
};
</script>
