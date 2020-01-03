<template>
  <div id="modalRegistration" class="modal">
    <div class="modal-content">
      <form v-on:submit.prevent="submitRegisteration">
        <h4 class="center">Регистрация</h4>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="email_registr"
              type="email"
              v-model="email"
              v-bind:class="{
                invalid: !$v.email.required || !$v.email.email
              }"
            />
            <label for="email_registr">Email</label>
            <small class="helper-text invalid" v-if="!$v.email.required"
              >Поле Email недолжно быть пустым</small
            >
            <small class="helper-text invalid" v-else-if="!$v.email.email"
              >Введите коректный Email</small
            >
          </div>
          <div class="input-field col s12">
            <input
              id="password_registr"
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
            <label for="password_registr">Password</label>
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
          <div class="input-field col s12">
            <input
              id="passwordRepeat"
              type="password"
              class="validate"
              v-model="passwordRepeat"
              v-bind:class="{
                invalid:
                  !this.$v.password.required ||
                  !this.$v.passwordRepeat.samePassword
              }"
            />
            <label for="passwordRepeat">Repeat Password</label>
            <small class="helper-text invalid" v-if="!$v.password.required"
              >Повторите пароль</small
            >
            <small
              class="helper-text invalid"
              v-else-if="!$v.passwordRepeat.samePassword"
              >Пароли должны быть идентичны</small
            >
          </div>
          <div class="col s12">
            <p>
              <label>
                <input
                  type="checkbox"
                  class="filled-in"
                  checked="checked"
                  v-model="agreement"
                />
                <span
                  >Для регистрации вы должны согласиться с
                  <a href="">Правилами использования</a>.</span
                >
              </label>
            </p>
          </div>
          <button
            class="btn modal-close f col s12"
            type="submit"
            v-bind:class="{
              disabled:
                !agreement ||
                !this.$v.password.required ||
                !this.$v.passwordRepeat.samePassword ||
                !$v.password.required ||
                !$v.password.minLength ||
                !$v.password.maxLength ||
                !$v.email.required ||
                !$v.email.email
            }"
          >
            Зарегестрироваться<i class="material-icons right">send</i>
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
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
export default {
  name: "ModalRegister",
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      agreement: false
    };
  },
  validations: {
    email: { email, required },
    password: { minLength: minLength(8), maxLength: maxLength(12), required },
    passwordRepeat: { samePassword: sameAs("password") }
  },
  methods: {
    async submitRegisteration() {
      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("createNewUser", formData);
        this.$messageSuccess("Вы удачно зарегистрировались в системе.");
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
