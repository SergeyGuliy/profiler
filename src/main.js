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
import messageToast from "./plagins/message.toast.js";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueLodash);
Vue.use(messageToast);

firebase.initializeApp({
  apiKey: "AIzaSyCkbKZeTtP312IXRuMpsTIFORAguObFTbg",
  authDomain: "github-profiler-b5d56.firebaseapp.com",
  databaseURL: "https://github-profiler-b5d56.firebaseio.com",
  projectId: "github-profiler-b5d56",
  storageBucket: "github-profiler-b5d56.appspot.com",
  messagingSenderId: "471739903368",
  appId: "1:471739903368:web:fc7607cf9fe0a1ca3a5e3d",
  measurementId: "G-8QV9EENDE5"
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
