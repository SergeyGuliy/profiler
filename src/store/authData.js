import firebase from "firebase/app";
export default {
  actions: {
    async getUid() {
      return (await firebase.auth().currentUser).uid;
    },
    async createNewUser({ dispatch }, { email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/`)
          .set({
            id: uid,
            profile: email.split("@")[0],
            isAdmin: false
          });
        await dispatch("fetchUser");
      } catch (e) {
        console.log("Failed to create user");
        console.log(e);
      }
    },
    async logIn({ dispatch }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        await dispatch("fetchUser");
      } catch (e) {
        console.log("e");
      }
    },
    async logOut({ commit }) {
      await firebase.auth().signOut();
      await commit("deleteUser");
    }
  }
};
