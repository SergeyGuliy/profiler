import firebase from "firebase/app";
export default {
  actions: {
    async createArticle({ dispatch, getters }, articleData) {
      await firebase
        .database()
        .ref(`articles/${articleData.id}/`)
        .set({
          creator: getters.user.profile,
          creator_id: getters.user.id,
          slug: articleData.slug,
          name: articleData.name,
          about: articleData.about,
          cite: articleData.cite,
          repository: articleData.repository,
          accessibility: articleData.accessibility,
          languages: articleData.languages,
          technologies: articleData.technologies
        });
      await dispatch("makeArticlePrivate", articleData);
      if (articleData.accessibility === "public") {
        await dispatch("makeArticlePublic", articleData);
      }
    },
    async makeArticlePrivate({ dispatch, getters, commit }, articleData) {
      commit("pushArticle", articleData.id);
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/lists/articles`)
        .set(getters.user.lists.articles);
    },
    async makeArticlePublic({ dispatch }, articleData) {
      dispatch;
      let articles = (
        await firebase
          .database()
          .ref(`/systemData/articles/`)
          .once("value")
      ).val();
      if (articles === null) {
        articles = [];
      }
      articles.push(articleData.id);
      await firebase
        .database()
        .ref(`/systemData/articles/`)
        .set(articles);
    },
    async fetchAllArticles() {
      const allArticles = (
        await firebase
          .database()
          .ref(`/articles/`)
          .once("value")
      ).val();
      return allArticles;
    },
    async fetchPublicArticles() {
      const publicArticles =
        (
          await firebase
            .database()
            .ref(`/systemData/articles/`)
            .once("value")
        ).val() || [];
      return publicArticles;
    },
    async updateArticlesList({ dispatch, getters }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/lists/articles`)
          .set(getters.user.lists.articles);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchArticleById({ dispatch }, id) {
      dispatch;
      try {
        return (
          await firebase
            .database()
            .ref(`/articles/${id}/`)
            .once("value")
        ).val();
      } catch (e) {
        console.log("User is not Logged In");
      }
    }
  }
};
