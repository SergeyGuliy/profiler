<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Создать статью</span>
        <div>
          <div class="input-field input">
            <select v-model="article.accessibility">
              <option value="private" selected>Приватный</option>
              <option value="public">Публичный</option>
            </select>
          </div>
          <button class="btn" v-on:click="fff">
            Сохранить<img
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
            class="validate"
            v-model="article.name"
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
            class="validate"
            placeholder="https://www.example.com"
            v-model="article.cite"
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
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../components/Loader";
import M from "materialize-css/dist/js/materialize.min";
import { slugify } from "transliteration";
export default {
  name: "UserRepositoryCreate",
  components: { Loader },
  data() {
    return {
      loading: false,
      article: {
        name: "",
        about: "",
        cite: "",
        repository: "",
        accessibility: "private"
      }
    };
  },
  async mounted() {
    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll("select"));
    this.loading = true;
  },
  updated() {
    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll("select"));
  },
  methods: {
    async fff() {
      const repositoryData = {
        id: await this.$store.dispatch("getRepositoryId"),
        slug: slugify(this.article.name),
        name: this.article.name,
        about: this.article.about,
        cite: this.article.cite.split("://")[
          this.article.cite.split("://").length - 1
        ],
        repository: this.article.repository.split("github.com/")[
          this.article.repository.split("github.com/").length - 1
        ],
        accessibility: this.article.accessibility
      };
      await this.$store.dispatch("createRepository", repositoryData);
    }
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2'
</style>
