<template>
  <div id="modalBecomeAdmin" class="modal">
    <div class="modal-content">
      <form>
        <h5 class="center">Хотите стать Администратором?</h5>
        <div class="row">
          <div class="input-field col s12">
            <ul class="collection with-header">
              <li class="collection-header">
                <h6>Вы получите возможность:</h6>
              </li>
              <li class="collection-item">
                Редактировать список Языков програмирпования и технологий
              </li>
            </ul>
          </div>
          <button
            class="btn modal-close f col s12"
            v-on:click.prevent="becomeAdmin"
          >
            Согласиться<i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalBecomeAdmin",
  methods: {
    async becomeAdmin() {
      this.$messageSuccess(`Вы стали администратором`);
      await this.$store.dispatch("becomeAdmin");
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
