<template>
  <main-container>
    <h1 class="font-semibold drop-shadow-md page_header text-xl">DRIVER</h1>
    <br />
    <div class="flex">
      <button-primary
        @click.native="openModal('ADD')"
        class="text-sm mb-2"
        text="Add Driver"
      />
    </div>
    <!-- MAIN TABLE -->
    <my-table :fields="driversFields" :items="drivers" action>
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
            @click.native="doDeleteDriver(row)"
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
            v-model="form.firstname"
            class="mt-2"
            labelName="First Name"
            inputType="text"
            required
          />
          <input-group
            v-model="form.lastname"
            class="mt-2"
            labelName="Last Name"
            inputType="text"
            required
          />

          <button-primary
            type="submit"
            class="w-44 text-sm mt-8"
            :text="action == 'ADD' ? 'Add Driver' : 'Update Driver'"
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
        firstname: "",
        lastname: "",
      },
      action: "",
      driversFields: [
        { key: "firstname", label: "First Name" },
        { key: "lastname", label: "Last Name" },
        { key: "actions", label: "Actions" },
      ],
      drivers: [],
    };
  },

  methods: {
    openModal(action, rowValue) {
      this.action = action;
      this.resetModalFields();
      this.$refs.modal.showModal();

      if (action == "UPDATE") {
        this.modalTitle = "Update Driver";
        //Populate data on fields
        this.form = {
          id: rowValue.id,
          firstname: rowValue.firstname,
          lastname: rowValue.lastname,
        };
        return;
      }

      this.modalTitle = "Add Driver";
    },

    async fetchDrivers() {
      this.drivers = [];
      this.$store.dispatch("fetchDrivers").then((res) => {
        for (let driver of res) {
          this.drivers.push({
            id: driver.driverid,
            firstname: driver.firstname,
            lastname: driver.lastname,
          });
        }
      });
    },

    async onSubmitModal(e) {
      e.preventDefault();

      this.$refs.confirmModal
        .showModal(
          "Please confirm!",
          `Are you sure you want to ${this.action.toLocaleLowerCase()} this Driver?`,
          "Yes, Proceed!"
        )
        .then((val) => {
          if (!val) return;

          if (this.action == "UPDATE") {
            this.doUpdateDriver();
            return;
          }

          this.doAddDriver();
        });
    },

    resetModalFields() {
      this.form = {
        id: "",
        firstname: "",
        lastname: "",
      };
    },

    doAddDriver() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/addDriver`,
        data: {
          firstname: this.form.firstname.toUpperCase(),
          lastname: this.form.lastname.toUpperCase(),
        },
      }).then((res) => {
        this.$refs.msgBoxInfo.showAlert({
          title: "Successfully Added!",
          subTitle: "",
          success: true,
        });

        this.isLoading = false;
        this.fetchDrivers();
        this.$refs.modal.hideModal();
      });
    },

    doUpdateDriver() {
      this.isLoading = true;
      axios({
        method: "PUT",
        url: `${this.$axios.defaults.baseURL}/updateDriver/${this.form.id}`,
        data: {
          firstname: this.form.firstname.toUpperCase(),
          lastname: this.form.lastname.toUpperCase(),
        },
      }).then(
        (res) => {
          this.$refs.msgBoxInfo.showAlert({
            title: "Successfully Updated!",
            subTitle: "",
            success: true,
          });
          this.isLoading = false;
          this.fetchDrivers();
          this.$refs.modal.hideModal();
        },
        (err) => {
          this.isLoading = false;
        }
      );
    },

    doDeleteDriver(row) {
      this.isLoading = true;

      this.$refs.confirmModal
        .showModal(
          // @params: title, message, okTitle, danger
          "Please confirm!",
          "Are you sure you want to delete this Driver?",
          "Yes, Proceed!",
          true
        )
        .then((val) => {
          if (!val) return;

          axios({
            method: "DELETE",
            url: `${this.$axios.defaults.baseURL}/deleteDriver/${row.id}`,
          }).then((res) => {
            this.$refs.msgBoxInfo.showAlert({
              title: "Successfully Deleted!",
              subTitle: "",
              successDanger: true,
            });
            this.isLoading = false;
            this.fetchDrivers();
          });
        });
    },
  },

  computed: {},

  created() {
    this.fetchDrivers();
  },
};
</script>
