// import AuthServices from "../../apis/modules/auth";
import api from "@/plugin/axios";
import api_auth from "@/apis/modules/auth"
import upload from "@/apis/modules/upload"

import says from "@/plugin/says";
import store from "../store";


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
      isActive: false,
      is_res: false,
      status: "",
      message: ""
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
  resIsActive(state, value) {
    state.state.res.isActive = value;
  },
  setErrors(state, value) {
    state.state.errors = value;
  },
  isError(state, value) {
    state.state.isErr = value;
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
  async register({ commit }, credentials) {
    await api.post("/api/user", credentials).then(res => {
      if (res) {
        console.log(res)

        commit("isError", false);
        commit("setErrors", "");
        // window.location.href = "/login";
      }
    }).catch((res) => {
      console.log(res)

      commit("isError", true);
      commit("setErrors", res.response.data);
    })
  },

  async login({ commit, dispatch, state }, credentials) {
    try {
      const res = await api_auth.login(credentials);
      commit("setToken", res.data);
      commit("setActive", true);
      commit("resIsActive", true);

      commit("isRes", true);
      commit("resStatus", "success");
      commit("resMessage", "Login Successful!");
      dispatch('profile');
      setTimeout(() =>
        window.location.href = "/user/account/profile", 2000)

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
    console.log(state.state.res)
    return state.state.res
  },

  async profile({ commit }) {
    try {
      const res = await api_auth.profile();
      commit("setProfile", res.data);
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



  async update({ commit, state }, credentials) {
    try {
      await api_auth.update(credentials);
      commit("isRes", true);
      commit("resStatus", "success");
      commit("resMessage", "Update Profile Successful!");
    } catch (error) {
      commit("isRes", false);
      commit("resStatus", "error");
      commit("resMessage", "Update Profile Failed!");
    }
    return state.state.res
  },


  async updateAvatar({ commit, dispatch, state }, credentials) {
    const res = await upload.image(credentials.file)
    const avatar_key = res.data.key
    const input = {
      avatar_key: avatar_key,
      password: "12345678",
      name: credentials.data.name,
      sex_id: credentials.data.sex_id,
      store_name: "234567erth",
      shipping_fee: 30000,
      birthday: credentials.data.birthday,
    }
    try {
      const profile = await api_auth.update(input);
      console.log(`res Update`, profile.data)
      dispatch('profile')
      commit("setProfile", profile.data);
      commit("isRes", true);
      commit("resStatus", "success");
      commit("resMessage", "Update Avatar Successful!");
    } catch (error) {
      commit("isRes", false);
      commit("resStatus", "error");
      commit("resMessage", "Update Avatar Failed!");
    }
    return state.state.res
  },





  logout({ commit }) {
    commit("setToken", "");
    commit("setActive", false);
    localStorage.removeItem("vuex");
    window.location.href = "/login";


  },
  async getAllUser({ commit }, credentials) {
    await api.get(`/api/users?page=${credentials.page}&per_page=${credentials.per_page}&q=${credentials.q}`).then((res) => {
      commit("getAllUser", res.data.users);
      commit("getPages", res.data.meta.pages);
    });
  }
}
export default {
  namespaced: true,
  //namespaced giup dispath den store nao
  state,
  getters,
  mutations,
  actions
}