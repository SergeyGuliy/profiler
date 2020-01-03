<template>
  <div>
    <div class="container" v-if="loading">
      <div>
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
          <router-link
            class="btn-floating btn-large waves-effect waves-light red"
            :to="{
              name: 'repository_create',
              params: { user: $store.getters.user.profile }
            }"
            ><i class="material-icons">add</i></router-link
          >
        </div>

        <div v-else class="grid">
          <div class="header">
            <span class="badge">Мои репозитории</span>
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
                v-if="myRepositoriesFiltred.length > 0"
                class="highlight centered table"
              >
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Создатель</th>
                    <th>Язык</th>
                    <th>Технология</th>
                    <th>Профиль</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="repository in myRepositoriesFiltred"
                    v-bind:key="repository.id"
                  >
                    <td>{{ repository.name }}</td>
                    <td>{{ repository.creator }}</td>
                    <td>{{ repository.languages }}</td>
                    <td>{{ repository.technologies }}</td>
                    <td class="flex">
                      <router-link
                        class="btn del"
                        :to="{
                          name: 'repository',
                          params: { repository: repository.id }
                        }"
                      >
                        <img src="../../assets/icons/showGitHub.png" alt="" />
                      </router-link>
                      <button
                        class="btn del"
                        v-if="
                          myRepositoriesId.includes(repository.id) &&
                            userLoggedIn
                        "
                        v-on:click="deleteRepository(repository.id)"
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
      key: "",
      myRepositories: []
    };
  },
  computed: {
    myRepositoriesFiltred() {
      if (this.key === "") {
        return this.myRepositories;
      } else {
        return this.myRepositories.filter(value => {
          return (
            value.name.toLowerCase().includes(this.key.toLowerCase()) ||
            value.languages.toLowerCase().includes(this.key.toLowerCase()) ||
            value.technologies.toLowerCase().includes(this.key.toLowerCase())
          );
        });
      }
    },
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
