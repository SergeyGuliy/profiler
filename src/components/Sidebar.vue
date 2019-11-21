<template>
  <ul class="sidenav" id="mobile-demo">
    <li><a class="subheader">Profiler</a></li>
    <li>
      <router-link active-class="active" to="/users">Пользователи</router-link>
    </li>
    <li>
      <router-link active-class="active" to="/articles">Статьи</router-link>
    </li>
    <li>
      <router-link active-class="active" to="/repositories">GitHub</router-link>
    </li>
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
.active
  background-color: #F2F2F2
</style>
