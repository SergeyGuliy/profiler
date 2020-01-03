<template>
  <div>
    <div v-if="this.$store.getters.user.profile">
      <ul class="right">
        <li>
          <a class="dropdown-trigger" href="#" data-target="dropdown1">
            <div class="flex-nav">
              <span>Здраствуйте,</span>
              <span>{{ $store.getters.user.profile }}</span>
            </div>
            <i class="material-icons right">arrow_drop_down</i></a
          >
        </li>
      </ul>
      <ul id="dropdown1" class="dropdown-content">
        <li>
          <router-link
            :to="{
              name: 'profile',
              params: { user: $store.getters.user.profile }
            }"
            >Профиль
            <img class="right ico" src="../assets/icons/user.png" alt=""
          /></router-link>
        </li>
        <li class="divider" />
        <li>
          <router-link
            :to="{
              name: 'my-friends',
              params: { user: $store.getters.user.profile }
            }"
            >Котакты
            <img class="right ico" src="../assets/icons/showFriends.png" alt=""
          /></router-link>
        </li>
        <li class="divider" />
        <li>
          <router-link
            :to="{
              name: 'my-articles',
              params: { user: $store.getters.user.profile }
            }"
            >Статьи
            <img class="right ico" src="../assets/icons/showArticles.png" alt=""
          /></router-link>
        </li>
        <li class="divider" />
        <li>
          <router-link
            :to="{
              name: 'my-repositories',
              params: { user: $store.getters.user.profile }
            }"
            >Репозитории
            <img class="right ico" src="../assets/icons/showGitHub.png" alt=""
          /></router-link>
        </li>
        <li v-if="$store.getters.user.isAdmin" class="divider" />
        <li v-if="$store.getters.user.isAdmin">
          <router-link
            :to="{
              name: 'admin',
              params: { user: $store.getters.user.profile }
            }"
            >Админка
            <img class="right ico" src="../assets/icons/adminBase.png" alt=""
          /></router-link>
        </li>
        <li class="divider" />
        <li>
          <a v-on:click.prevent="logOut"
            >Выйти
            <img class="right ico" src="../assets/icons/logout.png" alt=""
          /></a>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="right">
        <li>
          <a class="dropdown-trigger" href="#" data-target="dropdown2"
            >Войдите в систему<i class="material-icons right"
              >arrow_drop_down</i
            ></a
          >
        </li>
      </ul>
      <ul id="dropdown2" class="dropdown-content">
        <li>
          <a href="#modalLogin" class="modal-trigger"
            >Вход <img class="right ico" src="../assets/icons/user.png" alt=""
          /></a>
        </li>
        <li class="divider" />
        <li>
          <a href="#modalRegistration" class="modal-trigger"
            >Регистрация
            <img class="right ico" src="../assets/icons/showFriends.png" alt=""
          /></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min";

export default {
  name: "NavDropdown",
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$messageError("Вы вышли из системы.");
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchUser");
    } catch (e) {
      console.log("e");
    }
  },
  updated() {
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"), {
      constrainWidth: true,
      coverTrigger: false
    });
  }
};
</script>

<style scoped lang="sass">

.dropdown-trigger
  padding:  0 5px !important


ul.dropdown-content li a
  padding: 14px 10px !important


ul.right li a.dropdown-trigger
  min-width: 150px
  display: flex
  justify-content: center
  align-items: center
  .flex-nav
    display: flex
    justify-content: start
    align-items: start
    flex-direction: row
    width: 100% -24px
    @media screen and (max-width: 400px)
      flex-direction: column
    span
      line-height: 16px
      margin: 0 3px
i.material-icons
  margin: 0 !important
  width: 20px
</style>
