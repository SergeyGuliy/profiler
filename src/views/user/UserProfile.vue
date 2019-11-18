<template>
  <div>
    <h1 class="center">User {{ this.$route.params.user }}</h1>
    <h1 class="center">User {{ this.$store.state.user }}</h1>
    <h1 class="center">User {{ isCurrectUser }}</h1>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  computed: {
    isCurrectUser() {
      return this.$route.params.user == this.$store.state.user;
    }
  }
};
</script>

<style scoped></style>
