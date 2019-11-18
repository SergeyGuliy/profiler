<template>
  <div id="modalLogin" class="modal">
    <div class="modal-content">
      <form>
        <h4 class="center">Вход в систему</h4>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" />
            <label for="email">Email</label>
          </div>
          <div class="input-field col s12">
            <input id="password" type="password" class="validate" />
            <label for="password">Password</label>
          </div>
          <button class="btn modal-close f col s12">
            Войти<i class="material-icons right">send</i>
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
  name: "ModalLogin"
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
