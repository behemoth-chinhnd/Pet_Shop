import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)


export default  new Vuex.Store({
    state:{
      count:0,
      user: {
        id: "",
        username: "",
        password: "",
        email: localStorage.getItem("email"),
        cash: "",
        token: localStorage.getItem("token"),
      },
    },
    mutations: {
      update(state, value) {
        state.user.username = value;
      },
      setUsername(state, value) {
        state.user.username = value;
      },
      increment: state => {
        state.count++;
    }
    },
    actions: {
      async fetchProducts({ commit }) {
        const response = await axios.get("todos");
        commit("setProducts", response.data);
      },
      click({ commit }) {
        commit("update", "value");
      },
    },
    modules: {},
    getters: {
      double: state => {
          return state.count * 2;
      }
    },

  })
    
