import Vue from "vue";
import Vuex from "vuex";
import authData from "./authData";
import loggedInUser from "./loggedInUser";
import counters from "./misc/counters";
import articles from "./art_cat_usr/articles";
import repositories from "./art_cat_usr/repositories";
import users from "./art_cat_usr/users";
import admin from "./misc/categories";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, userInfo) {
      state.user = userInfo;
    },
    becomeAdmin(state) {
      state.user.isAdmin = true;
    },
    deleteUser(state) {
      state.user = {
        lists: {
          friends: [],
          articles: [],
          repositories: []
        }
      };
    },
    pushArticle(state, article) {
      let newState = state.user.lists.articles;
      newState.push(article);
      state.user.lists.articles = newState;
    },
    pushRepository(state, repository) {
      let newState = state.user.lists.repositories;
      newState.push(repository);
      state.user.lists.repositories = newState;
    },
    pushFriend(state, user) {
      let newState = state.user.lists.friends;
      newState.push(user);
      state.user.lists.friends = newState;
    },
    deleteFriend(state, user) {
      let newState = state.user.lists.friends;
      let idDToDelete = newState.findIndex(item => item === user);
      newState.splice(idDToDelete, 1);
      state.user.lists.friends = newState;
    },
    deleteMyArticle(state, article) {
      let newState = state.user.lists.articles;
      let idDToDelete = newState.findIndex(item => item === article);
      newState.splice(idDToDelete, 1);
      state.user.lists.articles = newState;
    },
    deleteMyRepository(state, repository) {
      let newState = state.user.lists.repositories;
      let idDToDelete = newState.findIndex(item => item === repository);
      newState.splice(idDToDelete, 1);
      state.user.lists.repositories = newState;
    }
  },
  getters: {
    user: s => s.user,
    isLoggedIn: s => s.isLoggedIn
  },
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
