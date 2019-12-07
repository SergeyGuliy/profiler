<template>
  <div class="main-layout">
    <header>
      <nav class="nav-extended">
        <Navbar />
      </nav>
    </header>
    <main>
      <article class="container">
        <router-view />
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
export default {
  name: "mainLayout",
  components: {
    Navbar,
    Sidebar,
    ModalRegister,
    ModalLogin
  },
  async mounted() {
    M.updateTextFields();
    M.Modal.init(document.querySelectorAll(".modal"));
    M.Sidenav.init(document.querySelectorAll(".sidenav"), {
      inDuration: 50,
      outDuration: 50
    });
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"), {
      constrainWidth: true,
      coverTrigger: false
    });
  },
  async updated() {
    M.updateTextFields();
    M.Modal.init(document.querySelectorAll(".modal"));
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
.main-layout
  width: 100%
main
  margin-top: 67px !important
  width: 100%
header
  position: fixed
  width: 100%
  top: 0
  z-index: 11
.container
  max-width: 2000px !important
  min-height: calc(100vh - 67px)
  padding: 5px 0
  @media screen and (min-width: 601px)
    width: 85% !important
  @media screen and (min-width: 993px)
    width: 90% !important
.sidenav-overlay
  left: 300px !important
  transition: 50ms ease all
</style>
