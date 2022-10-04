
import api from "@/plugin/axios";

const state = {
    state: {
        product: [],
        products: [],
        params: {
            page: 1,
            per_page: 10,
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
    getAll(state, value) {
        state.state.products = value;
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

    async getAll({ commit }, credentials) {
        await api.get(`/api/products?page=${credentials.page}&per_page=${credentials.per_page}&q=${credentials.q}`).then((res) => {
            commit("getAll", res.data.products);
            commit("getPages", res.data.meta.pages);
        });
    },
    async edit({ commit }, credentials) {
        await api.put(`/api/products/${credentials.id}`, credentials).then(res => {
            alert(`Đã Edit Thành Công`)
        }).catch((res) => {
            alert(res.response.data)
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