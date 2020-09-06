import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./routes";
import globalComponentInstaller from "@/plugins/globalComponentInstaller";
import DefaultLayout from "@/layout/DefaultLayout";
import DarkLayout from "@/layout/DarkLayout";
import ApiAgent from "@/plugins/agents";
import store from "@/vuex";
import Moment from "vue-moment";
import VueToast from "vue-toast-notification";
import "./assets/tailwind.css";

import "vue-toast-notification/dist/theme-default.css";

Vue.use(VueToast);
Vue.use(VueRouter);
Vue.use(Moment);

// globally register layout components
Vue.use(globalComponentInstaller, {
  components: [
    ["default-layout", DefaultLayout],
    ["dark-layout", DarkLayout]
  ]
});

Vue.mixin({
  beforeCreate() {
    this.$http = new ApiAgent("/api");
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
