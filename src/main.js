import Vue from "vue";
import App from "./App.vue";
import index from "./router";
import store from "./store";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

Vue.config.productionTip = false;

new Vue({
  router: index,
  store,
  render: h => h(App)
}).$mount("#app");
