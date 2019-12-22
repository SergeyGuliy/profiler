<template>
  <div>
    <div v-if="loading">
      <div class="grid" v-if="users.length === 0">
        <div class="header">
          <span class="badge">У вас нет контактов</span>
          <div>
            <router-link v-if="userLoggedIn" class="btn" to="/users"
              >Пользователи</router-link
            >
          </div>
        </div>
      </div>

      <div v-else class="grid">
        <div class="header">
          <span class="badge">Друзья</span>
          <div>
            <input id="search" type="text" class="validate input" />
            <button class="btn">
              Поиск<img
                class="right ico"
                src="../../assets/icons/search.png"
                alt=""
              />
            </button>
          </div>
        </div>
        <div class="section-1">
          <div class="input-field center">
            <p class="center" v-if="myFriendsId.length === 0">
              У вас нет друзей
            </p>
            <table class="highlight centered table" v-else>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Имя</th>
                  <th>Оценка</th>
                  <th>Профиль</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="user in users" v-bind:key="user.uid">
                  <td>1</td>
                  <td>{{ user.profile }}</td>
                  <td>18</td>
                  <td class="flex">
                    <button
                      class="btn del"
                      v-if="myFriendsId.includes(user.id) && userLoggedIn"
                      v-on:click="deleteFriend(user.id)"
                    >
                      <img src="../../assets/icons/delete.png" alt="" />
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
import Loader from "../../components/Loader";
export default {
  name: "UserFriends",
  components: { Loader },
  data() {
    return {
      loading: false,
      users: []
    };
  },
  computed: {
    myFriendsId() {
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
  methods: {
    async deleteFriend(userId) {
      try {
        await this.$store.commit("deleteFriend", userId);
        await this.$store.dispatch("updateFriendsList");
      } catch (e) {
        console.log(e);
      }
    }
  },
  async mounted() {
    const users = await this.$store.dispatch("fetchAllUsers");
    let myFriends = [];
    for (let i of this.myFriendsId) {
      let user = users[i];
      myFriends.push(user);
    }
    this.users = myFriends;
    this.loading = true;
  },
  async updated() {
    const users = await this.$store.dispatch("fetchAllUsers");
    let myFriends = [];
    for (let i of this.myFriendsId) {
      let user = users[i];
      myFriends.push(user);
    }
    this.users = myFriends;
    this.loading = true;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
</style>
