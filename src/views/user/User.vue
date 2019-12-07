<template>
  <div>
    <router-view
      v-if="this.$route.params.user === this.$store.getters.user.profile"
    />
    <Error
      v-else-if="
        !(this.$route.params.user === this.$store.getters.user.profile)
      "
    />
  </div>
</template>

<script>
import Error from "../../components/Error";
export default {
  name: "User",
  components: { Error }
};
</script>

<style scoped lang="sass"></style>
