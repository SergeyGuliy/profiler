import firebase from "firebase/app";

export default {
  actions: {
    async fetchCategories() {
      return (
        (
          await firebase
            .database()
            .ref(`/systemData/categories/`)
            .once("value")
        ).val() || {}
      );
    },
    async updateCategories({ getters }, categories) {
      try {
        getters;
        await firebase
          .database()
          .ref(`/systemData/categories/`)
          .set(categories);
      } catch (e) {
        console.log("Failed to update user info");
      }
    }
  }
};
