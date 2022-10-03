// import AuthServices from "../../apis/modules/auth";yy
import Api from "../../apis";

const state = {
    state: {
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
    setActive(state, value) {
        state.state.isActive = value;
    },
};
const actions = {
    async login({ commit }, credentials) {
        Api().post("/api/auths/user_login", {
            email: credentials.email, password: credentials.password
        }).then(res => {
            if (res.data) {
                commit("setToken", res.data);
                commit("setActive", true);
                con
            } else {
                commit("setActive", false);
                console.log(`Login Failed`)
            }
        }).catch((res) => {
            if (res.response) {
                console.log(res.response.data.message)
                commit("setToken", "");
                commit("setActive", false);
                // localStorage.removeItem("email");
                // localStorage.removeItem("token");
                // localStorage.removeItem("vuex");


            }
        })
    },

    async logout(commit) {
        commit("setToken", "");
        commit("setActive", false);
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