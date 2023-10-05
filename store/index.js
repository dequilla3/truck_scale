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

    }
  }
};
