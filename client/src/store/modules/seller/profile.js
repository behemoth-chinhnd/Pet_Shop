import api from "@/plugin/axios";
import api_profile_seller from "@/apis/modules/seller/profile"
import upload from "@/apis/modules/upload"
import check from "@/plugin/check";

const state = {
  state: {
    user: [],
    isActive: false,
    users: [],
    params: {
      page: 1,
      per_page: 10,
      q: {},
      pages: 1
    },
    errors: [],
    res: {
      alert: false,
      error: false
    },
  },
};
const getters = {
  getToken: state => state.token
};
const mutations = {
  setProfile(state, value) {
    state.state.user = value;
  },
  getPages(state, value) {
    state.state.params.pages = value;
  },
};
const actions = {
  async update({ }, credentials) {
    try {
      const res = await api_profile_seller.update(credentials);
      const result = check.success(res)
      return result
    } catch (error) {
      const result = check.errors(error)
      return result
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