<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Профиль</span>
        <div>
          <a
            href="#modalBecomeAdmin"
            class="modal-trigger btn"
            v-if="!this.$store.getters.user.isAdmin"
          >
            Стать Админом<img
              class="right ico"
              src="../../assets/icons/adminBase.png"
              alt=""
            />
          </a>
          <button class="btn" v-on:click="editingSave">
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
            v-model="userUpdated.info.first_name"
          />
          <label for="first_name_change">Имя</label>
        </div>
        <div class="input-field center">
          <input
            id="last_name_change"
            type="text"
            class="validate"
            v-model="userUpdated.info.second_name"
          />
          <label for="last_name_change">Фамилия</label>
        </div>
        <div class="input-field center">
          <input
            id="datepicker"
            type="text"
            class="datepicker"
            v-model.lazy="userUpdated.info.dateOfBirth"
          />
          <label for="datepicker">Дата рождения</label>
        </div>
        <div class="input-field center">
          <input
            id="location"
            type="text"
            class="validate"
            v-model="userUpdated.info.location"
          />
          <label for="location">Локация</label>
        </div>
        <div class="input-field center">
          <textarea
            id="about"
            class="materialize-textarea"
            v-model="userUpdated.info.about"
          />
          <label for="about">Раскажите о себе</label>
        </div>
      </div>
      <div class="section-2">
        <div class="input-field center">
          <select v-model="userUpdated.work.tipe_of_work">
            <option value="" selected></option>
            <option value="Полная занятость">Полная занятость</option>
            <option value="Частичная занятость">Частичная занятость</option>
            <option value="Безработный">Безработный</option>
          </select>
          <label>Занятость</label>
        </div>
        <div class="input-field center">
          <select v-model="userUpdated.work.is_working">
            <option value="" selected></option>
            <option value="Офисный Работник">Офисный Работник</option>
            <option value="Фрилансер">Фрилансер</option>
          </select>
          <label>Тип работы</label>
        </div>
        <div class="input-field center">
          <select multiple v-model="userUpdated.work.position">
            <option value="Разработчий">Разработчий</option>
            <option value="Системный администратор"
              >Системный администратор</option
            >
            <option value="Тестировщик">Тестировщик</option>
            <option value="Бизнес аналитик">Бизнес аналитик</option>
            <option value="HR">HR</option>
          </select>
          <label>Должность</label>
        </div>
        <div class="input-field center">
          <select multiple v-model="userUpdated.work.languages">
            <option
              v-for="language in programingLanguages"
              v-bind:key="language.name"
              v-bind:value="language.name"
              >{{ language.name }}</option
            >
          </select>
          <label>Языки програмирования</label>
        </div>
        <div class="input-field center">
          <select multiple v-model="userUpdated.work.technologies">
            <optgroup
              v-for="language in programingLanguages"
              v-bind:key="language.name"
              v-bind:label="language.name"
            >
              <option
                v-for="technology in language.technologies"
                v-bind:key="technology"
                v-bind:value="technology"
                >{{ technology }}</option
              >
            </optgroup>
          </select>
          <label>Технологии</label>
        </div>
      </div>
      <div class="section-3">
        <div class="input-field center">
          <input
            id="tel"
            type="number"
            class="validate"
            placeholder="+XXX-XX-XXX-XX-XX"
            v-model="userUpdated.contacts.phone"
          />
          <label for="tel">Ваш телефон</label>
        </div>
        <div class="input-field center">
          <input
            id="site"
            type="url"
            class="validate"
            placeholder="https://www.example.com"
            v-model="userUpdated.contacts.site"
          />
          <label for="site">Ваш сайт визитка</label>
        </div>
        <div class="input-field center">
          <input
            id="linkedin"
            type="url"
            class="validate"
            placeholder="https://www.linkedin.com/in/UserName"
            v-model="userUpdated.contacts.linkedIn"
          />
          <label for="linkedin">Linked In</label>
        </div>
        <div class="input-field center">
          <input
            id="facebook"
            type="url"
            class="validate"
            placeholder="https://www.facebook.com/UserName"
            v-model="userUpdated.contacts.facebook"
          />
          <label for="facebook">Facebook</label>
        </div>
        <div class="input-field center">
          <input
            id="email"
            type="url"
            class="validate"
            placeholder="UserName@example.com"
            v-model="userUpdated.contacts.email"
          />
          <label for="email">E-mail</label>
        </div>
        <div class="input-field center">
          <input
            id="github"
            type="url"
            class="validate"
            placeholder="https://github.com/UserName"
            v-model="userUpdated.contacts.github"
          />
          <label for="email">GitHub profile</label>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../components/Loader";
import M from "materialize-css/dist/js/materialize.min";
export default {
  name: "UserProfile",
  components: { Loader },
  data() {
    return {
      loading: false,
      userUpdated: {},
      programingLanguages: ""
    };
  },
  async mounted() {
    this.programingLanguages = await this.$store.dispatch("fetchCategories");
    M.updateTextFields();
    M.Datepicker.init(document.querySelectorAll(".datepicker"), {
      format: "dd.mm.yyyy"
    });
    M.FormSelect.init(document.querySelectorAll("select"));
    this.userUpdated = this.$store.getters.user;
    this.loading = true;
  },
  updated() {
    M.updateTextFields();
    M.Datepicker.init(document.querySelectorAll(".datepicker"), {
      format: "dd.mm.yyyy"
    });
    M.FormSelect.init(document.querySelectorAll("select"));
  },
  methods: {
    async editingSave() {
      try {
        console.log(this.userUpdated);
        await this.$store.dispatch("updateUserInfo", this.userUpdated);
      } catch (e) {
        console.log("Failed to call updateUserInfo");
      }
    }
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3'
  @media screen and (max-width: 1150px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec3 sec3 sec3' 'sec2 sec2 sec2 sec2 sec2 sec2'
    grid-template-rows: 72px 1fr 1fr
  @media screen and (max-width: 740px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2' 'sec3 sec3 sec3 sec3 sec3 sec3'

.center
  min-height: 54px !important
</style>
