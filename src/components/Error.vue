<template>
  <div class="flex">
    <img src="../assets/icons/error.png" alt="" />
    <p v-if="message">{{ message }}</p>
    <p v-else>Error</p>
    <router-link to="/" class="btn"
      >На главную <img src="../assets/icons/home.png" alt=""
    /></router-link>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["message"]
};
</script>

<style scoped lang="sass">
.flex
  margin-top: 100px
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  p
    font-weight: bold
    font-size: 30px
    text-transform: uppercase
    letter-spacing: 4px
    margin: 15px
  .btn
    display: flex
    justify-content: center
    align-items: center
    img
      height: 22px
      margin-left: 10px
</style>
