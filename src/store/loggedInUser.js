import defaultsDeep from "../../node_modules/lodash.defaultsdeep/index.js";
import firebase from "firebase/app";
export default {
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
