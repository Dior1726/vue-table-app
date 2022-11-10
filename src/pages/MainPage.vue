<template>
  <div class="bg-indigo-200 min-h-screen w-full flex flex-col">
    <div
      class="w-full px-10 py-5 bg-indigo-400 flex items-center justify-between"
    >
      <h2 class="text-white text-2xl">Admin</h2>
      <button
        class="text-white p-2 rounded-lg font-medium bg-indigo-500"
        @click="logout"
      >
        Logout
      </button>
    </div>

    <div class="flex items-center justify-center flex-grow p-4">
      <div class="max-w-2xl w-full bg-white rounded-xl p-10 shadow-md">
        <table-component />
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
export default {
  components: { TableComponent },
  methods: {
    logout() {
      this.$router.push("/login");
    },
  },
};
</script>
