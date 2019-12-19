<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">GitHub репозитории</span>
        <div>
          <input type="text" class="validate" />
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
                <th>Название</th>
                <th>Оценка</th>
                <th>Профиль</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="repository in publicRepositories"
                v-bind:key="repository.id"
              >
                <td>{{ repository.id }}</td>
                <td>{{ repository.name }}</td>
                <td>{{ repository.creator }}</td>
                <td class="flex">
                  <button class="btn del">
                    <img src="../../../assets/icons/showArticles.png" alt="" />
                  </button>
                  <button
                    class="btn del"
                    v-if="
                      !myRepositoryList.includes(repository.id) && userLoggedIn
                    "
                    v-on:click="addRepository(repository.id)"
                  >
                    <img src="../../../assets/icons/addFriend.png" alt="" />
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
      publicRepositories: []
    };
  },
  computed: {
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
    const allRepositories = await this.$store.dispatch("fetchAllRepositories");
    const publicRepositoriesId = await this.$store.dispatch(
      "fetchPublicRepositories"
    );
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
