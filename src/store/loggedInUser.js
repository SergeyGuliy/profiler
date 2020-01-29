import { defaultsDeep } from "lodash";
import firebase from "firebase/app";

export default {
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
    },
    async becomeAdmin({ dispatch, commit, getters }) {
      try {
        commit("becomeAdmin");
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/isAdmin`)
          .set(getters.user.isAdmin);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
