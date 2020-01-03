<template>
  <div>
    <div class="container" v-if="loading">
      <div class="grid" v-if="publicRepositories.length === 0">
        <div class="header">
          <span class="badge">В системе нет репозиториев</span>
          <div>
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
        <div class="grid" v-if="publicRepositories.length === 0">
          <div class="header">
            <span class="badge">В системе нет пользователей</span>
          </div>
        </div>
        <div class="header">
          <span class="badge">GitHub репозитории</span>
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
              v-if="publicRepositoriesFiltred.length > 0"
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
                  v-for="repository in publicRepositoriesFiltred"
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
                      <img src="../../../assets/icons/showGitHub.png" alt="" />
                    </router-link>
                    <button
                      class="btn del"
                      v-if="
                        !myRepositoryList.includes(repository.id) &&
                          userLoggedIn
                      "
                      v-on:click="addRepository(repository.id)"
                    >
                      <img src="../../../assets/icons/addArticle.png" alt="" />
                    </button>
                    <button
                      class="btn del"
                      v-if="
                        myRepositoryList.includes(repository.id) && userLoggedIn
                      "
                      v-on:click="deleteRepository(repository.id)"
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
export default {
  name: "Repositories",
  components: { Loader },
  data() {
    return {
      loading: false,
      key: "",
      publicRepositories: []
    };
  },
  computed: {
    publicRepositoriesFiltred() {
      if (this.key === "") {
        return this.publicRepositories;
      } else {
        return this.publicRepositories.filter(value => {
          return (
            value.name.toLowerCase().includes(this.key.toLowerCase()) ||
            value.languages.toLowerCase().includes(this.key.toLowerCase()) ||
            value.technologies.toLowerCase().includes(this.key.toLowerCase())
          );
        });
      }
    },
    myRepositoryList() {
      if (this.$store.getters.user.lists.repositories) {
        return this.$store.getters.user.lists.repositories;
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
    const allRepositories =
      (await this.$store.dispatch("fetchAllRepositories")) || [];
    const publicRepositoriesId =
      (await this.$store.dispatch("fetchPublicRepositories")) || [];
    let publicRepositories = [];
    for (let f of publicRepositoriesId) {
      let repository = allRepositories[f];
      repository.id = f;
      publicRepositories.push(repository);
    }
    this.publicRepositories = publicRepositories;
    this.loading = true;
  },
  methods: {
    async addRepository(articleId) {
      try {
        await this.$store.commit("pushRepository", articleId);
        await this.$store.dispatch("updateRepositoriesList");
      } catch (e) {
        console.log(e);
      }
    },
    async deleteRepository(articleId) {
      try {
        await this.$store.commit("deleteMyRepository", articleId);
        await this.$store.dispatch("updateRepositoriesList");
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
