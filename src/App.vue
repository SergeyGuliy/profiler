<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import emptyLayout from "./layouts/emptyLayout";
import mainLayout from "./layouts/mainLayout";
export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout;
    }
  },
  components: {
    emptyLayout,
    mainLayout
  }
};
</script>

<style lang="sass">
@import "../node_modules/materialize-css/dist/css/materialize.min.css"
@import "https://fonts.googleapis.com/icon?family=Material+Icons"
@import "assets/index"
.main-layout
  width: 100vw
h1
  margin: 0
  padding: 0
img.ico
  width: 22px
</style>
