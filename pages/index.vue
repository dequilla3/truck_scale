<template>
  <div class="login rounded overflow-hidden shadow-md">
    <form @submit="onSubmit">
      <p class="text-left text-3xl mb-10 drop-shadow-md">Truck Scale</p>

      <div class="text-sm">
        <input-group
          v-model="uname"
          class="mt-2"
          labelName="Username"
          inputType="number"
        />
        <input-group
          v-model="pw"
          class="mt-4"
          labelName="Password"
          inputType="password"
        />

        <button-primary
          type="submit"
          class="mt-6 w-full"
          text="Login"
          icon="arrow-right"
        ></button-primary>
      </div>
    </form>
    <MessageBoxInfo ref="msgBoxInfo" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "IndexPage",
  data() {
    return {
      uname: "",
      pw: "",
    };
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();
      axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/login`,
        data: {
          e_employee: this.uname,
          passwords: this.pw,
        },
      }).then((res) => {
        if (res.data.message) {
          localStorage.empId = 23135434;
          this.$router.push({ path: "/admin/supplier" });
          localStorage.selectedModule = "Supplier";
        } else {
          this.$refs.msgBoxInfo.showAlert({
            title: res.data,
            subTitle: "",
            danger: true,
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 60vh;
  padding: 80px 120px;
  margin: 5% 36% 0 30%;
  background-color: whitesmoke;
}

@media only screen and (max-width: 1000px) {
  .login {
    padding: 34px;
    margin: 10% 20%;
    background-color: white;
  }
}

@media only screen and (max-width: 800px) {
  .login {
    padding: 34px;
    margin: 10% 20%;
    background-color: white;
  }
}

@media only screen and (max-width: 400px) {
  .login {
    height: 100vh;
    padding-top: 100px;
    margin: 0 0;
    background-color: white;
  }
}
</style>
