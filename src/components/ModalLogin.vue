<template>
  <div id="modalLogin" class="modal">
    <div class="modal-content">
      <form v-on:submit.prevent="submitLogin">
        <h4 class="center">Вход в систему</h4>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              v-model="email"
              v-bind:class="{
                invalid: !$v.email.required || !$v.email.email
              }"
            />
            <label for="email">Email</label>
            <small class="helper-text invalid" v-if="!$v.email.required"
              >Поле Email недолжно быть пустым</small
            >
            <small class="helper-text invalid" v-else-if="!$v.email.email"
              >Введите коректный Email</small
            >
          </div>
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              class="validate"
              v-model="password"
              v-bind:class="{
                invalid:
                  !$v.password.required ||
                  !$v.password.minLength ||
                  !$v.password.maxLength
              }"
            />
            <label for="password">Password</label>
            <small class="helper-text invalid" v-if="!$v.password.required"
              >Введите пароль</small
            >
            <small
              class="helper-text invalid"
              v-else-if="!$v.password.minLength"
              >Пародь должен иметь 8 знаков и более</small
            >
            <small
              class="helper-text invalid"
              v-else-if="!$v.password.maxLength"
              >Пароль не может быть длинее 12 знаков</small
            >
          </div>
          <button
            class="btn modal-close f col s12"
            v-bind:class="{
              disabled:
                !$v.email.required ||
                !$v.email.email ||
                !$v.password.required ||
                !$v.password.minLength ||
                !$v.password.maxLength
            }"
          >
            Войти<i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  email,
  required,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
export default {
  name: "ModalLogin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: { email, required },
    password: { minLength: minLength(8), maxLength: maxLength(12), required }
  },
  methods: {
    async submitLogin() {
      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("logIn", formData);
        this.$messageSuccess("Вы удачно вошли в систему.");
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="sass">
.modal
  max-height: 602px
  max-width: 700px

button
  width: 100%

button.f
  margin-bottom: 15px
</style>
