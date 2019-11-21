import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const index = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
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
      path: "/articles",
      name: "articles",
      meta: { layout: "main-layout" },
      component: () => import("../views/allUsers/Articles/Articles")
    },
    {
      path: "/repositories",
      name: "repositories",
      meta: { layout: "main-layout" },
      component: () => import("../views/allUsers/Repositories/Repositories")
    },
    {
      path: "/:user",
      meta: { layout: "main-layout" },
      component: () => import("../views/user/User"),
      children: [
        {
          path: "",
          name: "user",
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
          path: "github",
          name: "my-github",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserGitHub")
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
