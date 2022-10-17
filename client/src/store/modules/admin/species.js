
import api from "@/plugin/axios";
import api_admin_species from "@/apis/modules/admin/species"
import upload from "@/apis/modules/upload"

import qs from "qs"

const state = {
  state: {
    total_search: "",
    species: [],
    speciess: [],
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
    state.state.species = value;
  },
  getNameDetail(state, value) {
    state.state.name_detail = value;
  },
  getAll(state, value) {
    state.state.speciess = value;
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
          species: credentials.data,
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
      await api_admin_species.create(input)
      commit("resStatus", "success");
      commit("resMessage", "Create Successful!");
    } catch (error) {
      console.log(error)

      commit("resStatus", "error");
      if (error.response.data.message) {
        commit("resMessage", 'Name has already been taken');
      } else if (error.response.data.number) {
        commit("resMessage", 'Number has already been taken');
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
      var res = await api_admin_species.getAllList(queryParams)
      console.log(`res`, res)

      return res.data
    } catch {
      commit("resStatus", "error");
      commit("resMessage", "An error occurs, please contact the Admin to handle it! Thanks!");
      return state.state.res
    }
  },

  async getItem({ commit, state }, credentials) {
    try {
      const res = await api_admin_species.getItem(credentials)
      console.log(res.data)
      commit("getItem", res.data);
      commit("getNameDetail", res.data.name);
      console.log(`getItem`, res.data)
      return res
    } catch (error) {
      commit("resStatus", "error");
      commit("resMessage", "The product is out of stock or does not exist!");
      return state.state.res
    }

  },

  async edit({ commit, state }, credentials) {
    console.log(credentials)

    if (credentials.file === null) {
      try {
        const res = await api_admin_species.edit(credentials)
        console.log(res)
        commit("getItem", res.data);
        return res
      } catch {
        commit("resStatus", "error");
        commit("resMessage", "Edit species Failed!");
        return state.state.res
      }
    } else {
      try {
        const res = await upload.image(credentials.file)
        const image_key = res.data.key
        const input = {
          image_key: image_key,
          species: credentials.species
        }
        const res2 = await api_admin_species.edit(input)
        commit("getItem", res2.data);
        return res2
      } catch (error) {
        commit("resStatus", "error");
        commit("resMessage", "Edit species Failed!");
        return state.state.res
      }
    }
  },
  async delete({ commit, state }, credentials) {
    try {
      await api_admin_species.delete(credentials)
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
