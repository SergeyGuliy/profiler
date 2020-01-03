<template>
  <div class="flex">
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style scoped lang="sass">
.progress
  margin: 0 !important
.flex
  margin-top: 0
  display: flex
  justify-content: center
</style>
