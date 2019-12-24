import Vue from "vue";
import Vuex from "vuex";
import authData from "./authData";
import loggedInUser from "./loggedInUser";
import counters from "./counters";
import articles from "./articles";
import repositories from "./repositories";
import users from "./users";
import admin from "./admin";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    authData,
    loggedInUser,
    counters,
    articles,
    repositories,
    admin
  }
});
