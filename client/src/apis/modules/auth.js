import Api from "../../apis";

export default {
    login(credentials) {
        return Api().post("/api/auths/user_login", {
            email: credentials.email, password: credentials.password
        }).then(res => {
            if (res.data) {
                console.log(res.data)
                commit("setToken", res.data);

                localStorage.setItem("token", res.data);
                con
            } else {
                console.log(`Login Failed`)
            }
        }).catch((res) => {
            if (res.response.data) {
                console.log(res.response.data.message)
            }
        })
    },
    register() {
        return Api().post("/api/users");
    },
}