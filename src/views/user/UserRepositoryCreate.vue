<template>
  <div>
    <div class="container" v-if="loading">
      <div class="grid">
        <div class="header">
          <span class="badge">Создать статью</span>
          <div>
            <div class="input-field input">
              <select v-model="repository.languages">
                <option
                  v-for="language in programingLanguages"
                  v-bind:key="language.name"
                  v-bind:value="language.name"
                  >{{ language.name }}</option
                >
              </select>
              <label>Язык</label>
            </div>
            <div class="input-field input">
              <select v-model="repository.technologies">
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
              <select v-model="repository.accessibility">
                <option value="private" selected>Приватный</option>
                <option value="public">Публичный</option>
              </select>
              <label>Доступность</label>
            </div>
            <button
              class="btn"
              v-on:click="fff"
              v-bind:class="{
                disabled:
                  !$v.repository.name.required ||
                  !$v.repository.name.minLength ||
                  !$v.repository.name.maxLength ||
                  !$v.repository.repository.required ||
                  !$v.repository.repository.minLength ||
                  !$v.repository.repository.maxLength
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
              v-model="repository.name"
              v-bind:class="{
                invalid:
                  !$v.repository.name.required ||
                  !$v.repository.name.minLength ||
                  !$v.repository.name.maxLength
              }"
            />
            <label for="first_name_change">Название статьи</label>
          </div>
          <div class="input-field center">
            <textarea
              id="about"
              class="materialize-textarea"
              v-model="repository.about"
            />
            <label for="about">Описание статьи</label>
          </div>
        </div>
        <div class="section-2">
          <div class="input-field center">
            <input
              id="repository"
              type="url"
              placeholder="https://github.com/USER/REPOSITORY"
              v-model="repository.repository"
              v-bind:class="{
                invalid:
                  !$v.repository.repository.required ||
                  !$v.repository.repository.minLength ||
                  !$v.repository.repository.maxLength
              }"
            />
            <label for="site">Git Hub репозиторий</label>
          </div>
          <div class="input-field center">
            <input
              id="site"
              type="url"
              class="validate"
              placeholder="https://www.example.com"
              v-model="repository.cite"
            />
            <label for="site">Официальный сайт</label>
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
  name: "UserRepositoryCreate",
  components: { Loader },
  data() {
    return {
      loading: false,
      repository: {
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
  validations: {
    repository: {
      name: {
        minLength: minLength(3),
        maxLength: maxLength(10),
        required
      },
      repository: {
        minLength: minLength(17),
        maxLength: maxLength(30),
        required
      }
    }
  },
  computed: {
    technologySelected() {
      if (this.repository.languages) {
        return this.programingLanguages[this.repository.languages].technologies;
      } else {
        return [];
      }
    }
  },
  async mounted() {
    this.programingLanguages = await this.$store.dispatch("fetchCategories");
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
        slug: slugify(this.repository.name),
        name: this.repository.name,
        about: this.repository.about,
        cite: this.repository.cite.split("://")[
          this.repository.cite.split("://").length - 1
        ],
        repository: this.repository.repository.split("github.com/")[
          this.repository.repository.split("github.com/").length - 1
        ],
        accessibility: this.repository.accessibility,
        languages: this.repository.languages,
        technologies: this.repository.technologies
      };
      await this.$store.dispatch("createRepository", repositoryData);
      this.$messageSuccess(`Вы создали статью: ${repositoryData.name}`);
      await this.$router.push(
        `/${this.$store.getters.user.profile}/repositories`
      );
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
