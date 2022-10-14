import API from "@/apis/index"

export default {
    login(credentials) {
        return API.post("/api/auths/user_login", {
            email: credentials.email, password: credentials.password
        })
    },
    register() {
        return API.post("/api/users");
    },
}