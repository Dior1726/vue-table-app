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
          <td class="cursor-pointer" @click="setCurrentUser(user)">
            {{ user.firstName }}
          </td>
          <td>{{ user.birthDate }}</td>
          <td>{{ user.status }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Change users status block -->
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

    <!-- Modal for edit user name -->
    <div
      class="
        fixed
        top-0
        left-0
        bottom-0
        right-0
        bg-black bg-opacity-50
        z-10
        flex
        items-center
        justify-center
        backdrop-filter backdrop-blur-sm
      "
      v-if="isShow"
    >
      <div class="max-w-md relative w-full p-10 bg-white shadow-lg rounded-lg">
        <div
          class="
            absolute
            top-2
            right-2
            w-8
            h-8
            rounded-full
            bg-indigo-400
            flex
            items-center
            justify-center
            cursor-pointer
            text-white
          "
          @click="hideModal"
        >
          X
        </div>

        <div class="mb-5">
          <label class="block mb-2">
            Enter new user name for
            <span class="text-indigo-400 font-medium">
              {{ currentUser ? currentUser.firstName : "" }}
            </span>
          </label>
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
            v-model="newUserName"
          />
        </div>

        <div class="flex justify-end gap-4">
          <button
            @click="hideModal"
            class="text-indigo-400 p-2 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            @click="setNewUserName"
            class="bg-indigo-400 text-white p-2 rounded-lg font-medium"
          >
            Save
          </button>
        </div>
      </div>
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

      currentUser: null,
      newUserName: "",

      isShow: false,
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

    setCurrentUser(user) {
      this.currentUser = user;
      this.showModal();
    },

    setNewUserName() {
      if (this.newUserName) {
        this.users.forEach((user) => {
          if (user.id === this.currentUser.id) {
            user.firstName = this.newUserName;
          }
        });
        this.newUserName = "";
        this.currentUser = null;
        this.hideModal();
      } else {
        alert("Enter something...");
      }
    },

    showModal() {
      this.isShow = true;
    },

    hideModal() {
      this.isShow = false;
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