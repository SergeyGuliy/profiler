<template>
  <div>
    <div v-if="loading">
      <div class="grid" v-if="publicArticles.length === 0">
        <div class="header">
          <span class="badge">В системе нет статей</span>
          <div>
            <router-link
              v-if="userLoggedIn"
              class="btn"
              :to="{
                name: 'articles_create',
                params: { user: $store.getters.user.profile }
              }"
              >Создать</router-link
            >
          </div>
        </div>
      </div>
      <div v-else class="grid">
        <div class="header">
          <span class="badge">Статьи</span>
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
              v-if="publicArticlesFiltred.length > 0"
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
                  v-for="article in publicArticlesFiltred"
                  v-bind:key="article.id"
                >
                  <td>{{ article.name }}</td>
                  <td>{{ article.creator }}</td>
                  <td>{{ article.languages }}</td>
                  <td>{{ article.technologies }}</td>
                  <td class="flex">
                    <router-link
                      class="btn del"
                      :to="{
                        name: 'article',
                        params: { article: article.id }
                      }"
                    >
                      <img
                        src="../../../assets/icons/showArticles.png"
                        alt=""
                      />
                    </router-link>
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
  name: "Articles",
  components: { Loader },
  data() {
    return {
      loading: false,
      key: "",
      publicArticles: []
    };
  },
  computed: {
    publicArticlesFiltred() {
      if (this.key === "") {
        return this.publicArticles;
      } else {
        return this.publicArticles.filter(value => {
          return (
            value.languages.toLowerCase().includes(this.key.toLowerCase()) ||
            value.technologies.toLowerCase().includes(this.key.toLowerCase())
          );
        });
      }
    },
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
    const allArticles = (await this.$store.dispatch("fetchAllArticles")) || [];
    const publicArticlesId =
      (await this.$store.dispatch("fetchPublicArticles")) || [];
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
