import M from "materialize-css/dist/js/materialize.min";
export default {
  install(Vue) {
    Vue.prototype.$message = function(html) {
      M.toast({ html });
    };
    Vue.prototype.$messageError = function(html) {
      M.toast({ html: `${html}`, classes: "toast-error" });
    };
    Vue.prototype.$messageSuccess = function(html) {
      M.toast({ html: `${html}`, classes: "toast-success" });
    };
  }
};
