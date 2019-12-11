<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Мои статьи</span>
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
                <th>Создатель</th>
                <th>Профиль</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="article in myArticles" v-bind:key="article.id">
                <td>{{ article.id }}</td>
                <td>{{ article.name }}</td>
                <td>{{ article.creator }}</td>
                <td class="flex">
                  <button class="btn">
                    <img src="../../assets/icons/showArticles.png" alt="" />
                  </button>
                  <button class="btn del">
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
          name: 'articles_create',
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
  name: "UserArticles",
  components: { Loader },
  data() {
    return {
      loading: false,
      myArticles: []
    };
  },
  computed: {
    myArticlesId() {
      return this.$store.getters.user.lists.articles;
    }
  },
  async mounted() {
    this.loading = true;
    const allArticles = await this.$store.dispatch("fetchAllArticles");
    let myArticles = [];
    for (let f of this.myArticlesId) {
      let article = allArticles[f];
      article.id = f;
      myArticles.push(article);
    }
    this.myArticles = myArticles;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
</style>
