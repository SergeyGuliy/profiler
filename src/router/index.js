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
      path: "/:user",
      name: "user",
      meta: { layout: "main-layout" },
      component: () => import("../views/user/Profile")
    }
  ]
});

export default index;
