<template>
  <main-container>
    <h1 class="font-semibold drop-shadow-md page_header">ADD SUPPLIER</h1>
    <br />
    <div class="flex">
      <button-primary
        @click.native="openModal('ADD')"
        class="text-sm mb-2"
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
          ></btn-action>

          <btn-action
            @click.native="openModal('DELETE', row)"
            label="Delete"
            isVariantDanger
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
        <input-group
          v-model="form.fname"
          class="mt-2"
          labelName="First Name"
          inputType="text"
        />
        <input-group
          v-model="form.lname"
          class="mt-2"
          labelName="Last Name"
          inputType="text"
        />
        <input-group
          v-model="form.address"
          class="mt-2"
          labelName="Address"
          inputType="text"
        />
        <button-primary
          type="submit"
          class="w-44 text-sm mt-8"
          :text="action == 'ADD' ? 'Add Supplier' : 'Update Supplier'"
        />
      </form>
    </lg-modal>
    <MessageBoxInfo :title="alertMsg" ref="msgBoxInfo" />
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
      alertMsg: "",

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

      if (action == "UPDATE") {
        this.$refs.modal.showModal().then((val) => {});
        this.modalTitle = "Update Supplier";
        this.form = {
          id: rowValue.id,
          fname: rowValue.name.split(" ")[0],
          lname: rowValue.name.split(" ")[1],
          address: rowValue.address,
        };
      } else if (action == "ADD") {
        this.$refs.modal.showModal();
        this.modalTitle = "Add Supplier";
      }
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

      if (this.action == "UPDATE") {
        axios({
          method: "PUT",
          url: `${this.$axios.defaults.baseURL}/updateSupplier/${this.form.id}`,
          data: {
            firstname: this.form.fname.toUpperCase(),
            lastname: this.form.lname.toUpperCase(),
            address: this.form.address.toUpperCase(),
          },
        }).then((res) => {
          this.alertMsg = "Successfully Updated!";
          this.fetchSuppliers();
          this.$refs.msgBoxInfo.showAlert();
          this.$refs.modal.hideModal();
        });
      } else if (this.action == "ADD") {
        this.$refs.confirmModal
          .showModal(
            "Please confirm!",
            "Are you sure you want to add Supplier?",
            "Yes, Proceed!"
          )
          .then((res) => {
            if (!res) return;
            axios({
              method: "POST",
              url: `${this.$axios.defaults.baseURL}/addSupplier`,
              data: {
                firstname: this.form.fname.toUpperCase(),
                lastname: this.form.lname.toUpperCase(),
                address: this.form.address.toUpperCase(),
              },
            }).then((res) => {
              this.alertMsg = "Successfully Added!";
              this.fetchSuppliers();
              this.$refs.msgBoxInfo.showAlert();
              this.$refs.modal.hideModal();
            });
          });
      }
    },
  },

  computed: {},

  created() {
    this.fetchSuppliers();
  },
};
</script>
