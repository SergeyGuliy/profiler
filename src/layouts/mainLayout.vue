<template>
  <div class="main-layout">
    <header>
      <nav class="nav-extended">
        <Navbar />
      </nav>
    </header>
    <main>
      <article>
        <router-view />
      </article>
    </main>
    <Sidebar />
    <ModalLogin />
    <ModalRegister />
    <ModalBecomeAdmin />
  </div>
</template>

<script>
import ModalBecomeAdmin from "../components/ModalBecomeAdmin";
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
    ModalLogin,
    ModalBecomeAdmin
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
header
  position: fixed
  width: 100%
  top: 0
  z-index: 11
</style>
