<template>
  <div>
    <div class="container" v-if="loading">
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
            <p class="center" v-if="myFriendsId.length === 0">
              У вас нет друзей
            </p>
            <table
              v-else-if="myUsersFiltred.length > 0"
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
                <tr v-for="user in myUsersFiltred" v-bind:key="user.uid">
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
                      <img src="../../assets/icons/user.png" alt="" />
                    </router-link>
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
            <p v-else class="center">Поиск не дал результатов</p>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../components/Loader";
import { defaultsDeep } from "lodash";

export default {
  name: "UserFriends",
  components: { Loader },
  data() {
    return {
      loading: false,
      key: "",
      users: []
    };
  },
  computed: {
    myUsersFiltred() {
      if (this.key === "") {
        return this.users;
      } else {
        return this.users.filter(value => {
          return value.profile.toLowerCase().includes(this.key.toLowerCase());
        });
      }
    },
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
      let userModified = users[i];
      const userBasic = {
        lists: {
          friends: [],
          articles: [],
          repositories: []
        }
      };
      const user = defaultsDeep(userModified, userBasic);
      myFriends.push(user);
    }
    this.users = myFriends;
    this.loading = true;
  },
  async updated() {
    const users = await this.$store.dispatch("fetchAllUsers");
    let myFriends = [];
    for (let i of this.myFriendsId) {
      let userModified = users[i];
      const userBasic = {
        lists: {
          friends: [],
          articles: [],
          repositories: []
        }
      };
      const user = defaultsDeep(userModified, userBasic);
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
