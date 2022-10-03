import Vue from 'vue'
import Vuex from 'vuex' 
import createPersistedState from "vuex-persistedstate";
import AuthStore from "./modules/auth"

Vue.use(Vuex)

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
      AUTH: AuthStore
    },
    // getters: {
    //   double: state => {
    //       return state.count * 2;
    //   }
    // },

  })
    
