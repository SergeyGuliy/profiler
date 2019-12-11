import defaultsDeep from "/mnt/d032024c-b3ba-4342-a367-51e8737d8935/IT/My_Projects/3_Vue.js/profiler/node_modules/lodash.defaultsdeep/index.js";
import firebase from "firebase/app";
export default {
  state: {
    user: {},
    isLoggedIn: false
  },
  mutations: {
    setUser(state, userInfo) {
      state.user = userInfo;
    },
    deleteUser(state) {
      state.user = {};
    },
    userLogIn(state) {
      state.isLoggedIn = true;
    },
    userLogOut(state) {
      state.isLoggedIn = false;
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
    }
  },
  getters: {
    user: s => s.user,
    isLoggedIn: s => s.isLoggedIn
  },
  actions: {
    async fetchUser({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const userInfo = (
          await firebase
            .database()
            .ref(`/users/${uid}/`)
            .once("value")
        ).val();
        const userBasic = {
          info: {
            first_name: "",
            second_name: "",
            dateOfBirth: "",
            location: "",
            about: ""
          },
          work: {
            tipe_of_work: "",
            is_working: "",
            position: [],
            languages: [],
            technologies: []
          },
          contacts: {
            phone: "",
            site: "",
            linkedIn: "",
            facebook: "",
            email: ""
          },
          lists: {
            friends: [],
            articles: [],
            repositories: []
          }
        };
        const user = defaultsDeep(userInfo, userBasic);
        commit("setUser", user);
        commit("userLogIn");
      } catch (e) {
        console.log("User is not Logged In");
      }
    },
    async updateUserInfo({ dispatch, commit, getters }, updateInfo) {
      try {
        commit("setUser", updateInfo);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/`)
          .update(getters.user);
      } catch (e) {
        console.log("Failed to update user info");
      }
    }
  }
};
