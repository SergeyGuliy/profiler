<template>
  <div>
    <div v-if="loading">
      <div class="grid" v-if="users.length === 0">
        <div class="header">
          <span class="badge">В системе нет пользователей</span>
        </div>
      </div>
      <div class="grid" v-else>
        <div class="header">
          <span class="badge">Пользователи</span>
          <div>
            <input type="text" class="validate input" />
            <button class="btn">
              Поиск<img
                class="right ico"
                src="../../../assets/icons/search.png"
                alt=""
              />
            </button>
          </div>
        </div>
        <div class="section-1">
          <div class="input-field center">
            <table class="highlight centered table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Имя</th>
                  <th>Оценка</th>
                  <th>Профиль</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="user in users" v-bind:key="user.id">
                  <td>1</td>
                  <td>{{ user.profile }}</td>
                  <td>18</td>
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
                      v-if="!friendsList.includes(user.id) && userLoggedIn"
                      v-on:click="addFriend(user.id)"
                    >
                      <img src="../../../assets/icons/addFriend.png" alt="" />
                    </button>
                    <button
                      class="btn del"
                      v-if="friendsList.includes(user.id) && userLoggedIn"
                      v-on:click="deleteFriend(user.id)"
                    >
                      <img src="../../../assets/icons/delete.png" alt="" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../../components/Loader";
export default {
  name: "Users",
  components: { Loader },
  data() {
    return {
      loading: false,
      users: []
    };
  },
  computed: {
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
    if (this.userLoggedIn) {
      if (Object.keys(users).length === 1) {
        users = [];
      } else if (Object.keys(users).length > 1) {
        delete users[this.$store.getters.user.id];
      }
    }
    this.users = users;
    this.loading = true;
  },
  async updated() {
    let users = (await this.$store.dispatch("fetchAllUsers")) || [];
    if (this.userLoggedIn) {
      if (Object.keys(users).length === 1) {
        users = [];
      } else if (Object.keys(users).length > 1) {
        delete users[this.$store.getters.user.id];
      }
    }
    this.users = users;
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
