<template>
  <div>
    <div class="container" v-if="loading">
      <div class="grid" v-if="myArticles.length === 0">
        <div class="header">
          <span class="badge">У вас нет статей</span>
          <div>
            <router-link v-if="userLoggedIn" class="btn" to="/articles"
              >Все Статьи</router-link
            >
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
        <router-link
          class="btn-floating btn-large waves-effect waves-light red"
          :to="{
            name: 'articles_create',
            params: { user: $store.getters.user.profile }
          }"
          ><i class="material-icons">add</i></router-link
        >
      </div>

      <div v-else class="grid">
        <div class="header">
          <span class="badge">Мои статьи</span>
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
            <div v-if="myArticlesId.length === 0">
              <p class="center">У вас нет статей</p>
              <router-link class="btn center" to="/articles"
                >Посмотреть список всех статей</router-link
              >
            </div>
            <table
              v-else-if="myArticlesFiltred.length > 0"
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
                  v-for="article in myArticlesFiltred"
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
                      <img src="../../assets/icons/showArticles.png" alt="" />
                    </router-link>
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
            <p v-else class="center">Поиск не дал результатов</p>
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
      key: "",
      myArticles: []
    };
  },
  computed: {
    myArticlesFiltred() {
      if (this.key === "") {
        return this.myArticles;
      } else {
        return this.myArticles.filter(value => {
          return (
            value.name.toLowerCase().includes(this.key.toLowerCase()) ||
            value.languages.toLowerCase().includes(this.key.toLowerCase()) ||
            value.technologies.toLowerCase().includes(this.key.toLowerCase())
          );
        });
      }
    },
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
