<template>
  <div>
    <div v-if="this.$store.state.user.profile">
      <ul class="right">
        <li>
          <a class="dropdown-trigger" href="#" data-target="dropdown1"
            >Здраствуйте Сергей<i class="material-icons right"
              >arrow_drop_down</i
            ></a
          >
        </li>
      </ul>
      <ul id="dropdown1" class="dropdown-content">
        <li>
          <router-link
            :to="{
              name: 'profile',
              params: { user: this.$store.state.user.profile }
            }"
            >Профиль
            <img class="right ico" src="../assets/icons/user.png" alt=""
          /></router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link
            :to="{
              name: 'my-friends',
              params: { user: this.$store.state.user.profile }
            }"
            >Котакты
            <img class="right ico" src="../assets/icons/showFriends.png" alt=""
          /></router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link
            :to="{
              name: 'my-articles',
              params: { user: this.$store.state.user.profile }
            }"
            >Статьи
            <img class="right ico" src="../assets/icons/showArticles.png" alt=""
          /></router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link
            :to="{
              name: 'my-github',
              params: { user: this.$store.state.user.profile }
            }"
            >GitHub
            <img class="right ico" src="../assets/icons/showGitHub.png" alt=""
          /></router-link>
        </li>
        <li v-if="this.$store.state.user.isAdmin" class="divider"></li>
        <li v-if="this.$store.state.user.isAdmin">
          <router-link
            :to="{
              name: 'admin',
              params: { user: this.$store.state.user.profile }
            }"
            >Админка
            <img class="right ico" src="../assets/icons/adminBase.png" alt=""
          /></router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link to="/"
            >Выйти
            <img class="right ico" src="../assets/icons/logout.png" alt=""
          /></router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="right">
        <li>
          <a class="dropdown-trigger" href="#" data-target="dropdown1"
            >Войдите в систему<i class="material-icons right"
              >arrow_drop_down</i
            ></a
          >
        </li>
      </ul>
      <ul id="dropdown1" class="dropdown-content">
        <li>
          <a data-target="modalLogin" class="modal-trigger">
            Вход
            <img class="right ico" src="../assets/icons/login.png" alt="" />
          </a>
        </li>
        <li class="divider"></li>
        <li>
          <a data-target="modalRegistration" class="modal-trigger">
            Регистрация
            <img
              class="right ico"
              src="../assets/icons/registration.png"
              alt=""
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavDropdown"
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
