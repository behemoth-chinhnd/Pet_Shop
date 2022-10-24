
import api from "@/plugin/axios";
import api_product from "@/apis/modules/product"
import upload from "@/apis/modules/upload"

import qs from "qs"

const state = {
  state: {
    total_search: "",
    product: [],
    products: [],
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
  setErrors(state, value) {
    state.state.errors = value;
  },
  isError(state, value) {
    state.state.isErr = value;
  },
  getItem(state, value) {
    state.state.product = value;
  },
  getNameDetail(state, value) {
    state.state.name_detail = value;
  },
  getAll(state, value) {
    state.state.products = value;
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
      const res = await upload.image(credentials.file)
      const image_key = res.data.key
      const input = {
        image_key: image_key,
        product: credentials.data,
      }
      await api_product.create(input)
      commit("resStatus", "success");
      commit("resMessage", "Create Successful!");
    } catch (error) {
      commit("resStatus", "error");
      if (error.response.data.name) {
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
          name_or_number_cont: credentials.q.name,
          trademark_category_id_eq: credentials.q.category_id,
          trademark_species_id_eq: credentials.q.species_id,
          trademark_id_eq: credentials.q.trademark_id,
          creator_of_User_type_store_name_cont: credentials.q.store_name

        },
      }
    }
    try {
      var res = await api_product.getAllList(queryParams)
      return res.data
    } catch {
      commit("resStatus", "error");
      commit("resMessage", "An error occurs, please contact the Admin to handle it! Thanks!");
      return state.state.res
    }
  },
  async getAll({ commit, state }, credentials) {
    const queryParams = {
      page: credentials.page,
      per_page: credentials.per_page,
      q: {
        name_or_number_cont: credentials.q.name,
        trademark_category_id_eq: credentials.q.category_id,
        trademark_species_id_eq: credentials.q.species_id,
        trademark_id_eq: credentials.q.trademark_id,
        creator_of_User_type_store_name_cont: credentials.q.store_name

      },
    }
    try {
      const res = await api_product.getAll(queryParams)
      return res.data
    } catch (error) {
      alert(error.response)
    }
  },

  async getItemSaler({ commit, state }, credentials) {
    try {
      const res = await api_product.getItemSaler(credentials)
      commit("getItem", res.data);
      commit("getNameDetail", res.data.name);
      console.log(`getItemProduct`, res.data)
      return res
    } catch (error) {
      commit("resStatus", "error");
      commit("resMessage", "Product does not exist!");
      return state.state.res
    }

  },
  async getItem({ commit, state }, credentials) {
    try {
      const res = await api_product.getItem(credentials)
      console.log(res.data)
      commit("getItem", res.data);
      commit("getNameDetail", res.data.name);
      console.log(`getItemProduct`, res.data)
      return res
    } catch {
      commit("resStatus", "error");
      commit("resMessage", "The product is out of stock or does not exist!");
      return state.state.res
    }

  },
  async edit({ commit, state }, credentials) {
    console.log(`input`, credentials)
    try {
      if (credentials.file === null) {

        const res = await api_product.editItemSaler(credentials)
        commit("getItem", res.data);
        return res
      } else {
        const res = await upload.image(credentials.file)
        const image_key = res.data.key
        const input = {
          image_key: image_key,
          product: credentials.product
        }
        const res2 = await api_product.editItemSaler(input)
        commit("getItem", res2.data);
        return res2

      }
    } catch (error) {
      console.log(error)
      commit("resStatus", "error");
      if (error.response.data.message) {
        commit("resMessage", 'This file type cannot be uploaded');
      } else if (error.response.data.trademark_id = "Trademark cant be blank") {
        commit("resMessage", 'Trademark cant be blank');
      } else if (error.response.data.trademark_id = "Trademark is not included in the list") {
        commit("resMessage", 'Trademark is not included in the list');
      } else if (error.response.data.name) {
        commit("resMessage", 'Name has already been taken');
      } else if (error.response.data.number) {
        commit("resMessage", 'Number has already been taken');
      } else if (error.response.data.name && error.response.data.number) {
        commit("resMessage", 'Name & Numbder has already been taken');
      } else {
        commit("resMessage", "Create Failed!");
      }
      return state.state.res
    }
  },

  async delete({ commit, state }, credentials) {
    try {
      await api_product.delete(credentials)
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
