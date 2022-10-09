
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
        total_quantity:"",
        params: {
            page: 1,
            per_page: 3,
            q: {},
            pages: 1
        },
        isErr: false,
        errors: [],
        res: {
            is_res: null,
            status:"",
            message:"",
            text:""
        },
    },
};
const getters = {
};
const mutations = {
    isRes(state, value) {
        state.state.res.is_res = value;
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
    getTotalQuantity(state, value) {
        state.state.total_quantity = value;
    },
    getAll(state, value) {
        state.state.carts = value;
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

    async getAll({ commit }) {
        
        await api.get(`/api/cart`).then((res) => {
            console.log(res)
            commit("getAll", res.data.products);
            commit("getOrderItem", res.data.order_items);
            commit("getTotal", res.data.total);
            commit("getTotalQuantity", res.data.total_quantity);
            commit("getTotalItems", res.data.total_items);

            console.log(res.data)

            // commit("getPages", res.data.meta.pages);
            // commit("getPage", credentials.page);


        });
    },
    async getItem({ commit }, credentials) {
      await api.get(`/api/products/${credentials}`).then(res => {
          console.log(state.state)
          commit("getItem", res.data);
      }).catch((res) => {
          alert(res.response.data)
      })
  },
//   async getTotalItems({ commit }, credentials) {
   
//         commit("getTotalItems", credentials);
  
// },
    async buyItem({ commit }, credentials) {
        // await api.get(`/api/products/${credentials}`).then(res => {
            // console.log(res.data)
           await commit("postProductsData", credentials);
           await commit("postCustomerAddressId", 7);
           await commit("postAddressAttribute", null );

           

        //    await commit("customer_address_id", credentials.customer_address_id);

            console.log(`func buyItem`)
            console.log(state.state.order.products_data)

            // commit("getItem", res.data);
        // }).catch((res) => {
            // alert(res.response.data)
        // })
    },
    async addCart({ commit, state }, quantity) {
        const input = {
            product_id: state.state.product.id,
            quantity: quantity
        }
        console.log(input);
        await api.post("/api/cart/add_product", input).then(res => {
            console.log(res)
            commit("getOrderItem", res.data.order_items);
            commit("getTotal", res.data.total);
            commit("getTotalQuantity", res.data.total_quantity);
            commit("getTotalItems", res.data.total_items);
            commit("isRes", true);
            commit("resStatus", "success");
            commit("resMessage", "Add to Cart: Success");
            commit("resText", "See details in Cart!");

        }).catch((res) => {
            console.log(res.response)
            commit("isRes", false);
            commit("resStatus", "error");
            commit("resMessage", "Add to Cart: Failed!");
            commit("resText", "Product quantity is not enough or sold out!");

        })
    
    },
    async nextCart({ commit, state }, order_item) {
        const input = {
            product_id: order_item.product.id,
            quantity: 1
        }
        console.log(input);
        await api.post("/api/cart/add_product", input).then(res => {
            console.log(res)
        }).catch((res) => {
            console.log(res.response.data)
        })
    },
    async prevCart({ commit, state }, order_item) {
        const input = {
            product_id: order_item.product.id,
            quantity: -1
        }
        console.log(input);
        await api.post("/api/cart/add_product", input).then(res => {
            console.log(res)
        }).catch((res) => {
            console.log(res.response.data)
        })
    },
    async edit({ commit }, credentials) {
        await api.put(`/api/products/${credentials.id}`, credentials).then(res => {
            commit("getItem", res.data);
            console.log(res.data)
            alert(`Đã Edit Thành Công`)

        }).catch((res) => {
            alert(res.response.data)
        })
    },
    async delete({ commit, dispatch }, credentials) {
        await api.post(`/api/cart/remove_product`,credentials).then(res => {
            dispatch('getAllDelete')
        }).catch((res) => {
            alert(res)
        })
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