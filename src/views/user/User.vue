<template>
  <div>
    <router-view v-if="isCurrectUser"></router-view>
    <Error v-else />
  </div>
</template>

<script>
import Error from "../../components/Error";
export default {
  name: "User",
  components: { Error },
  computed: {
    isCurrectUser() {
      return this.$route.params.user === this.$store.state.user.profile;
    }
  }
};
</script>

<style scoped lang="sass"></style>
