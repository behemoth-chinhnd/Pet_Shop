import Vue from "vue";
import App from "./App.vue";
import store from './store/store.js';
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetslert2 from "vue-sweetalert2";
import Paginate from 'vuejs-paginate'
import "sweetalert2/dist/sweetalert2.min.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import "./assets/css/mms-style.css";
import "./assets/css/mms-style-client.css";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount("#app");

Vue.use(VueSweetslert2);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, { $request: axios });
Vue.component('paginate', Paginate)


