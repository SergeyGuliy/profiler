<template>
  <div>
    <div v-if="loading">
      <div class="grid" v-if="myRepositories.length === 0">
        <div class="header">
          <span class="badge">У вас нет репозиториев</span>
          <div>
            <router-link v-if="userLoggedIn" class="btn" to="/repositories"
              >Все Репозитории</router-link
            >
            <router-link
              v-if="userLoggedIn"
              class="btn"
              :to="{
                name: 'repository_create',
                params: { user: $store.getters.user.profile }
              }"
              >Создать</router-link
            >
          </div>
        </div>
      </div>

      <div v-else class="grid">
        <div class="header">
          <span class="badge">Мои репозитории</span>
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
            <table class="highlight centered table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Название</th>
                  <th>Оценка</th>
                  <th>Профиль</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="repository in myRepositories"
                  v-bind:key="repository.id"
                >
                  <td>{{ repository.id }}</td>
                  <td>{{ repository.name }}</td>
                  <td>{{ repository.creator }}</td>
                  <td class="flex">
                    <button
                      class="btn del"
                      v-if="
                        myRepositoriesId.includes(repository.id) && userLoggedIn
                      "
                      v-on:click="deleteRepository(repository.id)"
                    >
                      <img src="../../assets/icons/delete.png" alt="" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <router-link
          class="btn-floating btn-large waves-effect waves-light red"
          :to="{
            name: 'repository_create',
            params: { user: $store.getters.user.profile }
          }"
          ><i class="material-icons">add</i></router-link
        >
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../components/Loader";
export default {
  name: "UserRepositories",
  components: { Loader },
  data() {
    return {
      loading: false,
      myRepositories: []
    };
  },
  computed: {
    myRepositoriesId() {
      return this.$store.getters.user.lists.repositories;
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
    async deleteRepository(userId) {
      try {
        await this.$store.commit("deleteMyRepository", userId);
        await this.$store.dispatch("updateRepositoriesList");
      } catch (e) {
        console.log(e);
      }
    }
  },
  async mounted() {
    const allRepositories = await this.$store.dispatch("fetchAllRepositories");
    let myRepositories = [];
    for (let f of this.myRepositoriesId) {
      let repository = allRepositories[f];
      repository.id = f;
      myRepositories.push(repository);
    }
    this.myRepositories = myRepositories;
    this.loading = true;
  },
  async updated() {
    const allRepositories = await this.$store.dispatch("fetchAllRepositories");
    let myRepositories = [];
    for (let f of this.myRepositoriesId) {
      let repository = allRepositories[f];
      repository.id = f;
      myRepositories.push(repository);
    }
    this.myRepositories = myRepositories;
    this.loading = true;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
</style>
