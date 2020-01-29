import firebase from "firebase/app";
import { defaultsDeep } from "lodash";

export default {
  actions: {
    async fetchAllUsers() {
      return (
        (
          await firebase
            .database()
            .ref(`/users/`)
            .once("value")
        ).val() || []
      );
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
    },
    async fetchUserById({ dispatch }, id) {
      dispatch;
      try {
        const userInfo = (
          await firebase
            .database()
            .ref(`/users/${id}/`)
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
        return user;
      } catch (e) {
        console.log("User is not Logged In");
      }
    }
  }
};
