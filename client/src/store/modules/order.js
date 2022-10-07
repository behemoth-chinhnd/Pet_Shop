
import api from "@/plugin/axios";

const state = {
    state: {
        cart: [],
        carts: [],
        product:[],
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
        isErr: false,
        errors: []
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
    async create({ commit }, credentials) {
      //   const input = {
      //     order: {
      //       customer_address_id: credentials.id,
      //       address_attribute: {}
      //     }
      // }
      console.log(credentials.id)
        await api.post("/api/order/submit", {order:{ customer_address_id: credentials.id}}).then(res => {
          alert(`Order Success`)
        }).catch((res) => {
          console.log(res.response)
        })
    },

    async getAll({ commit }) {
        
        await api.get(`/api/orders`).then((res) => {
            console.log(res.data)
            commit("getAll", res.data.orders);
            // commit("getOrderItem", res.data.orders);
            // commit("getTotal", res.data.total);
            // commit("getTotalItems", res.data.total_quantity);

            // console.log(res.data.orders)

            // commit("getPages", res.data.meta.pages);
            // commit("getPage", credentials.page);


        });
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
    //namespaced giup dispath den store nao
    state,
    getters,
    mutations,
    actions
}