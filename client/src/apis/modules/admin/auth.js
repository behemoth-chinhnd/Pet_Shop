import API_ADMIN from "@/apis/modules/admin/index"

export default {
    login(credentials) {
        return API_ADMIN.post("/api/auths/admin_login", {
            email: credentials.email, password: credentials.password
        })
    }
}