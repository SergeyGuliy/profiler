import firebase from "firebase/app";
export default {
  actions: {
    getLoggedInUser() {
      const user = firebase.auth().currentUser;
      return user;
    },
    async createNewUser({ dispatch }, { email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userId = dispatch("getLoggedInUser");
        await firebase
          .database()
          .ref(`users/${userId}/info`)
          .set({
            isAdmin: true
          });
      } catch (e) {
        alert(e);
      }
    },
    async logIn() {},
    async logOut() {
      firebase.auth().signOut();
    }
  }
};
