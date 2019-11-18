<template>
  <ul class="sidenav" id="mobile-demo">
    <li><a class="subheader">Profiler</a></li>
    <li><router-link to="/" class="brand-logo">На главную</router-link></li>
    <li><a href="https://materializecss.com/navbar.html">Пользователи</a></li>
    <li><a href="badges.html">Статьи</a></li>
    <li><a href="collapsible.html">GitHub</a></li>
    <li><div class="divider"></div></li>
  </ul>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped lang="sass">
.subheader
  padding: 0 42px 0 22px
</style>
