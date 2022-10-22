import api from "@/plugin/axios";
import api_auth from "@/apis/modules/auth"
import upload from "@/apis/modules/upload"
import check from "@/plugin/check";

const state = {
  state: {
    user: [],
    isActive: false,
    userToken: "",
    users: [],
    params: {
      page: 1,
      per_page: 10,
      q: {},
      pages: 1
    },
    isErr: false,
    errors: [],
    res: {
      alert: false,
      error: false
    },
    birthday: {
      day: "",
      month: "",
      year: ""
    },
  },
};
const getters = {
  getToken: state => state.token
};
const mutations = {
  isDay(state, value) {
    state.state.birthday.day = value;
  },
  isMonth(state, value) {
    state.state.birthday.month = value;
  },
  isYear(state, value) {
    state.state.birthday.year = value;
  },
  isRes(state, value) {
    state.state.res.is_res = value;
  },
  resStatus(state, value) {
    state.state.res.status = value;
  },
  resMessage(state, value) {
    state.state.res.message = value;
  },
  resName(state, value) {
    state.state.res.errName = value;
  },
  resEmail(state, value) {
    state.state.res.errEmail = value;
  },
  resPassword(state, value) {
    state.state.res.errPassword = value;
  },
  resBirthday(state, value) {
    state.state.res.errBirthday = value;
  },
  setToken(state, value) {
    state.state.userToken = value;
  },
  setProfile(state, value) {
    state.state.user = value;
  },
  setActive(state, value) {
    state.state.isActive = value;
  },
  getAllUser(state, value) {
    state.state.users = value;
  },
  getPages(state, value) {
    state.state.params.pages = value;
  },
};
const actions = {
  async register({ }, credentials) {
    try {
      const res = await api_auth.register(credentials)
      const result = check.success(res)
      setTimeout(() =>
        window.location.href = "/login", 2000)
      return result
    } catch (error) {
      const result = check.errors(error)
      return result
    }
  },

  async login({ commit }, credentials) {
    try {
      const res = await api_auth.login(credentials);
      commit("setToken", res.data);
      commit("setActive", true);
      const result = check.success(res)
      setTimeout(() =>
        window.location.href = "/user/account/profile", 2000)
      return result
    } catch (error) {
      const result = check.errors(error)
      return result
    }
  },
  async profile({ commit }) {
    try {
      const res = await api_auth.profile();
      // commit("setProfile", res.data);
      commit("isYear", Number(res.data.birthday.slice(0, 4)));
      commit("isMonth", Number(res.data.birthday.slice(5, 7)));
      commit("isDay", Number(res.data.birthday.slice(8, 10)));
      return res.data
    } catch (errors) {
      commit("setToken", "");
      commit("setActive", false);
      commit("setProfile", "");
    }
  },
  async update({ }, credentials) {
    try {
      const res = await api_auth.update(credentials);
      const result = check.success(res)
      return result
    } catch (error) {
      const result = check.errors(error)
      return result
    }
  },
  async updateAvatar({ commit, dispatch, state }, credentials) {
    const res = await upload.image(credentials.file)
    const avatar_key = res.data.key
    const input = {
      avatar_key: avatar_key,
      sex_id: credentials.data.sex_id,
    }
    try {
      const res = await api_auth.update(input);
      commit("setProfile", res.data);
      const result = check.success(res)
      return result
    } catch (error) {
      const result = check.errors(error)
      return result
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
  state,
  getters,
  mutations,
  actions
}