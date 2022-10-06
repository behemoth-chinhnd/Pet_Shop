
import api from "@/plugin/axios";

const state = {
    state: {
        address: [],
        addresses: [],
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
        state.state.address = value;
    },
    getAll(state, value) {
        state.state.addresses = value;
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
        await api.post("/api/addresses", credentials).then(res => {
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
        
        await api.get(`/api/addresses?page=${credentials.page}&per_page=${credentials.per_page}&q=${credentials.q}`).then((res) => {
            console.log(res.data)
            commit("getAll", res.data.addresses);
            commit("getPages", res.data.meta.pages);
            commit("getPage", credentials.page);


        });
    },
    async getAllDelete({ commit }) {
        console.log(state)
        await api.get(`/api/addresses?page=${state.state.params.page}&per_page=${state.state.params.per_page}&q=${state.state.params.q}`).then((res) => {
            commit("getAll", res.data.addresses);
            commit("getPages", res.data.meta.pages);
            commit("getPage", res.data.meta.page);
        });
    },
    async getItem({ commit }, credentials) {
        await api.get(`/api/addresses/${credentials}`).then(res => {
            console.log(res.data)
            commit("getItem", res.data);
        }).catch((res) => {
            alert(res.response.data)
        })
    },
    async edit({ commit }, credentials) {
        await api.put(`/api/addresses/${credentials.id}`, credentials).then(res => {
            commit("getItem", res.data);
            console.log(res.data)
            alert(`Đã Edit Thành Công`)
        }).catch((res) => {
            alert(res.response.data)
        })
    },
    async delete({ commit, dispatch }, credentials) {
        await api.delete(`/api/addresses/${credentials}`).then(res => {
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
    state,
    getters,
    mutations,
    actions
}