<template>
  <div class="main-layout">
    <header>
      <nav class="nav-extended">
        <Navbar />
        <BreadCrumbs v-if="this.$route.meta.havePagination" />
      </nav>
    </header>
    <main
      v-bind:class="{ 'main-bread-crumbs': this.$route.meta.havePagination }"
    >
      <article
        class="container"
        v-bind:class="{
          'container-bread-crumbs': this.$route.meta.havePagination
        }"
      >
        <router-view></router-view>
      </article>
    </main>
    <Sidebar />
    <ModalLogin />
    <ModalRegister />
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ModalLogin from "../components/ModalLogin";
import ModalRegister from "../components/ModalRegister";
import BreadCrumbs from "../components/BreadCrumbs";
export default {
  name: "mainLayout",
  components: {
    Navbar,
    Sidebar,
    ModalRegister,
    ModalLogin,
    BreadCrumbs
  },
  mounted() {
    M.Modal.init(document.querySelectorAll("#modalLogin"));
    M.Modal.init(document.querySelectorAll("#modalRegistration"));
    M.Sidenav.init(document.querySelectorAll(".sidenav"), {
      inDuration: 50,
      outDuration: 50
    });
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"), {
      constrainWidth: true,
      coverTrigger: false
    });
  }
};
</script>

<style scoped lang="sass">
.main-bread-crumbs
  margin-top: 95px !important
main
  margin-top: 67px !important
header
  position: fixed
  width: 100%
  top: 0px
.container
  background-color: orange
  max-width: 2000px !important
  min-height: calc(100vh - 67px)
  @media screen and (min-width: 601px)
    width: 85% !important
  @media screen and (min-width: 993px)
    width: 85% !important
.container-bread-crumbs
  min-height: calc(100vh - 95px) !important
.sidenav-overlay
  left: 300px !important
  transition: 50ms ease all
</style>
