
import api from "@/plugin/axios";
import qs from "qs"

const state = {
    state: {
        product: [],
        products: [],
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
    getAll(state, value) {
        state.state.products = value;
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

    async getAll({ commit }, credentials) {
        console.log(credentials)
        const queryParams = {
            // page: credentials.page,
            // per_page: credentials.per_page,
            q: {
                name_cont: '',
            },
        }
         
        await api.get(`/api/products?page=${credentials.page}&per_page=${credentials.per_page}`, {params: queryParams, paramsSerializer: params => {
            return qs.stringify(params)
          }}).then((res) => {
            console.log(res.data.products)
            commit("getAll", res.data.products);
            commit("getPages", res.data.meta.pages);
            commit("getPage", credentials.page);


        });
    },
    test(){
        console.log(`test PROD`)
    },
    async getAllDelete({ commit }) {
        console.log(state)
        await api.get(`/api/products?page=${state.state.params.page}&per_page=${state.state.params.per_page}&q=${state.state.params.q}`).then((res) => {
            commit("getAll", res.data.products);
            commit("getPages", res.data.meta.pages);
            commit("getPage", res.data.meta.page);
        });
    },
    async getItem({ commit }, credentials) {
        await api.get(`/api/products/${credentials}`).then(res => {
            console.log(res.data)
            commit("getItem", res.data);
        }).catch((res) => {
            alert(res.response.data)
        })
    },
    async edit({ commit }, credentials) {
        console.log(credentials)

        await api.put(`/api/products/${credentials.id}`, credentials).then(res => {
            commit("getItem", res.data);
            console.log(res.data)
            alert(`Đã Edit Thành Công`)

        }).catch((res) => {
            alert(res.response.data)
        })
    },
    async delete({ commit, dispatch }, credentials) {
        await api.delete(`/api/products/${credentials}`).then(res => {
            console.log(credentials)
            console.log(res)
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
