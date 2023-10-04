<template>
  <div class="login rounded overflow-hidden shadow-md">
    <form action="">
      <p class="text-left text-2xl mb-6">Truck Scale</p>
      <input-group class="mt-2" labelName="Username" inputType="text" />
      <input-group class="mt-4" labelName="Password" inputType="password" />
      <button-primary class="mt-6" text="Login"></button-primary>
    </form>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style>
.login {
  height: 60vh;
  padding: 80px 56px;
  margin: 5% 40% 0 34%;
  background-color: whitesmoke;
}

@media only screen and (max-width: 800px) {
  .login {
    padding: 34px;
    margin: 10% 20%;
    background-color: white;
  }
}
</style>
