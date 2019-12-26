import firebase from "firebase/app";
export default {
  actions: {
    async createRepository({ dispatch, getters }, repositoryData) {
      await firebase
        .database()
        .ref(`repositories/${repositoryData.id}/`)
        .set({
          creator: getters.user.profile,
          slug: repositoryData.slug,
          name: repositoryData.name,
          about: repositoryData.about,
          cite: repositoryData.cite,
          repository: repositoryData.repository,
          accessibility: repositoryData.accessibility,
          languages: repositoryData.languages,
          technologies: repositoryData.technologies
        });
      await dispatch("makeRepositoryPrivate", repositoryData);
      if (repositoryData.accessibility === "public") {
        await dispatch("makeRepositoryPublic", repositoryData);
      }
    },
    async makeRepositoryPrivate({ dispatch, getters, commit }, repositoryData) {
      commit("pushRepository", repositoryData.id);
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/lists/repositories`)
        .set(getters.user.lists.repositories);
    },
    async makeRepositoryPublic({ dispatch }, repositoryData) {
      dispatch;
      let repositories = (
        await firebase
          .database()
          .ref(`/systemData/repositories/`)
          .once("value")
      ).val();
      if (repositories === null) {
        repositories = [];
      }
      repositories.push(repositoryData.id);
      await firebase
        .database()
        .ref(`/systemData/repositories/`)
        .set(repositories);
    },
    async fetchAllRepositories() {
      const allRepositories = (
        await firebase
          .database()
          .ref(`/repositories/`)
          .once("value")
      ).val();
      return allRepositories;
    },
    async fetchPublicRepositories() {
      const publicRepositories =
        (
          await firebase
            .database()
            .ref(`/systemData/repositories/`)
            .once("value")
        ).val() || [];
      return publicRepositories;
    },
    async updateRepositoriesList({ dispatch, getters }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/lists/repositories`)
          .set(getters.user.lists.repositories);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
