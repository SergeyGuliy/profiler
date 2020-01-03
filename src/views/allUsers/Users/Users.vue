<template>
  <div>
    <div class="container" v-if="loading">
      <div class="grid" v-if="users.length === 0">
        <div class="header">
          <span class="badge">В системе нет пользователей</span>
        </div>
      </div>
      <div class="grid" v-else>
        <div class="header">
          <span class="badge">Пользователи</span>
          <div class="input-field">
            <input
              id="last_name"
              type="text"
              class="validate input"
              v-model="key"
            />
            <label for="last_name">Поиск</label>
          </div>
        </div>
        <div class="section-1">
          <div class="input-field center">
            <table
              v-if="publicUsersFiltred.length > 0"
              class="highlight centered table"
            >
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Друзей</th>
                  <th>Статьи</th>
                  <th>Репозитории</th>
                  <th>Профиль</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="user in publicUsersFiltred" v-bind:key="user.id">
                  <td>{{ user.profile || 0 }}</td>
                  <td>{{ user.lists.friends.length || 0 }}</td>
                  <td>{{ user.lists.articles.length || 0 }}</td>
                  <td>{{ user.lists.repositories.length || 0 }}</td>
                  <td class="flex">
                    <router-link
                      class="btn"
                      :to="{
                        name: 'user',
                        params: { user: user.id }
                      }"
                    >
                      <img src="../../../assets/icons/user.png" alt="" />
                    </router-link>
                    <button
                      class="btn del"
                      v-if="
                        !friendsList.includes(user.id) &&
                          userLoggedIn &&
                          user.id != $store.getters.user.id
                      "
                      v-on:click="addFriend(user.id)"
                    >
                      <img src="../../../assets/icons/addFriend.png" alt="" />
                    </button>
                    <button
                      class="btn del"
                      v-if="
                        friendsList.includes(user.id) &&
                          userLoggedIn &&
                          user.id != $store.getters.user.id
                      "
                      v-on:click="deleteFriend(user.id)"
                    >
                      <img src="../../../assets/icons/delete.png" alt="" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else class="center">Поиск не дал результатов</p>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../../components/Loader";
import defaultsDeep from "/mnt/d032024c-b3ba-4342-a367-51e8737d8935/IT/My_Projects/3_Vue.js/profiler/node_modules/lodash.defaultsdeep/index.js";

export default {
  name: "Users",
  components: { Loader },
  data() {
    return {
      loading: false,
      key: "",
      users: []
    };
  },
  computed: {
    publicUsersFiltred() {
      if (this.key === "") {
        return this.users;
      } else {
        return this.users.filter(value => {
          return value.profile.toLowerCase().includes(this.key.toLowerCase());
        });
      }
    },
    friendsList() {
      if (this.$store.getters.user.lists.friends) {
        return this.$store.getters.user.lists.friends;
      } else {
        return [];
      }
    },
    userLoggedIn() {
      if (this.$store.getters.user.profile) {
        return true;
      } else {
        return false;
      }
    }
  },
  async mounted() {
    let users = (await this.$store.dispatch("fetchAllUsers")) || [];
    let userArray = [];
    for (let f in users) {
      let userModified = users[f];
      const userBasic = {
        lists: {
          friends: [],
          articles: [],
          repositories: []
        }
      };
      const user = defaultsDeep(userModified, userBasic);

      userArray.push(user);
    }
    this.users = userArray;
    this.loading = true;
  },
  methods: {
    async addFriend(userId) {
      try {
        await this.$store.commit("pushFriend", userId);
        await this.$store.dispatch("updateFriendsList");
      } catch (e) {
        console.log(e);
      }
    },
    async deleteFriend(userId) {
      try {
        await this.$store.commit("deleteFriend", userId);
        await this.$store.dispatch("updateFriendsList");
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
</style>
