<template>
  <div>
    <div class="container" v-if="loading">
      <div v-if="article">
        <div class="grid" v-if="loading">
          <div class="header">
            <div>
              <span class="badge">{{ article.name }}</span>
            </div>
          </div>

          <div class="section-1">
            <ul class="collection with-header">
              <li class="collection-header"><h5>Информация:</h5></li>
              <li class="collection-item">
                Создатель:
                <router-link
                  v-if="article.name"
                  class="right"
                  :to="{
                    name: 'user',
                    params: { user: article.creator_id }
                  }"
                  >{{ article.creator }}</router-link
                >
                <span v-else class="right">Не указано</span>
              </li>
              <li class="collection-item">
                Доступность:
                <span v-if="article.accessibility === 'private'" class="right"
                  >Приватный</span
                >
                <span v-else class="right">Публичный</span>
              </li>
              <li class="collection-header"><h5>Описание:</h5></li>
              <li class="collection-item">
                <pre v-if="article.about">{{ article.about }}</pre>
                <pre v-else>Не указано</pre>
              </li>
            </ul>
          </div>
          <div class="section-2">
            <ul class="collection with-header">
              <li class="collection-header"><h5>Ключи:</h5></li>
              <li class="collection-item">
                Язык програмирования:
                <span v-if="article.languages" class="right">{{
                  article.languages
                }}</span>
                <span v-else class="right">Не указано</span>
              </li>
              <li class="collection-item">
                Технология:
                <span v-if="article.technologies" class="right">{{
                  article.technologies
                }}</span>
                <span v-else class="right">Не указано</span>
              </li>
              <li
                class="collection-header"
                v-if="article.cite || article.repository"
              >
                <h5>Ссылки:</h5>
              </li>
              <li class="collection-item" v-if="article.cite">
                На официальный сайт:<a
                  target="_blank"
                  :href="'http://' + article.cite"
                  class="right"
                  >{{ article.cite }}</a
                >
              </li>
              <li class="collection-item" v-if="article.repository">
                На GitHub репозиторий:<a
                  target="_blank"
                  :href="'https://github.com/' + article.repository"
                  class="right"
                  >{{ article.repository }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Error v-else />
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
export default {
  name: "Article",
  components: { Loader, Error },
  data() {
    return {
      loading: false,
      article: "",
      programingLanguages: ""
    };
  },
  computed: {
    technologySelected() {
      if (this.article.languages) {
        return this.programingLanguages[this.article.languages].technologies;
      } else {
        return [];
      }
    }
  },
  async mounted() {
    this.programingLanguages = await this.$store.dispatch("fetchCategories");
    this.article = await this.$store.dispatch(
      "fetchArticleById",
      this.$route.params.article
    );
    console.log(this.article);
    this.loading = true;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2'
  @media screen and (max-width: 900px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2'
  @media screen and (max-width: 600px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2'

.section-1, .section-2, .section-3
  padding: 10px 10px !important
h5
  margin: 0 !important
.collection-item
  padding: 7px 30px !important
</style>
