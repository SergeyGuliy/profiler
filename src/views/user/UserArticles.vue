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
          <div v-if="myArticlesId.length === 0">
            <p class="center">У вас нет статей</p>
            <router-link class="btn center" to="/articles"
              >Посмотреть список всех статей</router-link
            >
          </div>
          <table v-else class="highlight centered table">
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
                  <button
                    class="btn del"
                    v-if="myArticlesId.includes(article.id) && userLoggedIn"
                    v-on:click="deleteArticle(article.id)"
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
    async deleteArticle(userId) {
      try {
        await this.$store.commit("deleteMyArticle", userId);
        await this.$store.dispatch("updateArticlesList");
      } catch (e) {
        console.log(e);
      }
    }
  },
  async mounted() {
    const allArticles = await this.$store.dispatch("fetchAllArticles");
    let myArticles = [];
    for (let f of this.myArticlesId) {
      let article = allArticles[f];
      article.id = f;
      myArticles.push(article);
    }
    this.myArticles = myArticles;
    this.loading = true;
  },
  async updated() {
    const allArticles = await this.$store.dispatch("fetchAllArticles");
    let myArticles = [];
    for (let f of this.myArticlesId) {
      let article = allArticles[f];
      article.id = f;
      myArticles.push(article);
    }
    this.myArticles = myArticles;
    this.loading = true;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
</style>
