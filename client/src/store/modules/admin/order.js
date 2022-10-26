
import api_admin_order from "@/apis/modules/admin/order";
import check from "@/plugin/check";
import qs from "qs"

const state = {
  state: {
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
      is_res: false,
      status: "",
      message: "",
      text: "",
    },
  },
};
const getters = {
};
const mutations = {

  getItem(state, value) {
    state.state.product = value;
  },
  resStatus(state, value) {
    state.state.res.status = value;
  },
  resMessage(state, value) {
    state.state.res.message = value;
  },
  resText(state, value) {
    state.state.res.text = value;
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
  async getAll({ commit }) {

    const res = await api_admin_order.getAll();
    console.log(`getAllOrder`, res)
    return res;
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
          status_eq: credentials.q.status,
        },
      }
    }
    try {
      var res = await api_admin_order.getAllList(queryParams)
      return res.data
    } catch {
      commit("resStatus", "error");
      commit("resMessage", "An error occurs, please contact the Admin to handle it! Thanks!");
      return state.state.res
    }
  },

  async confirmOrder({}, credentials) {
    console.log(`input`, credentials)
    try {
      var res = await api_admin_order.confirmOrder(credentials)
      const result = check.success(res)
      return result
    } catch (error) {
      const result = check.errors(error)
      return result
    }
  },
  async confirmTransport({ commit, state }, credentials) {
    console.log(`input`, credentials)
    try {
      var res = await api_admin_order.confirmTransport(credentials)
      commit("resStatus", "success");
      commit("resMessage", "Successfully confirmed!");
      commit("resText", "Please Ship the goods to the recipient! Thank you!");

    } catch (error) {
      commit("resStatus", "error");
      commit("resMessage", "An error occurred!");
      commit("resText", " This order has been confirmed! Thank!");
    }
    return state.state.res
  },
  async cancel({ commit, state }, credentials) {
    console.log(`input`, credentials)
    try {
      var res = await api_admin_order.cancel(credentials)
      commit("resStatus", "success");
      commit("resMessage", "Canceled successfully!");
      commit("resText", "Please return the order to the seller! Thank you!");

    } catch (error) {
      commit("resStatus", "error");
      commit("resMessage", "Canceled failed!");
      commit("resText", " Please check again! Thank!");
    }
    return state.state.res
  },
  async complete({ commit, state }, credentials) {
    console.log(`input`, credentials)
    try {
      var res = await api_admin_order.complete(credentials)
      commit("resStatus", "success");
      commit("resMessage", "Order completed!");
      commit("resText", "You did a great job! Thanks!");

    } catch (error) {
      commit("resStatus", "error");
      commit("resMessage", "Failed!");
      commit("resText", " Please check again! Thank!");
    }
    return state.state.res
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}