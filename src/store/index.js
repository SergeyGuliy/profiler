import Vue from "vue";
import Vuex from "vuex";
import authData from "./authData";
import loggedInUser from "./loggedInUser";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authData,
    loggedInUser
  }
});
