import firebase from "firebase/app";

export default {
  actions: {
    async fetchCategories() {
      const categories =
        (
          await firebase
            .database()
            .ref(`/systemData/categories/`)
            .once("value")
        ).val() || {};
      return categories;
    },
    async updateCategories({ getters }, categories) {
      try {
        await firebase
          .database()
          .ref(`/systemData/categories/`)
          .update(categories);
      } catch (e) {
        console.log("Failed to update user info");
      }
    }
  }
};
