// import AuthServices from "../../apis/modules/auth";yy
import Api from "../../apis";

const state = {
    state: {
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
};
const actions = {
    async login({ commit }, credentials) {
        Api().post("/api/auths/user_login", {
            email: credentials.email, password: credentials.password
        }).then(res => {
            if (res.data) {
                commit("setToken", res.data);

                localStorage.setItem("token", res.data);
                con
            } else {
                console.log(`Login Failed`)
            }
        }).catch((res) => {
            if (res.response) {
                console.log(res.response)
            }
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