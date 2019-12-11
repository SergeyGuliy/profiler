import Vue from "vue";
import Vuex from "vuex";
import authData from "./authData";
import loggedInUser from "./loggedInUser";
import counters from "./counters";
import articles from "./articles";
import repositories from "./repositories";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authData,
    loggedInUser,
    counters,
    articles,
    repositories
  }
});
