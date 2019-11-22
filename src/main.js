import Vue from "vue";
import App from "./App.vue";
import index from "./router";
import store from "./store";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
import firebase from "firebase/app";
import Vuelidate from "vuelidate/src";

Vue.config.productionTip = false;

Vue.use(Vuelidate);

firebase.initializeApp({
  apiKey: "AIzaSyDCTnq7Z2dAt_o3DypWwgHouyaC_K1CpDk",
  authDomain: "profiler-6f8af.firebaseapp.com",
  databaseURL: "https://profiler-6f8af.firebaseio.com",
  projectId: "profiler-6f8af",
  storageBucket: "profiler-6f8af.appspot.com",
  messagingSenderId: "471447902032",
  appId: "1:471447902032:web:ee50b0c3af6d63f2aefe55",
  measurementId: "G-BS71HB8YBN"
});

new Vue({
  router: index,
  store,
  render: h => h(App)
}).$mount("#app");
