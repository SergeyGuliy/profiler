<template>
  <div>
    <div v-if="this.$store.state.userLoggedIn">
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
          <router-link to="/ssee"
            >Профиль
            <img class="right ico" src="../assets/icons/user.png" alt=""
          /></router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link to="/see/friends"
            >Котакты
            <img class="right ico" src="../assets/icons/showFriends.png" alt=""
          /></router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link to="/see/articles"
            >Статьи
            <img class="right ico" src="../assets/icons/showArticles.png" alt=""
          /></router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link to="/see/github"
            >GitHub
            <img class="right ico" src="../assets/icons/showGitHub.png" alt=""
          /></router-link>
        </li>
        <li v-if="this.$store.state.userIsAdmin" class="divider"></li>
        <li v-if="this.$store.state.userIsAdmin">
          <router-link to="/admin" exact
            >Админка
            <img class="right ico" src="../assets/icons/adminBase.png" alt=""
          /></router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link to=""
            >Выйти
            <img class="right ico" src="../assets/icons/logout.png" alt=""
          /></router-link>
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
  name: "NavDropdown"
};
</script>

<style scoped></style>
