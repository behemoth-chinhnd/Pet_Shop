
import api from "@/plugin/axios";
import api_admin_trademark from "@/apis/modules/admin/trademark"
import upload from "@/apis/modules/upload"

import qs from "qs"

const state = {
  state: {
    total_search: "",
    trademarks: [],
    trademarkss: [],
    name_detail: "",
    params: {
      page: 1,
      per_page: 3,
      q: {},
      pages: 1
    },
    isErr: false,
    errors: [],
    res: {
      status: "",
      message: ""
    },
  },
};
const getters = {
};
const mutations = {
  getItem(state, value) {
    state.state.trademarks = value;
  },
  getNameDetail(state, value) {
    state.state.name_detail = value;
  },
  getAll(state, value) {
    state.state.trademarkss = value;
  },
  getTotalSearch(state, value) {
    state.state.total_search = value;
  },
  resStatus(state, value) {
    state.state.res.status = value;
  },
  resMessage(state, value) {
    state.state.res.message = value;
  },
  getPage(state, value) {
    state.state.params.page = value;
  },
  getPages(state, value) {
    state.state.params.pages = value;
  },

};
const actions = {
  async create({ commit, state }, credentials) {
    try {
      try {
        const res = await upload.image(credentials.file)
        const image_key = res.data.key
        var input = {
          image_key: image_key,
          trademark: credentials.data,
        }
      } catch (error) {
        commit("resStatus", "error");
        if (error.response.data.message) {
          commit("resMessage", 'Wrong image type or size too large!');
        } else {
          commit("resMessage", "Upload Image Failed!");
        }
        return state.state.res
      }
      await api_admin_trademark.create(input)
      commit("resStatus", "success");
      commit("resMessage", "Create Successful!");
    } catch (error) {
      commit("resStatus", "error");
      if (error.response.data.message) {
        commit("resMessage", 'This file type cannot be uploaded');
      } else if (error.response.data.name) {
        commit("resMessage", 'Name has already been taken');
      } else if (error.response.data.name && error.response.data.number) {
        commit("resMessage", 'Name & Numbder has already been taken');
      } else {
        commit("resMessage", "Create Failed!");
      }
    }
    return state.state.res
  },
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
      var res = await api_admin_trademark.getAllList(queryParams)
      return res.data
    } catch {
      commit("resStatus", "error");
      commit("resMessage", "An error occurs, please contact the Admin to handle it! Thanks!");
      return state.state.res
    }
  },

  async getItem({ commit, state }, credentials) {
    try {
      const res = await api_admin_trademark.getItem(credentials)
      commit("getItem", res.data);
      commit("getNameDetail", res.data.name);
      return res
    } catch (error) {
      commit("resStatus", "error");
      commit("resMessage", "The product is out of stock or does not exist!");
      return state.state.res
    }
  },

  async edit({ commit, state }, credentials) {
    try {
      if (credentials.file === null) {
        const res = await api_admin_trademark.edit(credentials)
        commit("getItem", res.data);
        return res
      } else {
        const res = await upload.image(credentials.file)
        const image_key = res.data.key
        const input = {
          image_key: image_key,
          trademarks: credentials.trademarks
        }
        const data = await api_admin_trademark.edit(input)
        return data
      }
    } catch (error) {
      commit("resStatus", "error");
      if (error.response.data.message) {
        commit("resMessage", 'This file type cannot be uploaded');
      } else if (error.response.data.name) {
        commit("resMessage", 'Name has already been taken');
      } else if (error.response.data.name && error.response.data.number) {
        commit("resMessage", 'Name & Numbder has already been taken');
      } else {
        commit("resMessage", "Edit Failed!");
      }
      return state.state.res
    }
  },

  async delete({ commit, state }, credentials) {
    try {
      await api_admin_trademark.delete(credentials)
      commit("resStatus", "success");
      commit("resMessage", "Delete Successful!");
    } catch (error) {
      commit("resStatus", "error");
      commit("resMessage", "Delete Failed!");
    }
    return state.state.res
  },

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
