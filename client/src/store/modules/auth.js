// import AuthServices from "../../apis/modules/auth";yy
// import Api from "../../apis";
import api from "@/plugin/axios";
import store from "../store";
// import header from "@/plugin/axios";


const state = {
    state: {
        user: [],
        isActive: false,
        userToken: ""
    },
};
const getters = {
    getToken: state => state.token
};
const mutations = {
    setToken(state, value) {
        state.state.userToken = value;
    },
    setProfile(state, value) {
        state.state.user = value;
    },
    setActive(state, value) {
        state.state.isActive = value;
    },
};
const actions = {

    async login({ commit, dispatch }, credentials) {
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
            console.log(res)
            commit("setProfile", res.data);
        }).catch((res) => {
            if (res.response) {
                console.log(res.response.data.message)
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