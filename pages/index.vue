<template>
  <div class="login rounded overflow-hidden shadow-md">
    <form @submit="onSubmit">
      <p class="text-left text-3xl mb-6">Truck Scale</p>
      <input-group class="mt-2" labelName="Username" inputType="text" />
      <input-group class="mt-4" labelName="Password" inputType="password" />
      <button-primary type="submit" class="mt-6 w-full" text="Login"></button-primary>
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
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 60vh;
  padding: 80px 56px;
  margin: 5% 40% 0 34%;
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
