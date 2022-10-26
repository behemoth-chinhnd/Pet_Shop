
import api from "@/plugin/axios";
import api_order from "@/apis/modules/order";

import qs from "qs"
import check from "@/plugin/check";

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
  async create({},credentials) {
    try {
      const res = await api_order.create(credentials)
      const result = check.success(res)
      setTimeout(() =>
        window.location.href = "/user/purchase", 2000)
      return result
    } catch {
      const result = check.errors(error)
      return result
    }
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
        status_eq: input.q.status,
      },
    }
    try{
      const res = await api.get(`/api/orders?page=${input.page}&per_page=${input.per_page}`, {
        params: queryParams, paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
      console.log(`getAll Order`, res.data);

      // commit("getAll", res.data.orders);
      // commit("getPages", res.data.meta.pages);
      // commit("getPage", input.page);
      return res.data
    } catch (error){
      const result = check.errors(error)
      return result
    }
    
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