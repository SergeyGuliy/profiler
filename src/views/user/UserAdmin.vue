<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Админка</span>
      </div>
      <div class="section-1">
        <div class="row">
          <div class="input-field center col s12">
            <input
              id="programingLanguages"
              type="text"
              v-model="programingLanguage"
              v-bind:class="{
                invalid:
                  !$v.programingLanguage.required ||
                  !$v.programingLanguage.minLength ||
                  !$v.programingLanguage.maxLength
              }"
            />
            <label for="programingLanguages">Язык програмирования</label>
          </div>
          <button
            class="btn col s12"
            v-on:click="addLanguage"
            v-bind:class="{
              disabled:
                !$v.programingLanguage.required ||
                !$v.programingLanguage.minLength ||
                !$v.programingLanguage.maxLength
            }"
          >
            Добавить
          </button>
        </div>
        <ul class="collection">
          <li
            class="collection-item"
            v-for="language in programingLanguages"
            v-bind:key="language.name"
          >
            <div>
              {{ language.name
              }}<button
                class="btn secondary-content"
                v-on:click="deleteLanguage(language.name)"
              >
                Удалить
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="section-2">
        <div class="row">
          <div class="input-field col s12">
            <select v-model="programingLanguageSelected">
              <option
                v-for="language in programingLanguages"
                v-bind:key="language.name"
                v-bind:value="language.name"
                >{{ language.name }}</option
              >
            </select>
            <label>Materialize Select</label>
          </div>
          <div class="input-field center col s12">
            <input
              id="technology"
              type="text"
              v-model="technology"
              v-bind:class="{
                invalid:
                  !$v.technology.required ||
                  !$v.technology.minLength ||
                  !$v.technology.maxLength ||
                  !programingLanguageSelected
              }"
            />
            <label for="technology">Технологии</label>
          </div>
          <button
            class="btn col s12"
            v-on:click="addTechnology"
            v-bind:class="{
              disabled:
                !$v.technology.required ||
                !$v.technology.minLength ||
                !$v.technology.maxLength ||
                !programingLanguageSelected
            }"
          >
            Добавить
          </button>
        </div>
        <ul class="collection">
          <li
            class="collection-item"
            v-for="technology in languageTechnologies"
            v-bind:key="technology"
          >
            <div>
              {{ technology
              }}<button
                class="btn secondary-content"
                v-on:click="deleteTechnology(technology)"
              >
                Удалить
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../components/Loader";
import M from "materialize-css/dist/js/materialize.min";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "UserAdmin",
  components: { Loader },
  data() {
    return {
      loading: false,
      programingLanguages: "",
      programingLanguageSelected: "",
      programingLanguage: "",
      technology: ""
    };
  },
  validations: {
    programingLanguage: {
      minLength: minLength(1),
      maxLength: maxLength(10),
      required
    },
    technology: { minLength: minLength(1), maxLength: maxLength(10), required }
  },
  computed: {
    languageTechnologies() {
      if (
        this.programingLanguageSelected ||
        this.programingLanguages[this.programingLanguageSelected]
      ) {
        if (
          this.programingLanguages[this.programingLanguageSelected].technologies
        ) {
          return this.programingLanguages[this.programingLanguageSelected]
            .technologies;
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  },
  methods: {
    async addLanguage() {
      this.programingLanguages[this.programingLanguage] = {
        name: this.programingLanguage,
        technologies: []
      };
      this.programingLanguage = "";
      await this.$store.dispatch("updateCategories", this.programingLanguages);
    },
    async deleteLanguage(language) {
      if (this.programingLanguageSelected === language) {
        this.programingLanguageSelected = "";
      }
      this.programingLanguages = await this.$store.dispatch("fetchCategories");
      delete this.programingLanguages[language];
      await this.$store.dispatch("updateCategories", this.programingLanguages);
    },
    async addTechnology() {
      if (
        this.programingLanguages[this.programingLanguageSelected]
          .technologies === undefined
      ) {
        this.programingLanguages[
          this.programingLanguageSelected
        ].technologies = [this.technology];
      } else {
        this.programingLanguages[
          this.programingLanguageSelected
        ].technologies.push(this.technology);
      }
      this.technology = "";
      await this.$store.dispatch("updateCategories", this.programingLanguages);
    },
    async deleteTechnology(technology) {
      this.programingLanguages = await this.$store.dispatch("fetchCategories");
      let technologyIndex = this.programingLanguages[
        this.programingLanguageSelected
      ].technologies.findIndex(function(index) {
        return index === technology;
      });
      this.programingLanguages[
        this.programingLanguageSelected
      ].technologies.splice(technologyIndex, 1);
      await this.$store.dispatch("updateCategories", this.programingLanguages);
    }
  },
  async mounted() {
    this.programingLanguages = await this.$store.dispatch("fetchCategories");
    M.FormSelect.init(document.querySelectorAll("select"));
    this.loading = true;
  },
  async updated() {
    M.FormSelect.init(document.querySelectorAll("select"));
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

.center
  min-height: 51px !important
li div
  height: 30px
  button
    height: 30px
</style>
