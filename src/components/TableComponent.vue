<template>
  <table class="table w-full border border-gray-200">
    <thead class="w-full bg-indigo-400 text-white">
      <th><input type="checkbox" @click="selectAllUser" /></th>
      <th @click="setSortType('id')">№</th>
      <th @click="setSortType('firstName')">Name</th>
      <th @click="setSortType('birthDate')">Date</th>
      <th @click="setSortType('status')">Status</th>
    </thead>

    <tbody class="w-full">
      <tr class="w-full" v-for="user in sortedUsers" :key="user.id">
        <td><input type="checkbox" @click="checkUser(user.id)" /></td>
        <td>{{ user.id }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.birthDate }}</td>
        <td class="capitalize">{{ user.status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { users } from "../datas";

export default {
  data() {
    return {
      users: users,
      currentSort: "id",
      currentSortDir: "asc",
      userCheck: [],
    };
  },
  computed: {
    sortedUsers() {
      return this.users.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },
  methods: {
    setSortType(type) {
      if (type === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = type;
    },
    checkUser(id) {
      this.userCheck = id;
    },
    selectAllUser() {},
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.table {
  thead {
    border-bottom: 1px solid #eee;
    th {
      padding: 10px 0;
      cursor: pointer;
      user-select: none;
    }
  }
  tr {
    text-align: center;
    border: 1px solid #eee;
  }
  td {
    padding: 10px 0;
  }
}
</style>