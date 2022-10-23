// import AuthServices from "../../apis/modules/auth";
import api from "@/plugin/axios";
import api_admin_auth from "@/apis/modules/admin/auth"
import check from "@/plugin/check";
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

  async login({ commit }, credentials) {
    try {
      const res = await api_admin_auth.login(credentials);
      console.log(res)
      commit("setAdminToken", res.data);
      commit("resIsActive", true);
      const result = check.success(res)
      setTimeout(() =>
        window.location.href = "/admin", 2000)
      return result
    } catch (error) {
      const result = check.errors(error)
      return result
    }
  },

  logout({ commit }) {
    commit("setToken", "");
    commit("setActive", false);
    window.location.href = "/admin/login";
  },
  // async getAllUser({ commit }, credentials) {
  //   await api.get(`/api/users?page=${credentials.page}&per_page=${credentials.per_page}&q=${credentials.q}`).then((res) => {
  //     commit("getAllUser", res.data.users);
  //     commit("getPages", res.data.meta.pages);
  //   });
  // },
  async getAllList({ commit, state }, credentials) {
    console.log(`input`, credentials)
    if (credentials.q.id) {
      var queryParams = {
        page: credentials.page,
        per_page: credentials.per_page,
        q: {
          id_eq: credentials.q.id,
        },
      }
    } else {
      var queryParams = {
        page: credentials.page,
        per_page: credentials.per_page,
        q: {
          name_cont: credentials.q.name,
        },
      }
    }
    try {
      var res = await api_admin_auth.getAllList(queryParams)
      console.log(`res`, res)
      return res.data
    } catch {
      commit("resStatus", "error");
      commit("resMessage", "An error occurs, please contact the Admin to handle it! Thanks!");
      return state.state.res
    }
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}