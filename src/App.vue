<template>
  <div id="app">
    <component :is="layout" v-bind:userInfo="userLoggedIn">
      <router-view />
    </component>
  </div>
</template>

<script>
import emptyLayout from "./layouts/emptyLayout";
import mainLayout from "./layouts/mainLayout";
export default {
  name: "App",
  data() {
    return {
      userLoggedIn: "sergey"
    };
  },
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
.main-layout
  width: 100vw
h1
  margin: 0
  padding: 0
img.ico
  width: 22px
</style>
