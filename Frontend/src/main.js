import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./style.css";
import VueToast from "vue-toast-notification";

import "vue-toast-notification/dist/theme-bootstrap.css";

Vue.use(VueToast, {
  position: "bottom",
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
