<template>
  <main-container>
    <h1 class="font-semibold drop-shadow-md page_header text-xl">ITEMS</h1>
    <br />
    <div class="flex">
      <button-primary
        @click.native="openModal('ADD')"
        class="text-xs mb-2"
        text="Add Item"
      />
    </div>
    <!-- MAIN TABLE -->
    <my-table :fields="itemFields" :items="itemsList" action>
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
            @click.native="doDeleteItem(row)"
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
            v-model="form.itemName"
            class="mt-2"
            labelName="Item Name"
            inputType="text"
            required
          />
          <input-group
            v-model="form.uom"
            class="mt-2"
            labelName="UOM"
            inputType="text"
            required
          />

          <button-primary
            type="submit"
            class="w-44 text-sm mt-8"
            :text="action == 'ADD' ? 'Add Item' : 'Update Item'"
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
        itemName: "",
        uom: "",
      },
      action: "",
      itemFields: [
        { key: "itemName", label: "Item Name" },
        { key: "uom", label: "UOM" },
        { key: "actions", label: "Actions" },
      ],
      itemsList: [],
    };
  },

  methods: {
    openModal(action, rowValue) {
      this.action = action;
      this.resetModalFields();
      this.$refs.modal.showModal();

      if (action == "UPDATE") {
        this.modalTitle = "Update Item";
        //Populate data on fields
        this.form = {
          id: rowValue.id,
          itemName: rowValue.itemName,
          uom: rowValue.uom,
        };
        return;
      }

      this.modalTitle = "Add Item";
    },

    async fetchItem() {
      this.itemsList = [];
      this.$store.dispatch("fetchItem").then((res) => {
        for (let item of res) {
          this.itemsList.push({
            id: item.itemid,
            itemName: item.item_name,
            uom: item.uom,
          });
        }
      });
    },

    async onSubmitModal(e) {
      e.preventDefault();

      this.$refs.confirmModal
        .showModal(
          // @params: title:string, message:string, okTitle:string, danger:boolean
          "Please confirm!",
          `Are you sure you want to ${this.action.toLocaleLowerCase()} this item?`,
          "Yes, Proceed!"
        )
        .then((val) => {
          if (!val) return;

          if (this.action == "UPDATE") {
            this.doUpdateItem();
            return;
          }

          this.doAddItem();
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

    doAddItem() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/addItem`,
        data: {
          item_name: this.form.itemName.toUpperCase(),
          uom: this.form.uom.toUpperCase(),
        },
      }).then((res) => {
        this.$refs.msgBoxInfo.showAlert({
          title: "Successfully Added!",
          subTitle: "",
          success: true,
        });

        this.isLoading = false;
        this.fetchItem();
        this.$refs.modal.hideModal();
      });
    },

    doUpdateItem() {
      this.isLoading = true;
      axios({
        method: "PUT",
        url: `${this.$axios.defaults.baseURL}/updateItem/${this.form.id}`,
        data: {
          item_name: this.form.itemName.toUpperCase(),
          uom: this.form.uom.toUpperCase(),
        },
      }).then((res) => {
        this.$refs.msgBoxInfo.showAlert({
          title: "Successfully Updated!",
          subTitle: "",
          success: true,
        });

        this.isLoading = false;
        this.fetchItem();
        this.$refs.modal.hideModal();
      });
    },

    doDeleteItem(row) {
      this.isLoading = true;
      this.$refs.confirmModal
        .showModal(
          // @params: title:string, message:string, okTitle:string, danger:boolean
          "Please confirm!",
          "Are you sure you want to delete Items?",
          "Yes, Proceed!",
          true
        )
        .then((val) => {
          if (!val) return;

          axios({
            method: "DELETE",
            url: `${this.$axios.defaults.baseURL}/deleteItem/${row.id}`,
          }).then((res) => {
            console.log(res);
            this.$refs.msgBoxInfo.showAlert({
              title: res.data.message ?? res.data,
              subTitle: "",
              successDanger: true,
            });
            this.isLoading = false;
            this.fetchItem();
          });
        });
    },
  },

  computed: {},

  created() {
    this.fetchItem();
  },
};
</script>
