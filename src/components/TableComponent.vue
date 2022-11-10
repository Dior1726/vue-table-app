<template>
  <div>
    <table class="table w-full border border-gray-200">
      <thead class="w-full bg-indigo-400 text-white">
        <th>
          <input
            type="checkbox"
            @click="selectAllUser"
            :checked="users.length === userCheck.length"
          />
        </th>
        <th @click="setSortType('id')">№</th>
        <th @click="setSortType('firstName')">Name</th>
        <th @click="setSortType('birthDate')">Date</th>
        <th @click="setSortType('status')">Status</th>
      </thead>

      <tbody class="w-full">
        <tr class="w-full" v-for="user in sortedUsers" :key="user.id">
          <td>
            <input
              type="checkbox"
              @click="checkUser(user.id)"
              :checked="userCheck.includes(user.id)"
            />
          </td>
          <td>{{ user.id }}</td>
          <td class="cursor-pointer">{{ user.firstName }}</td>
          <td>{{ user.birthDate }}</td>
          <td>{{ user.status }}</td>
        </tr>
      </tbody>
    </table>

    <div
      class="my-4 flex items-center justify-between"
      v-if="userCheck.length > 0"
    >
      <select
        v-model="userStatus"
        class="outline-none border border-indigo-400 p-2 rounded-md"
      >
        <option value="active">Active</option>
        <option value="baned">Baned</option>
        <option value="verified">Verified</option>
        <option value="deleted">Deleted</option>
      </select>

      <button
        @click="changeUsersStatus"
        class="p-2 bg-indigo-400 rounded-md text-white"
      >
        Поменять статус выбранных элементов
      </button>
    </div>
  </div>
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
      userStatus: "active",
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
      if (this.userCheck.includes(id)) {
        this.userCheck = this.userCheck.filter((el) => el !== id);
      } else {
        this.userCheck.push(id);
      }
    },

    selectAllUser() {
      if (this.users.length === this.userCheck.length) {
        this.userCheck = [];
      } else {
        this.userCheck = this.users.map((user) => user.id);
      }
    },

    changeUsersStatus() {
      this.userCheck.forEach((id) => {
        this.users.forEach((user) => {
          if (id === user.id) {
            user.status = this.userStatus;
          }
        });
      });

      this.userCheck = [];
    },
  },
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
    text-transform: capitalize;
  }
}
</style>