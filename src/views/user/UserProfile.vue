<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Профиль</span>
        <div v-if="!editEnabled">
          <button class="btn" v-if="this.$store.state.user.isAdmin">
            Стать Админом<img
              class="right ico"
              src="../../assets/icons/adminBase.png"
              alt=""
            />
          </button>
          <button class="btn" v-on:click="editingStart">
            Изменить<img
              class="right ico"
              src="../../assets/icons/userEdit.png"
              alt=""
            />
          </button>
        </div>
        <div v-else>
          <button class="btn" v-on:click="editingSave">
            Сохранить<img
              class="right ico"
              src="../../assets/icons/save.png"
              alt=""
            />
          </button>
          <button class="btn" v-on:click="editingUnsave">
            Отменить<img
              class="right ico"
              src="../../assets/icons/unsave.png"
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
            v-model="first_name"
            v-bind:disabled="!editEnabled"
          />
          <label for="first_name_change">Имя</label>
        </div>
        <div class="input-field center">
          <input
            id="last_name_change"
            type="text"
            class="validate"
            v-model="second_name"
            v-bind:disabled="!editEnabled"
          />
          <label for="last_name_change">Фамилия</label>
        </div>
        <div class="input-field center">
          <input
            id="datepicker"
            type="text"
            class="datepicker"
            v-model="dateOfBirth"
            v-bind:disabled="!editEnabled"
          />
          <label for="datepicker">Дата рождения</label>
        </div>
        <div class="input-field center">
          <input
            id="location"
            type="text"
            class="validate"
            v-model="location"
            v-bind:disabled="!editEnabled"
          />
          <label for="location">Локация</label>
        </div>
        <div class="input-field center">
          <textarea
            id="about"
            class="materialize-textarea"
            v-model="about"
            v-bind:disabled="!editEnabled"
          ></textarea>
          <label for="about">Раскажите о себе</label>
        </div>
      </div>
      <div class="section-2">
        <div class="input-field center">
          <select v-bind:disabled="!editEnabled">
            <option value="" selected></option>
            <option value="1">Полная занятость</option>
            <option value="2">Частичная занятость</option>
            <option value="3">Безработный</option>
          </select>
          <label>Занятость</label>
        </div>
        <div class="input-field center">
          <select v-bind:disabled="!editEnabled">
            <option value="" selected></option>
            <option value="1">Офисный Работник</option>
            <option value="2">Фрилансер</option>
          </select>
          <label>Тип работы</label>
        </div>
        <div class="input-field center">
          <select multiple v-bind:disabled="!editEnabled">
            <option value="1">Разработчий</option>
            <option value="2">Системный администратор</option>
            <option value="3">Тестировщик</option>
            <option value="1">Бизнес аналитик</option>
            <option value="2">HR</option>
          </select>
          <label>Должность</label>
        </div>
        <div class="input-field center">
          <select multiple v-bind:disabled="!editEnabled">
            <option value="1">HTML+CSS</option>
            <option value="1">JavaScript</option>
            <option value="1">Java</option>
            <option value="3">C</option>
            <option value="3">C++</option>
            <option value="">C#</option>
            <option value="2">Python</option>
            <option value="3">Ruby</option>
            <option value="3">Kotlin</option>
            <option value="2">Go</option>
            <option value="3">SQL</option>
            <option value="">Assembly</option>
            <option value="1">Java</option>
            <option value="2">Go</option>
            <option value="3">Ruby</option>
          </select>
          <label>Языки програмирования</label>
        </div>
        <div class="input-field center">
          <select multiple v-bind:disabled="!editEnabled">
            <optgroup label="JavaScript">
              <option value="1">Angular</option>
              <option value="2">React</option>
              <option value="2">Vue.js</option>
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
            v-bind:disabled="!editEnabled"
          />
          <label for="tel">Ваш телефон</label>
        </div>
        <div class="input-field center">
          <input
            id="site"
            type="url"
            class="validate"
            placeholder="https://www.example.com"
            v-bind:disabled="!editEnabled"
          />
          <label for="site">Ваш сайт визитка</label>
        </div>
        <div class="input-field center">
          <input
            id="linkedin"
            type="url"
            class="validate"
            placeholder="https://www.linkedin.com/in/user"
            v-bind:disabled="!editEnabled"
          />
          <label for="linkedin">Linked In</label>
        </div>
        <div class="input-field center">
          <input
            id="facebook"
            type="url"
            class="validate"
            placeholder="https://www.facebook.com/user"
            v-bind:disabled="!editEnabled"
          />
          <label for="facebook">Facebook</label>
        </div>
        <div class="input-field center">
          <input
            id="email"
            type="url"
            class="validate"
            placeholder="user@example.com"
            v-bind:disabled="!editEnabled"
          />
          <label for="email">E-mail</label>
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
      first_name: "Сергей",
      second_name: "Гулий",
      dateOfBirth: "11.12.2012",
      location: "Uzhorod",
      about: "Меня зовут сергей",
      editEnabled: false
    };
  },
  mounted() {
    this.loading = true;
    M.updateTextFields();
    M.Datepicker.init(document.querySelectorAll(".datepicker"), {
      format: "dd.mm.yyyy"
    });
    M.FormSelect.init(document.querySelectorAll("select"));
  },
  updated() {
    M.FormSelect.init(document.querySelectorAll("select"));
  },
  methods: {
    editingStart() {
      this.editEnabled = true;
    },
    editingSave() {
      this.editEnabled = false;
    },
    editingUnsave() {
      this.editEnabled = false;
    }
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3'
  @media screen and (max-width: 900px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec3 sec3 sec3' 'sec2 sec2 sec2 sec2 sec2 sec2'
    grid-template-rows: 72px 1fr 1fr
  @media screen and (max-width: 600px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2' 'sec3 sec3 sec3 sec3 sec3 sec3'

.center
  min-height: 54px !important
</style>
