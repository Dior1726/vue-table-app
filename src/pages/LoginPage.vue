<template>
  <div
    class="bg-indigo-200 min-h-screen w-full flex items-center justify-center"
  >
    <div class="max-w-md w-full bg-white rounded-xl p-10 shadow-md">
      <h3 class="text-center text-3xl font-semibold text-indigo-400 mb-10">
        Login
      </h3>
      <div class="px-10 flex items-center justify-center mb-5">
        <input
          type="text"
          class="
            border border-indigo-400
            w-full
            p-2
            rounded-lg
            outline-none
            text-indigo-400
            placeholder-indigo-200
            font-medium
          "
          placeholder="Enter your email"
          v-model="email"
        />
      </div>

      <div class="px-10 flex items-center justify-center mb-10">
        <input
          type="password"
          class="
            border border-indigo-400
            w-full
            p-2
            rounded-lg
            outline-none
            text-indigo-400
            placeholder-indigo-200
            font-medium
          "
          placeholder="Password"
          v-model="password"
        />
      </div>

      <div class="px-10 flex items-center justify-center">
        <button
          class="
            bg-indigo-400
            text-white
            w-full
            p-2
            rounded-lg
            font-medium
            hover:bg-indigo-500
          "
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.email.trim() === "admin" && this.password.trim() === "admin") {
        this.$router.push("/home");
      } else {
        alert("Не правильный логин или пароль!");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
