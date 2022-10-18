// import AuthServices from "../../apis/modules/auth";
import api from "@/plugin/axios";
import api_admin_auth from "@/apis/modules/admin/auth"
import upload from "@/apis/modules/upload"

import says from "@/plugin/says";


const state = {
  state: {
    isActive: false,
    adminToken: "",
 
    res: {
      isActive: false,
      is_res: false,
      status: "",
      message: ""
    },

  },
};
const getters = {
  getToken: state => state.token
};
const mutations = {
  isRes(state, value) {
    state.state.res.is_res = value;
  },
  resStatus(state, value) {
    state.state.res.status = value;
  },
  resMessage(state, value) {
    state.state.res.message = value;
  },
  resIsActive(state, value) {
    state.state.res.isActive = value;
  },
  setAdminToken(state, value) {
    state.state.adminToken = value;
  },
  setActive(state, value) {
    state.state.isActive = value;
  },
};
const actions = {
  async login({ commit, dispatch, state }, credentials) {
    try {
      const res = await api_admin_auth.login(credentials);
      commit("setAdminToken", res.data);
      commit("setActive", true);
      commit("resIsActive", true);

      commit("isRes", true);
      commit("resStatus", "success");
      commit("resMessage", "Login Successful!");
      dispatch('profile');
      setTimeout(() =>
        window.location.href = "/admin/management/user", 2000)

    } catch (error) {
      if (error.response) {
        commit("setToken", "");
        commit("setActive", false);
        commit("resIsActive", false);
        commit("isRes", false);
        commit("resStatus", "error");
        commit("resMessage", "Login Failed!");
        localStorage.removeItem("vuex");
      }

    }
 
  },

  logout({ commit }) {
    commit("setToken", "");
    commit("setActive", false);
    localStorage.removeItem("vuex");
    window.location.href = "/login";

  
  },

}
export default {
  namespaced: true,
  //namespaced giup dispath den store nao
  state,
  getters,
  mutations,
  actions
}