<template>
  <div>
    <div v-if="loading" class="container">
      <div class="grid">
        <div class="header">
          <span class="badge">Создать статью</span>
          <div>
            <div class="input-field input">
              <select v-model="article.languages">
                <option
                  v-for="language of programingLanguages"
                  v-bind:key="language.name"
                  v-bind:value="language.name"
                  >{{ language.name }}</option
                >
              </select>
              <label>Язык</label>
            </div>
            <div class="input-field input">
              <select v-model="article.technologies">
                <option
                  v-for="technology in technologySelected"
                  v-bind:key="technology"
                  v-bind:value="technology"
                  >{{ technology }}</option
                >
              </select>
              <label>Технология</label>
            </div>
            <div class="input-field input">
              <select v-model="article.accessibility">
                <option value="private" selected>Приватный</option>
                <option value="public">Публичный</option>
              </select>
              <label>Доступность</label>
            </div>
            <button
              class="btn"
              v-on:click="createArticle"
              v-bind:class="{
                disabled:
                  !$v.article.name.required ||
                  !$v.article.name.minLength ||
                  !$v.article.name.maxLength ||
                  !$v.article.cite.required ||
                  !$v.article.cite.minLength ||
                  !$v.article.cite.maxLength
              }"
            >
              <span>Сохранить</span
              ><img
                class="right ico"
                src="../../assets/icons/save.png"
                alt=""
              />
            </button>
          </div>
        </div>

        <div class="section-1">
          <div class="input-field center">
            <input
              id="first_name_change"
              type="text"
              v-model="article.name"
              v-bind:class="{
                invalid:
                  !$v.article.name.required ||
                  !$v.article.name.minLength ||
                  !$v.article.name.maxLength
              }"
            />
            <label for="first_name_change">Название статьи</label>
          </div>
          <div class="input-field center">
            <textarea
              id="about"
              class="materialize-textarea"
              v-model="article.about"
            />
            <label for="about">Описание статьи</label>
          </div>
        </div>
        <div class="section-2">
          <div class="input-field center">
            <input
              id="site"
              type="url"
              placeholder="https://www.example.com"
              v-model="article.cite"
              v-bind:class="{
                invalid:
                  !$v.article.cite.required ||
                  !$v.article.cite.minLength ||
                  !$v.article.cite.maxLength
              }"
            />
            <label for="site">Официальный сайт</label>
          </div>
          <div class="input-field center">
            <input
              id="repository"
              type="url"
              class="validate"
              placeholder="https://github.com/USER/REPOSITORY"
              v-model="article.repository"
            />
            <label for="site">Git Hub репозиторий</label>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../components/Loader";
import M from "materialize-css/dist/js/materialize.min";
import { slugify } from "transliteration";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "UserArticlesCreate",
  components: { Loader },
  data() {
    return {
      loading: false,
      programingLanguages: "",
      article: {
        name: "",
        languages: "",
        technologies: "",
        about: "",
        cite: "",
        repository: "",
        accessibility: "private"
      }
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
  validations: {
    article: {
      name: {
        minLength: minLength(3),
        maxLength: maxLength(10),
        required
      },
      cite: { minLength: minLength(6), maxLength: maxLength(50), required }
    }
  },
  async mounted() {
    this.programingLanguages = await this.$store.dispatch("fetchCategories");
    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll("select"));
    console.log(this.programingLanguages);
    this.loading = true;
  },
  updated() {
    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll("select"));
  },
  methods: {
    async createArticle() {
      const articleData = {
        id: await this.$store.dispatch("getArticleId"),
        slug: slugify(this.article.name),
        name: this.article.name,
        about: this.article.about,
        cite: this.article.cite.split("://")[
          this.article.cite.split("://").length - 1
        ],
        repository: this.article.repository.split("https://github.com/")[
          this.article.repository.split("https://github.com/").length - 1
        ],
        accessibility: this.article.accessibility,
        languages: this.article.languages,
        technologies: this.article.technologies
      };
      await this.$store.dispatch("createArticle", articleData);
      this.$messageSuccess(`Вы создали статью: ${articleData.name}`);
      await this.$router.push(`/${this.$store.getters.user.profile}/articles`);
    }
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2'
  @media screen and (max-width: 800px)
    grid-template-rows: 99px 1fr 1fr 1fr
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2'


.header
  @media screen and (max-width: 800px)
    flex-direction: column
    align-items: start
    justify-content: space-evenly
</style>
