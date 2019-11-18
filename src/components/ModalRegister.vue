<template>
  <div id="modalRegistration" class="modal">
    <div class="modal-content">
      <form>
        <h4 class="center">Регистрация</h4>
        <div class="row">
          <div class="input-field col s6">
            <input id="first_name" type="text" class="validate" />
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate" />
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="password_registr" type="password" class="validate" />
            <label for="password_registr">Password</label>
          </div>
          <div class="input-field col s6">
            <input id="passwordRepeat" type="password" class="validate" />
            <label for="passwordRepeat">Repeat Password</label>
          </div>
          <div class="input-field col s12">
            <input id="email_registr" type="email" class="validate" />
            <label for="email_registr">Email</label>
          </div>
          <div class="col s12">
            <p>
              <label>
                <input type="checkbox" class="filled-in" checked="checked" />
                <span
                  >Для регистрации вы должны согласиться с
                  <a href="">Правилами использования</a>.</span
                >
              </label>
            </p>
          </div>
          <button class="btn modal-close f col s12">
            Зарегестрироваться<i class="material-icons right">send</i>
          </button>
          <button class="btn modal-close col s12">
            Закрыть<i class="material-icons right">cancel</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalRegister"
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
