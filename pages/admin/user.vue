<template>
  <main-container>
    <h1 class="font-semibold drop-shadow-md page_header text-xl">USERS</h1>
    <br />
    <div class="flex">
      <button-primary
        @click.native="openModal('ADD')"
        class="text-xs mb-2"
        text="Add User"
      />
    </div>
    <!-- MAIN TABLE -->
    <my-table :fields="usersFields" :items="users" action>
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

          <input-group
            v-model="form.eid"
            class="mt-2"
            labelName="Employee ID"
            inputType="text"
            required
          />

          <input-group
            v-model="form.pincode"
            class="mt-2"
            labelName="Pincode"
            inputType="text"
            required
          />

          <input-group
            v-model="form.password"
            class="mt-2"
            labelName="Password"
            inputType="text"
            required
          />

          <button-primary
            type="submit"
            class="w-44 text-sm mt-8"
            :text="action == 'ADD' ? 'Add User' : 'Update User'"
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
        password: "",
        pincode: "",
      },
      action: "",
      usersFields: [
        { key: "firstname", label: "First Name" },
        { key: "lastname", label: "Last Name" },
        { key: "eid", label: "Employee ID" },
        { key: "pincode", label: "Pin Code" },
        { key: "actions", label: "Actions" },
      ],
      users: [],
    };
  },

  methods: {
    openModal(action, rowValue) {
      this.action = action;
      this.resetModalFields();
      this.$refs.modal.showModal();

      if (action == "UPDATE") {
        this.modalTitle = "Update User";
        //Populate data on fields
        this.form = {
          id: rowValue.id,
          firstname: rowValue.firstname,
          lastname: rowValue.lastname,
          eid: rowValue.eid == null ? "" : rowValue.eid.toString(),
          pincode: rowValue.pincode.toString(),
        };
        return;
      }

      this.modalTitle = "Add User";
    },

    async fetchUsers() {
      this.Users = [];
      this.$store.dispatch("fetchUsers").then((res) => {
        for (let user of res) {
          this.users.push({
            id: user.userid,
            firstname: user.fname,
            lastname: user.lname,
            eid: user.employeeid,
            pincode: user.pincode,
          });
        }
      });
    },

    async onSubmitModal(e) {
      e.preventDefault();

      this.$refs.confirmModal
        .showModal(
          "Please confirm!",
          `Are you sure you want to ${this.action.toLocaleLowerCase()} this User?`,
          "Yes, Proceed!"
        )
        .then((val) => {
          if (!val) return;

          if (this.action == "UPDATE") {
            this.doUpdateUser();
            return;
          }

          this.doAddUser();
        });
    },

    resetModalFields() {
      this.form = {
        id: "",
        firstname: "",
        lastname: "",
      };
    },

    doAddUser() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/addUser`,
        data: {
          f_name: this.form.firstname.toUpperCase(),
          l_name: this.form.lastname.toUpperCase(),
          employee_id: this.form.eid,
          e_password: this.form.password,
          e_pincode: this.form.pincode,
        },
      }).then((res) => {
        this.$refs.msgBoxInfo.showAlert({
          title: "Successfully Added!",
          subTitle: "",
          success: true,
        });

        this.isLoading = false;
        this.fetchUsers();
        this.$refs.modal.hideModal();
      });
    },

    doUpdateUser() {
      this.isLoading = true;
      axios({
        method: "PUT",
        url: `${this.$axios.defaults.baseURL}/editUser/${this.form.id}`,
        data: {
          f_name: this.form.firstname.toUpperCase(),
          l_name: this.form.lastname.toUpperCase(),
          employee_id: this.form.eid,
          e_password: this.form.password,
          e_pincode: this.form.pincode,
        },
      }).then(
        (res) => {
          this.$refs.msgBoxInfo.showAlert({
            title: "Successfully Updated!",
            subTitle: "",
            success: true,
          });
          this.isLoading = false;
          this.fetchUsers();
          this.$refs.modal.hideModal();
        },
        (err) => {
          this.isLoading = false;
        }
      );
    },
  },

  computed: {},

  created() {
    this.fetchUsers();
  },
};
</script>
