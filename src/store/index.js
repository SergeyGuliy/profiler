import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isAdmin: true,
      profile: "sergey",
      first_name: "Сергей",
      second_name: "Гулий",
      dateOfBirth: "11.12.2012",
      location: "",
      about: "Меня зовут сергей",
      skills: {}
    }
  }
});
