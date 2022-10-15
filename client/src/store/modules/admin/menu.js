
import api from "@/plugin/axios";
import qs from "qs"

const state = {
    state: {
        menu_left:true,
    }

};
const getters = {
};
const mutations = {
    setMenuLeft(state, value) {
        state.state.menu_left = value;
    },


};
const actions = {
    async getMenuLeft({state}) {
        return state.state.menu_left
    },
    
    async menuLeft({ commit, state }) {
       commit('setMenuLeft', !state.state.menu_left)
       return state.state.menu_left
    },
    
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}