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
        commit("setUser", userInfo);
        commit("userLogIn");
      } catch (e) {
        console.log("User is not Logged In");
      }
    },
    async updateUserInfo({ dispatch, commit }, updateInfo) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/`)
          .update(updateInfo);
        commit("setUser", updateInfo);
      } catch (e) {
        console.log("Failed to update user info");
      }
    }
  }
};
