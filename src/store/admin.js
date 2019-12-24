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
      console.log(categories);
      return categories;
    },
    async updateCategories({ getters }, categories) {
      try {
        console.log(getters.user);
        console.log(categories);
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
