<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Админка</span>
        <div>
          <button class="btn" v-on:click="saveHandler">
            Сохранить<img
              class="right ico"
              src="../../assets/icons/save.png"
              alt=""
            />
          </button>
        </div>
      </div>
      <div class="section-1">
        <div class="row">
          <div class="input-field center col s12">
            <input
              id="programingLanguages"
              type="text"
              class="validate"
              v-model="programingLanguage"
            />
            <label for="programingLanguages">Язык програмирования</label>
          </div>
          <button class="btn col s12" v-on:click="addLanguage">Добавить</button>
        </div>
        <ul class="collection">
          <li
            class="collection-item"
            v-for="language in programingLanguages"
            v-bind:key="language.name"
          >
            <div>
              {{ language.name
              }}<a href="#!" class="secondary-content"
                ><i class="material-icons">send</i></a
              >
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
              class="validate"
              v-model="technology"
            />
            <label for="technology">Технологии</label>
          </div>
          <button class="btn col s12" v-on:click="addTechnology">
            Добавить
          </button>
        </div>
        <ul class="collection">
          <li
            class="collection-item"
            v-for="technology in technologies"
            v-bind:key="technology.name"
          >
            <div>
              {{ technology
              }}<a href="#!" class="secondary-content"
                ><i class="material-icons">send</i></a
              >
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
export default {
  name: "UserAdmin",
  components: { Loader },
  data() {
    return {
      loading: false,
      programingLanguages: "",
      programingLanguageSelected: "",
      programingLanguage: "",
      technologies: "",
      technology: ""
    };
  },
  watch: {
    programingLanguageSelected(language) {
      this.technologies = this.programingLanguages[language].technologies || [];
    }
  },
  methods: {
    addLanguage() {
      this.programingLanguages[this.programingLanguage] = {
        name: this.programingLanguage,
        technologies: []
      };
      this.programingLanguage = "";
    },
    addTechnology() {
      if (
        this.programingLanguages[this.programingLanguageSelected]
          .technologies === undefined
      ) {
        this.programingLanguages[
          this.programingLanguageSelected
        ].technologies = [this.technology];
      }
      this.programingLanguages[
        this.programingLanguageSelected
      ].technologies.push(this.technology);
      this.technology = "";
    },
    async saveHandler() {
      try {
        await this.$store.dispatch(
          "updateCategories",
          this.programingLanguages
        );
      } catch (e) {
        console.log(e);
      }
    }
  },
  async mounted() {
    this.programingLanguages = await this.$store.dispatch("fetchCategories");
    M.FormSelect.init(document.querySelectorAll("select"));
    this.loading = true;
  },
  updated() {
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
    grid-template-rows: 72px 1fr 1fr
  @media screen and (max-width: 600px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2'

.center
  min-height: 51px !important
</style>
