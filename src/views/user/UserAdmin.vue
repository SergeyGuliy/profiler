<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Админкаrepositories</span>
        <div v-if="!editEnabled">
          <router-link class="btn" append to="skills">
            Навыки<img
              class="right ico"
              src="../../assets/icons/skills.png"
              alt=""
            />
          </router-link>
          <button class="btn">
            Админ<img
              class="right ico"
              src="../../assets/icons/adminBase.png"
              alt=""
            />
          </button>
          <button class="btn" v-on:click="editingStart">
            Изменить<img
              class="right ico"
              src="../../assets/icons/userEdit.png"
              alt=""
            />
          </button>
        </div>
        <div v-else>
          <button class="btn" v-on:click="editingSave">
            Сохранить<img
              class="right ico"
              src="../../assets/icons/save.png"
              alt=""
            />
          </button>
          <button class="btn" v-on:click="editingUnsave">
            Отменить<img
              class="right ico"
              src="../../assets/icons/unsave.png"
              alt=""
            />
          </button>
        </div>
      </div>
      <div class="section-1">
        <div class="input-field center">
          <input
            id="first_name_change"
            type="text"
            class="validate"
            v-bind:disabled="!editEnabled"
          />
          <label for="first_name_change">Имя</label>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../components/Loader";
export default {
  name: "UserAdmin",
  components: { Loader },
  data() {
    return {
      editEnabled: false,
      loading: false
    };
  },
  methods: {
    editingStart() {
      this.editEnabled = true;
    },
    editingSave() {
      this.editEnabled = false;
    },
    editingUnsave() {
      this.editEnabled = false;
    }
  },
  mounted() {
    this.loading = true;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3'
  @media screen and (max-width: 900px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec3 sec3 sec3' 'sec2 sec2 sec2 sec2 sec2 sec2'
    grid-template-rows: 72px 1fr 1fr
  @media screen and (max-width: 600px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2' 'sec3 sec3 sec3 sec3 sec3 sec3'

.center
  min-height: 51px !important
</style>
