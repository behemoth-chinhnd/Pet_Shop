
import api from "@/plugin/axios";
import api_cart from "@/apis/modules/cart"

const state = {
  state: {
    cart: [],
    carts: [],
    product: [],
    buy_now: {},
    order: {
      products_data: [],
      customer_address_id: "",
      address_attribute: ""
    },
    order_items: [],
    total: "",
    total_items: "",
    total_quantity: "",
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
      message: "",
      text: ""
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
  postBuyNow(state, value) {
    state.state.buy_now = value;
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
      commit("getAll", res.data.products);
      commit("getOrderItem", res.data.order_items);
      commit("getTotal", res.data.total);
      commit("getTotalQuantity", res.data.total_quantity);
      commit("getTotalItems", res.data.total_items);
      // commit("getPages", res.data.meta.pages);
      // commit("getPage", credentials.page);
      console.log(`getAllCart`, res.data)
    });
  },
  async getItem({ commit }, credentials) {
    await api.get(`/api/products/${credentials}`).then(res => {
      commit("getItem", res.data);
      console.log(`getProduct`, res.data)
    }).catch((res) => {
      console.log(`getProduct Failed`, res.response.data)
    })
  },
  async buyItem({ commit }, credentials) {

    commit("postBuyNow", credentials)

    // await api.get(`/api/products/${credentials.product_id}`).then(res => {
    //   commit("postProductsData", credentials);
    //   commit("postCustomerAddressId", 7);
    //   commit("postAddressAttribute", null);
    //   console.log(`buyNow`, res.data);
    // })
    console.log(`buyNow`, credentials);

  },

  async deleteBuyNow({ commit, dispatch }, credentials) {
    commit("postBuyNow", "")
    dispatch('delete', credentials)
    console.log(`deleteBuyNow`, credentials);

  },
  
  async addCart({ commit, state }, credentials) {
    try {
      const res = await api_cart.addCart(credentials)
      commit("getTotalItems", res.data.total_items);
      commit("resStatus", "success");
      commit("resMessage", "Add to Cart: Success");
      commit("resText", "See details List product in Cart!");
    } catch {
      commit("resStatus", "error");
      commit("resMessage", "Add to Cart: Failed!");
      commit("resText", "Product quantity is not enough or sold out!");
    }
    return state.state.res
  },

  async nextCart({ commit }, order_item) {
    const input = {
      product_id: order_item.product.id,
      quantity: 1
    }
    cart.addCart(input)
    // await api.post("/api/cart/add_product", input).then(res => {
    //   console.log(`nextCart`, res.data);
    // }).catch((res) => {
    //   console.log(`nextCartFailed`, res.response);
    // })
  },
  async prevCart({ commit }, order_item) {
    const input = {
      product_id: order_item.product.id,
      quantity: -1
    }
    await api.post("/api/cart/add_product", input).then(res => {
      console.log(`prevCart`, res.data);
    }).catch((res) => {
      console.log(`prevCartFailed`, res.response);
    })
  },
  async delete({ commit, dispatch }, credentials) {
    await api.post(`/api/cart/remove_product`, credentials).then(res => {
      console.log(`deleteCart`, res.data);

      // dispatch('getAllDelete')
    }).catch((res) => {
      alert(res)
    })
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}