
import api from "@/plugin/axios";
import qs from "qs"

const state = {
  state: {
    cart: [],
    carts: [],
    product: [],
    order: {
      products_data: [],
      customer_address_id: "",
      address_attribute: ""
    },
    order_items: [],
    total: "",
    total_items: "",
    orders: [],
    params: {
      page: 1,
      per_page: 3,
      q: {},
      pages: 1
    },
    res: {
      status: "",
      message: ""
    },
    isErr: "kkkk",
    errors: []
  },
};
const getters = {
};
const mutations = {
  resStatus(state, value) {
    state.state.res.status = value;
  },
  resMessage(state, value) {
    state.state.res.message = value;
  },
  setErrors(state, value) {
    state.state.errors = value;
  },
  isError(state, value) {
    state.state.isErr = value;
  },
  getItem(state, value) {
    state.state.product = value;
  },
  postProductsData(state, value) {
    state.state.order.products_data = value;
  },
  postCustomerAddressId(state, value) {
    state.state.order.customer_address_id = value;
  },
  postAddressAttribute(state, value) {
    state.state.order.address_attribute = value;
  },
  getCart(state, value) {
    state.state.cart = value;
  },
  getOrderItem(state, value) {
    state.state.order_items = value;
  },
  getTotal(state, value) {
    state.state.total = value;
  },
  getTotalItems(state, value) {
    state.state.total_items = value;
  },
  getAll(state, value) {
    state.state.orders = value;
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
      const res = await api.post("/api/order/submit", { order: { customer_address_id: credentials.id } })
      console.log(`Order All Cart (create)`, res)
      commit("resStatus", "success");
      commit("resMessage", "Order Successful");
    } catch {
      commit("resStatus", "error");
      commit("resMessage", "Order Failed");
    }
    return state.state.res
  },

  async buyNow({ commit, rootState, state }, credentials) {
    const input = {
      order: {
        products_data: [credentials],
        customer_address_id: rootState.ADDR.state.is_default.id
      }
    }
    try {
      const res = await api.post("/api/order", input)
      commit("resStatus", "success");
      commit("resMessage", "Order Successful");
    }catch {
      commit("resStatus", "error");
      commit("resMessage", "Order Failed");
    }
    return state.state.res
  },

  async getAll({ commit }, input) {
    const queryParams = {
      q: {
        number_cont: '',
      },
    }
    const res = await api.get(`/api/orders?page=${input.page}&per_page=${input.per_page}`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
    commit("getAll", res.data.orders);
    commit("getPages", res.data.meta.pages);
    commit("getPage", input.page);
    console.log(`getAll Order`, res.data);
    return res.data
  },

  async getDetail({ commit }, value) {
    console.log(value)
    await api.get(`/api/order?number=${value}`).then((res) => {
      console.log(res.data)

    });
  },

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}