<template>
  <div>
    <div v-if="this.$store.getters.isLoggedIn">
      <ul class="right">
        <li>
          <a class="dropdown-trigger" href="#" data-target="dropdown1"
            >Здраствуйте {{ $store.getters.user.profile
            }}<i class="material-icons right">arrow_drop_down</i></a
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
      this.$store.commit("userLogOut");
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
i.right
  margin: 0 !important
.nav-content div
  margin-left: 10px
.dropdown-trigger
  padding:  0 5px !important
</style>
