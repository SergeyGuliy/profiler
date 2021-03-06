import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const index = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      meta: { layout: "main-layout" },
      component: () => import("../views/Home")
    },
    {
      path: "/users",
      name: "users",
      meta: { layout: "main-layout" },
      component: () => import("../views/allUsers/Users/Users")
    },
    {
      path: "/users/:user",
      name: "user",
      meta: { layout: "main-layout" },
      component: () => import("../views/allUsers/Users/User")
    },
    {
      path: "/articles",
      name: "articles",
      meta: { layout: "main-layout" },
      component: () => import("../views/allUsers/Articles/Articles")
    },
    {
      path: "/articles/:article",
      name: "article",
      meta: { layout: "main-layout" },
      component: () => import("../views/allUsers/Articles/Article")
    },
    {
      path: "/repositories",
      name: "repositories",
      meta: { layout: "main-layout" },
      component: () => import("../views/allUsers/Repositories/Repositories")
    },
    {
      path: "/repositories/:repository",
      name: "repository",
      meta: { layout: "main-layout" },
      component: () => import("../views/allUsers/Repositories/Repository")
    },
    {
      path: "/:user",
      meta: { layout: "main-layout" },
      component: () => import("../views/user/User"),
      children: [
        {
          path: "profile",
          name: "profile",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserProfile")
        },
        {
          path: "friends",
          name: "my-friends",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserFriends")
        },
        {
          path: "articles",
          name: "my-articles",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserArticles")
        },
        {
          path: "articles_create",
          name: "articles_create",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserArticlesCreate")
        },
        {
          path: "repositories",
          name: "my-repositories",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserRepositories")
        },
        {
          path: "repository_create",
          name: "repository_create",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserRepositoryCreate")
        },
        {
          path: "admin",
          name: "admin",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserAdmin")
        }
      ]
    }
  ]
});

export default index;
