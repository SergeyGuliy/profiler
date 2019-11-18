<template>
  <div class="nav-wrapper">
    <a href="#" data-target="mobile-demo" class="sidenav-trigger"
      ><i class="material-icons">menu</i></a
    >
    <ul class="left">
      <li>
        <router-link to="/" class="brand-logo left show-on-medium-and-up"
          >Profiler</router-link
        >
      </li>
    </ul>
    <ul id="nav-mobile" class="left hide-on-med-and-down">
      <li>
        <router-link to="/sergey">Пользователи</router-link>
      </li>
      <li><router-link to="badges.html">Статьи</router-link></li>
      <li><router-link to="collapsible.html">GitHub</router-link></li>
    </ul>
    <div v-if="userLoggedIn">
      <ul class="right">
        <li>
          <a class="dropdown-trigger" href="#!" data-target="dropdown1"
            >Здраствуйте Сергей<i class="material-icons right"
              >arrow_drop_down</i
            ></a
          >
        </li>
      </ul>
      <ul id="dropdown1" class="dropdown-content">
        <li>
          <a
            >Профиль
            <img class="right ico" src="../assets/icons/user.png" alt=""
          /></a>
        </li>
        <li class="divider"></li>
        <li>
          <a
            >Котакты
            <img class="right ico" src="../assets/icons/showFriends.png" alt=""
          /></a>
        </li>
        <li class="divider"></li>
        <li>
          <a
            >Статьи
            <img class="right ico" src="../assets/icons/showArticles.png" alt=""
          /></a>
        </li>
        <li class="divider"></li>
        <li>
          <a
            >GitHub
            <img class="right ico" src="../assets/icons/showGitHub.png" alt=""
          /></a>
        </li>
        <li v-if="userIsAdmin" class="divider"></li>
        <li v-if="userIsAdmin">
          <a
            >Админка
            <img class="right ico" src="../assets/icons/adminBase.png" alt=""
          /></a>
        </li>
        <li class="divider"></li>
        <li class="divider"></li>
        <li>
          <a
            >Выйти
            <img class="right ico" src="../assets/icons/logout.png" alt=""
          /></a>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="right">
        <li>
          <a class="dropdown-trigger" href="#!" data-target="dropdown1"
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
  name: "Navbar",
  data() {
    return {
      userLoggedIn: true,
      userIsAdmin: true
    };
  },
  mounted() {}
};
</script>

<style scoped lang="sass">
.brand-logo
  position: static !important
img.right
  width: 22px
li > a
  padding: 0 10px
a.dropdown-trigger
  padding:  0 5px
i.right
  margin: 0 3px 0 1px !important
.nav-content div
  margin-left: 10pxlogin
</style>
