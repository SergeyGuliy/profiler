import Vue from "vue";
import App from "./App.vue";
import index from "./router";
import store from "./store";
import "./registerServiceWorker";
import Vuelidate from "vuelidate/src";
import "materialize-css/dist/js/materialize.min";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import VueLodash from "vue-lodash";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueLodash);

firebase.initializeApp({
  apiKey: "AIzaSyAi4gbMEoR3wWNFkwXNNx2etEQeNXeMjDQ",
  authDomain: "github-profiler-e57e2.firebaseapp.com",
  databaseURL: "https://github-profiler-e57e2.firebaseio.com",
  projectId: "github-profiler-e57e2",
  storageBucket: "github-profiler-e57e2.appspot.com",
  messagingSenderId: "99292287332",
  appId: "1:99292287332:web:a1af1dfb02335fc4856a71",
  measurementId: "G-JFWBN4DZ66"
});

let app;

firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    app = new Vue({
      router: index,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
