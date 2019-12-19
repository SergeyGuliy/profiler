<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Статьи</span>
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
              <tr v-for="article in publicArticles" v-bind:key="article.id">
                <td>{{ article.id }}</td>
                <td>{{ article.name }}</td>
                <td>{{ article.creator }}</td>
                <td class="flex">
                  <button class="btn del">
                    <img src="../../../assets/icons/showArticles.png" alt="" />
                  </button>
                  <button
                    class="btn del"
                    v-if="!myArticleList.includes(article.id) && userLoggedIn"
                    v-on:click="addArticle(article.id)"
                  >
                    <img src="../../../assets/icons/addFriend.png" alt="" />
                  </button>
                  <button
                    class="btn del"
                    v-if="myArticleList.includes(article.id) && userLoggedIn"
                    v-on:click="deleteArticle(article.id)"
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
  name: "Articles",
  components: { Loader },
  data() {
    return {
      loading: false,
      publicArticles: []
    };
  },
  computed: {
    myArticleList() {
      if (this.$store.getters.user.lists.articles) {
        return this.$store.getters.user.lists.articles;
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
    const allArticles = await this.$store.dispatch("fetchAllArticles");
    const publicArticlesId = await this.$store.dispatch(
      "fetchArticlesArticles"
    );
    let publicArticles = [];
    for (let f of publicArticlesId) {
      let article = allArticles[f];
      article.id = f;
      publicArticles.push(article);
    }
    this.publicArticles = publicArticles;
    this.loading = true;
  },
  methods: {
    async addArticle(articleId) {
      try {
        await this.$store.commit("pushArticle", articleId);
        await this.$store.dispatch("updateArticlesList");
      } catch (e) {
        console.log(e);
      }
    },
    async deleteArticle(articleId) {
      try {
        await this.$store.commit("deleteMyArticle", articleId);
        await this.$store.dispatch("updateArticlesList");
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
