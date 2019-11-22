<template>
  <div>
    <h1 v-if="loading">This is an home page</h1>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../components/Loader";
export default {
  name: "home",
  components: { Loader },
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    this.loading = true;
  }
};
</script>
