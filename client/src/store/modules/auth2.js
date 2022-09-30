
import AuthServices from "../../apis/modules/auth";


const state = {
    state: {
        userToken: "ooooo"
    },
};
const getters = {
    getToken: state => state.token

};
const mutations = {
    
    setToken(state, value) {
        console.log(state.state.userToken);
        state.state.userToken = value;
      },
};
const actions = {

    async login({ commit }, credentials) {
        commit("setToken", localStorage.getItem("token"));

        try {
            const response = await AuthServices.login(credentials)
            // console.log(response)
            // AuthServeices.login()
        } catch (error) {
            // console.log(error.response.data.message)
        }
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