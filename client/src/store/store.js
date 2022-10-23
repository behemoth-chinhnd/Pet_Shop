import Vue from 'vue'
import Vuex from 'vuex' 
import createPersistedState from "vuex-persistedstate";
import VueSweetslert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import AuthStore from "./modules/auth"
import ProductStore from "./modules/product"
import ProductCart from "./modules/cart"
import AddressOrder from "./modules/address"
import Order from "./modules/order"

import AdminMenu from "./modules/admin/menu"
import AdminAuth from "./modules/admin/auth"
import AdminCategory from "./modules/admin/category"
import AdminSpecies from "./modules/admin/species"
import AdminTrademark from "./modules/admin/trademark"
import AdminOrder from "./modules/admin/order"

import SellerProfile from "./modules/seller/profile"











Vue.use(Vuex)
Vue.use(VueSweetslert2);

 createPersistedState(
  { storage: window.sessionStorage }
  );

export default  new Vuex.Store({
  plugins: [createPersistedState()],
    state:{
      count:0,
      user: {
        id: "",
        name: "MinhMonster",
        password: "",
        email: "",
        cash: "",
        token: "",
      },
    },
    // mutations: {
    //   update(state, value) {
    //     state.user.username = value;
    //   },
    //   setUsername(state, value) {
    //     state.user.username = value;
    //   },
    //   increment: state => {
    //     state.count++;
    // }
    // },
    // actions: {
    //   async fetchProducts({ commit }) {
    //     const response = await axios.get("todos");
    //     commit("setProducts", response.data);
    //   },
    //   click({ commit }) {
    //     commit("update", "value");
    //   },
    // },
    modules: {
      AUTH: AuthStore,
      PROD: ProductStore,
      CART: ProductCart,
      ADDR: AddressOrder,
      ORDE: Order,
      ADMU: AdminMenu,
      ADAU: AdminAuth,
      ADCA: AdminCategory,
      ADSP: AdminSpecies,
      ADTR: AdminTrademark,
      ADOR: AdminOrder,

      SLPR: SellerProfile

    },
    // getters: {
    //   double: state => {
    //       return state.count * 2;
    //   }
    // },

  })
    
