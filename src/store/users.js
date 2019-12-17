import firebase from "firebase/app";

export default {
  actions: {
    async fetchAllUsers() {
      return (
        await firebase
          .database()
          .ref(`/users/`)
          .once("value")
      ).val();
    },
    async updateFriendsList({ dispatch, getters }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/lists/friends`)
          .set(getters.user.lists.friends);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
