import axios from "axios";

export default {

  state() {
    return {
    };
  },

  mutations: {

  },

  actions: {
    async fetchSuppliers({ commit }) {
      return axios({
        method: "GET",
        url: `${this.$axios.defaults.baseURL}/getSuppliers`
      }).then(res => {
        return res.data;
      });
    },
    async fetchItem({ commit }) {
      return axios({
        method: "GET",
        url: `${this.$axios.defaults.baseURL}/getItems`
      }).then(res => {
        return res.data;
      });
    },

    async fetchDrivers({ commit }) {
      return axios({
        method: "GET",
        url: `${this.$axios.defaults.baseURL}/getDrivers`
      }).then(res => {
        return res.data;
      });
    },

    async fetchTransType({ commit }) {
      return axios({
        method: "GET",
        url: `${this.$axios.defaults.baseURL}/getTranstype`
      }).then(res => {
        return res.data;
      });
    },

    async fetchSubTrans({ commit }) {
      return axios({
        method: "GET",
        url: `${this.$axios.defaults.baseURL}/getSubtransType`
      }).then(res => {
        return res.data;
      });
    },


    async fetchTransactions({ commit }) {
      return axios({
        method: "GET",
        url: `${this.$axios.defaults.baseURL}/allTransactions`
      }).then(res => {
        return res.data;
      });
    },

    async fetchRawTransactions({ commit }) {
      return axios({
        method: "GET",
        url: `${this.$axios.defaults.baseURL}/getAllTransactions`
      }).then(res => {
        return res.data;
      });
    },

    async fetchUsers({ commit }) {
      return axios({
        method: "GET",
        url: `${this.$axios.defaults.baseURL}/getUsers`
      }).then(res => {
        return res.data;
      });
    },



  }
};
