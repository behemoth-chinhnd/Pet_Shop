import API from "@/apis/index"

export default {
  register(credentials) {
    return API.post("/api/user", credentials);
  },
  login(credentials) {
    return API.post("/api/auths/user_login", {
      email: credentials.email, password: credentials.password
    })
  },
  logout(){
    return API.post("/api/auths/logout")
  },
  profile() {
    return API.get("/api/user")
  },
  update(credentials) {
    return API.put("/api/user", credentials)
  },
  changeEmail(credentials) {
    return API.post("/api/user/change_email", credentials);
  },
  changePhone(credentials) {
    return API.post("/api/user/change_phone", credentials);
  },
  changePassword(credentials) {
    return API.post("/api/user/change_password", credentials);
  },
}