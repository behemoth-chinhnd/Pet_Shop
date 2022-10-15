
import api from "@/plugin/axios";
import api_product from "@/apis/modules/product"
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
  async create({ commit }, credentials) {
    await api.post("/api/products", credentials).then(res => {
      if (res) {
        commit("isError", false);
        commit("setErrors", "");
      }
    }).catch((res) => {
      commit("isError", true);
      commit("setErrors", res.response.data);
    })
  },

  async getAll({ commit, state }, credentials) {
    const queryParams = {
      page: credentials.page,
      per_page: credentials.per_page,
      q: {
        name_or_number_cont: credentials.q.name,
      },
    }
    try {
      const res = await api_product.getAll(queryParams)
      // console.log(res.data.products)
      // commit("getAll", res.data.products);
      // commit("getTotalSearch", res.data.meta.total);
      // commit("getPages", res.data.meta.pages);
      // commit("getPage", credentials.page);
      // console.log(res.data)
      return res.data
    } catch (error) {
      alert(error.response)
    }
  },
  async getItem({ commit }, credentials) {
    await api.get(`/api/products/${credentials}`).then(res => {
      console.log(res.data)
      commit("getItem", res.data);
      commit("getNameDetail", res.data.name);
      console.log(`getItemProduct`, res.data)
    }).catch((res) => {
      alert(res.response.data)
    })
  },
  async edit({ commit }, credentials) {
    console.log(`Input Edit Product`, credentials)
    console.log(`File`, credentials.file)
    if (credentials.file === null) {
      api.put(`/api/products/${credentials.data.id}`, credentials.data).then(res => {
        console.log(`res Data`, res.data)
        commit("getItem", res.data);
      }).catch((res) => {
        alert(res.response.data)
      })
    } else {
      await api.post(`/api/uploads/upload`, credentials.file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(res => {
        console.log(`Upload File`, res.data)
        const image_key = res.data.key
        const input = {
          image_key: image_key,
          product: credentials.data
        }
        api.put(`/api/products/${credentials.data.id}`, input).then(res => {
          console.log(`res Edit`, res.data)
          commit("getItem", res.data);
        }).catch((res) => {
          alert(res.response.data)
        })
      });
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
