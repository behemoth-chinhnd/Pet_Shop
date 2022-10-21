
import api_admin_order from "@/apis/modules/admin/order";
import qs from "qs"

const state = {
    state: {
        order: {
            products_data:[],
            customer_address_id: "",
            address_attribute:""
        },
        order_items:[],
        total:"",
        total_items:"",
        orders:[],
        params: {
            page: 1,
            per_page: 3,
            q: {},
            pages: 1
        },
        res: {
          is_res: false,
          status: "",
          message: ""
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
  async confirmOrder({ commit, state }, credentials) {
    console.log(`input`, credentials)
    try {
      var res = await api_admin_order.confirmOrder(credentials)
      commit("resStatus", "success");
      commit("resMessage", "Order has been confirmed, please wait for the carrier to pick up the goods! Thanks!");
    } catch (error){
      console.log(error)
      if(error.response.data.message = "Unauthorized")
      commit("resStatus", "error");
      commit("resMessage", "An error occurred, You may have confirmed this order before! Thanks!");
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