<template>
  <div class="grid" v-if="isCurrectUser">
    <div class="header">
      <span class="badge">Профиль</span>
      <div v-if="!editEnabled">
        <button class="btn" v-if="this.$store.state.user.skills">
          Навыки<img
            class="right ico"
            src="../../assets/icons/skills.png"
            alt=""
          />
        </button>
        <button class="btn" v-if="this.$store.state.user.isAdmin">
          Стать админом<img
            class="right ico"
            src="../../assets/icons/adminBase.png"
            alt=""
          />
        </button>
        <button class="btn" v-on:click="editingStart">
          Редактировать<img
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
      <div class="row">
        <div class="input-field col s12">
          <input
            id="first_name_change"
            type="text"
            class="validate"
            v-model="first_name"
            v-bind:disabled="!editEnabled"
          />
          <label for="first_name_change">Имя</label>
        </div>
        <div class="input-field col s12">
          <input
            id="last_name_change"
            type="text"
            class="validate"
            v-model="second_name"
            v-bind:disabled="!editEnabled"
          />
          <label for="last_name_change">Фамилия</label>
        </div>
        <div class="input-field col s12">
          <input
            id="datepicker"
            type="text"
            class="datepicker"
            v-model="dateOfBirth"
            v-bind:disabled="!editEnabled"
          />
          <label for="datepicker">Дата рождения</label>
        </div>
        <div class="input-field col s12">
          <input
            id="location"
            type="text"
            class="validate"
            v-model="location"
            v-bind:disabled="!editEnabled"
          />
          <label for="location">Локация</label>
        </div>
        <div class="input-field col s12">
          <textarea
            id="about"
            class="materialize-textarea"
            v-model="about"
            v-bind:disabled="!editEnabled"
          ></textarea>
          <label for="about">Раскажите о себе</label>
        </div>
      </div>
    </div>
    <div class="section-2">
      <div class="row">
        <div class="input-field col s12">
          <select v-bind:disabled="!editEnabled">
            <option value="" selected></option>
            <option value="1">Офисный Работник</option>
            <option value="2">Фрилансер</option>
            <option value="3">Безработный</option>
          </select>
          <label>Тип работы</label>
        </div>
        <div class="input-field col s12">
          <select multiple v-bind:disabled="!editEnabled">
            <option value="1">Разработчий</option>
            <option value="2">Сис. Админ</option>
            <option value="3">Тестировщик</option>
            <option value="1">Бизнес аналитик</option>
            <option value="2">HR</option>
          </select>
          <label>Занятость</label>
        </div>
        <div class="input-field col s12">
          <select multiple v-bind:disabled="!editEnabled">
            <option value="1">Разработчий</option>
            <option value="2">Системный администратор</option>
            <option value="3">Тестировщик</option>
            <option value="1">Бизнес аналитик</option>
            <option value="2">HR</option>
          </select>
          <label>Должность</label>
        </div>
        <div class="input-field col s12">
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
        <div class="input-field col s12">
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
    </div>
    <div class="section-3">
      <div class="row">
        <div class="input-field col s12">
          <input
            id="tel"
            type="number"
            class="validate"
            placeholder="+XXX-XX-XXX-XX-XX"
            v-bind:disabled="!editEnabled"
          />
          <label for="tel">Ваш телефон</label>
        </div>
        <div class="input-field col s12">
          <input
            id="site"
            type="url"
            class="validate"
            placeholder="https://www.example.com"
            v-bind:disabled="!editEnabled"
          />
          <label for="site">Ваш сайт визитка</label>
        </div>
        <div class="input-field col s12">
          <input
            id="linkedin"
            type="url"
            class="validate"
            placeholder="https://www.linkedin.com/in/user"
            v-bind:disabled="!editEnabled"
          />
          <label for="linkedin">Linked In</label>
        </div>
        <div class="input-field col s12">
          <input
            id="facebook"
            type="url"
            class="validate"
            placeholder="https://www.facebook.com/user"
            v-bind:disabled="!editEnabled"
          />
          <label for="facebook">Facebook</label>
        </div>
        <div class="input-field col s12">
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
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min";
export default {
  name: "UserProfile",
  data() {
    return {
      first_name: "Сергей",
      second_name: "Гулий",
      dateOfBirth: "11.12.2012",
      location: "Uzhorod",
      about: "Меня зовут сергей",
      editEnabled: false
    };
  },
  computed: {
    isCurrectUser() {
      return this.$route.params.user === this.$store.state.user.profile;
    }
  },
  mounted() {
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
  margin-top: 25px !important
  min-height: 100% !important
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
  grid-template-rows: 72px 1fr 1fr 1fr
  grid-column-gap: 15px
  grid-row-gap: 15px
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3'
  @media screen and (max-width: 900px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec3 sec3 sec3' 'sec2 sec2 sec2 sec2 sec2 sec2'
    grid-template-rows: 72px 1fr 1fr
  @media screen and (max-width: 600px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2' 'sec3 sec3 sec3 sec3 sec3 sec3'
  span
    margin: 0
    padding: 0

.header
  grid-area: head
  padding: 5px 15px
  border: 3px solid #e3e3e3
  border-radius: 5px
  display: flex
  justify-content: space-between
  align-items: center
.section-1
  grid-area: sec1
  padding: 15px
  border: 3px solid #e3e3e3
  border-radius: 5px
.section-2
  grid-area: sec2
  padding: 15px
  border: 3px solid #e3e3e3
  border-radius: 5px
.section-3
  grid-area: sec3
  padding: 15px
  border: 3px solid #e3e3e3
  border-radius: 5px
.col
  margin: 20px 0
.btn
  margin-left: 5px
  @media screen and (max-width: 800px)
    font-size: 10px
    height: 30px
    line-height: 30px
    padding: 0 5px
img.right
  margin: 7px 0 7px 10px !important
  height: 22px
  @media screen and (max-width: 800px)
    display: none
</style>
