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
      meta: { layout: "main-layout", havePagination: true },
      component: () => import("../views/allUsers/Users")
    },
    {
      path: "/articles",
      name: "articles",
      meta: { layout: "main-layout", havePagination: true },
      component: () => import("../views/allUsers/Articles")
    },
    {
      path: "/repositories",
      name: "repositories",
      meta: { layout: "main-layout", havePagination: true },
      component: () => import("../views/allUsers/Repositories")
    },
    {
      path: "/admin",
      name: "admin",
      meta: { layout: "main-layout" },
      component: () => import("../views/user/UserAdmin")
    },
    {
      path: "/:user",
      name: "user",
      meta: { layout: "main-layout" },
      component: () => import("../views/user/User"),
      children: [
        {
          path: "",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserProfile")
        },
        {
          path: "friends",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserFriends")
        },
        {
          path: "articles",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserArticles")
        },
        {
          path: "github",
          meta: { layout: "main-layout" },
          component: () => import("../views/user/UserGitHub")
        }
      ]
    }
  ]
});

export default index;
