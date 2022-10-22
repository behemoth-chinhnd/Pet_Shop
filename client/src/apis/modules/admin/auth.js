import API_ADMIN from "@/apis/modules/admin/index"
import API from "@/apis/index"

export default {
  login(credentials) {
    return API_ADMIN.post("/api/auths/admin_login", {
      email: credentials.email, password: credentials.password
    })
  },
  // ?page=${credentials.page}&per_page=${credentials.per_page}&q=${credentials.q}
  getAllUser(queryParams) {
    return API.get(`/api/users`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  }
}