// import AuthServices from "../../apis/modules/auth";
import api from "@/plugin/axios";
import store from "../store";


const state = {
    state: {
        user: [],
        isActive: false,
        userToken: "",
        users: [],
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
    getToken: state => state.token
};
const mutations = {
    setErrors(state, value) {
        state.state.errors = value;
    },
    isError(state, value) {
        state.state.isErr = value;
    },
    setToken(state, value) {
        state.state.userToken = value;
    },
    setProfile(state, value) {
        state.state.user = value;
    },
    setActive(state, value) {
        state.state.isActive = value;
    },
    getAllUser(state, value) {
        state.state.users = value;
    },
    getPages(state, value) {
        state.state.params.pages = value;
    },
};
const actions = {
    async register({ commit }, credentials) {
        await api.post("/api/user", credentials).then(res => {
            if (res) {
                commit("isError", false);
                commit("setErrors", "");
                window.location.href = "/login";
            }
        }).catch((res) => {
            commit("isError", true);
            commit("setErrors", res.response.data);
        })
    },

    async login({ commit, dispatch }, credentials) {
        // console.log(fauth.login)
        await api.post("/api/auths/user_login", {
            email: credentials.email, password: credentials.password
        }).then(res => {
            if (res.data) {
                commit("setToken", res.data);
                commit("setActive", true);
                dispatch('profile');
                setTimeout(() => window.location.href = "/profile", 200)
            } else {
                commit("setActive", false);
                console.log(`Login Failed`)
            }
        }).catch((res) => {
            if (res.response) {
                commit("setToken", "");
                commit("setActive", false);
                localStorage.removeItem("vuex");
            }
        })
    },

    async profile({ commit }) {
        await api.get("/api/user"
        ).then(res => {
            commit("setProfile", res.data);
        }).catch((res) => {
            if (res.response) {
                commit("setToken", "");
                commit("setActive", false);
                commit("setProfile", "");
            }
        })
    },

    logout({ commit }) {
        commit("setToken", "");
        commit("setActive", false);
        localStorage.removeItem("vuex");
        window.location.href = "/login";


    },
    async getAllUser({ commit }, credentials) {
        await api.get(`/api/users?page=${credentials.page}&per_page=${credentials.per_page}&q=${credentials.q}`).then((res) => {
            commit("getAllUser", res.data.users);
            commit("getPages", res.data.meta.pages);
        });
    }
}
export default {
    namespaced: true,
    //namespaced giup dispath den store nao
    state,
    getters,
    mutations,
    actions
}