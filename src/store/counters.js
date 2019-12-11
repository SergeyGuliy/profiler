import firebase from "firebase/app";
export default {
  actions: {
    async getArticleId() {
      try {
        const articleId = (
          await firebase
            .database()
            .ref(`systemData/counters/counterArticle`)
            .once("value")
        ).val();
        const updateArticleId = articleId + 1;
        await firebase
          .database()
          .ref(`systemData/counters`)
          .update({ counterArticle: updateArticleId });
        return articleId;
      } catch (e) {
        console.log(e);
      }
    },
    async getRepositoryId() {
      try {
        const repositoryId = (
          await firebase
            .database()
            .ref(`systemData/counters/counterRepository`)
            .once("value")
        ).val();
        const updateRepositoryId = repositoryId + 1;
        await firebase
          .database()
          .ref(`systemData/counters`)
          .update({ counterRepository: updateRepositoryId });
        return repositoryId;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
