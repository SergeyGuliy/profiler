<template>
  <div>
    <p class="center" v-if="loading">{{ this.$route.params.article }}</p>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../../components/Loader";
export default {
  name: "Article",
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
