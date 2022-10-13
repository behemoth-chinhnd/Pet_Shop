// import AuthServices from "../../apis/modules/auth";
import api from "@/plugin/axios";
import says from "@/plugin/says";
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
        errors: [],
        res: {
            is_res: null,
            status: "",
            message: ""
        },
        birthday: {
            day: "",
            month: "",
            year: ""
        }
    },
};
const getters = {
    getToken: state => state.token
};
const mutations = {
    isDay(state, value) {
        state.state.birthday.day = value;
    },
    isMonth(state, value) {
        state.state.birthday.month = value;
    },
    isYear(state, value) {
        state.state.birthday.year = value;
    },
    isRes(state, value) {
        state.state.res.is_res = value;
    },
    resStatus(state, value) {
        state.state.res.status = value;
    },
    resMessage(state, value) {
        state.state.res.message = value;
    },
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
                console.log(`Login Success`)
                setTimeout(() =>
                    window.location.href = "/user/account/profile", 2000)
            } else {
                commit("setActive", false);
            }
        }).catch((res) => {
            if (res.response) {
                commit("setToken", "");
                commit("setActive", false);
                console.log(`Login Failed`)
                localStorage.removeItem("vuex");
            }
        })
    },

    async profile({ commit }) {
        await api.get("/api/user"
        ).then(res => {
            console.log(res.data)
            commit("setProfile", res.data);
            commit("isYear", Number(res.data.birthday.slice(0, 4)));
            commit("isMonth", Number(res.data.birthday.slice(5, 7)));
            commit("isDay", Number(res.data.birthday.slice(8, 10)));

        }).catch((res) => {
            if (res.response) {
                commit("setToken", "");
                commit("setActive", false);
                commit("setProfile", "");
            }
        })
    },



    async update({ commit, dispatch }, input) {
        console.log(input)
        await api.put("/api/user", input
        ).then(res => {
            dispatch('profile')
            console.log(res)
            commit("setProfile", res.data);
            commit("isRes", true);
            commit("resStatus", "success");
            commit("resMessage", "Update Profile Successful!");


        }).catch((res) => {
            console.log(res.response.data)
            commit("isRes", false);
            commit("resStatus", "error");
            commit("resMessage", "Update Profile Failed!");
        })
    },

    async updateAvatar({ commit, dispatch}, credentials) {
        console.log(`Input updateAvatar`, credentials)
        console.log(`File`, credentials.file)


      
            await api.post(`/api/uploads/upload`, credentials.file, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                console.log(`Upload File`, res.data)
                const avatar_key = res.data.key
                const input = {
                    avatar_key: avatar_key,
                    // user: {
                    password: "12345678",
                    name: credentials.data.name,
                    sex_id: credentials.data.sex_id,
                    birthday: credentials.data.birthday,

                    // }

                }
                api.put(`/api/user`, input).then(res => {
                    console.log(`res Update`, res.data)
                    dispatch('profile')
                    console.log(res)
                    commit("setProfile", res.data);
                    commit("isRes", true);
                    commit("resStatus", "success");
                    commit("resMessage", "Update Avatar Successful!");
                }).catch((res) => {
                    commit("isRes", false);
                    commit("resStatus", "error");
                    commit("resMessage", "Update Avatar Failed!");
                })
            });
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