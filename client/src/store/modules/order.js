
import api from "@/plugin/axios";
import qs from "qs"

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
        await api.post("/api/order/submit", {order:{ customer_address_id: credentials.id}}).then(res => {
            console.log(`Order All Cart (create)`, res)
        }).catch((res) => {
          console.log(res.response)
        })
    },

    async buyNow({ commit,rootState, }, credentials){
        const input = {
            order: {
              products_data: [credentials],
              customer_address_id: rootState.ADDR.state.is_default.id
            }
          }
        console.log(credentials)
        await api.post("/api/order", input).then(res => {
            console.log(`Order buyNow)`, res)
        }).catch((res) => {
            console.log(res.response)
          })
    },

    async getAll({ commit }, input) {
        const queryParams = {
            q: {
                number_cont: '',
            },
        }
        await api.get(`/api/orders?page=${input.page}&per_page=${input.per_page}`, {params: queryParams, paramsSerializer: params => {
            return qs.stringify(params)
          }}).then((res) => {
            commit("getAll", res.data.orders);
            commit("getPages", res.data.meta.pages);
            commit("getPage", input.page);
            console.log(`getAll Order`,res.data);
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