<template>
  <div>
    <p class="center" v-if="loading">{{ this.$route.params.user }}</p>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../../components/Loader";
export default {
  name: "User",
  components: { Loader },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.loading = true;
  }
};
</script>

<style scoped></style>
