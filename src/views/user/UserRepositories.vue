<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Мои репозитории</span>
        <div>
          <input id="search" type="text" class="validate" />
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
                  <button class="btn">
                    <img
                      src="../../assets/icons/showGitHub.png"
                      alt=""
                    /></button
                  ><button class="btn del">
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
    }
  },
  async mounted() {
    this.loading = true;
    const allRepositories = await this.$store.dispatch("fetchAllRepositories");
    let myRepositories = [];
    for (let f of this.myRepositoriesId) {
      let repository = allRepositories[f];
      repository.id = f;
      myRepositories.push(repository);
    }
    this.myRepositories = myRepositories;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
</style>
