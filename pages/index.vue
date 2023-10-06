<template>
  <div class="login rounded overflow-hidden shadow-md">
    <form @submit="onSubmit">
      <p class="text-left text-3xl mb-10 drop-shadow-md">Truck Scale</p>

      <div class="text-sm">
        <input-group class="mt-2" labelName="Username" inputType="text" />
        <input-group class="mt-4" labelName="Password" inputType="password" />

        <button-primary
          type="submit"
          class="mt-6 w-full"
          text="Login"
          icon="arrow-right"
        ></button-primary>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$router.push({ path: "/admin/supplier" });
      localStorage.selectedModule = "Supplier";
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
