import API from "@/apis/index"

export default {
  login(credentials) {
    return API.post("/api/auths/user_login", {
      email: credentials.email, password: credentials.password
    })
  },
  profile() {
    return API.get("/api/user")
  },
  update(credentials) {
    return API.put("/api/user", credentials)
  },
  register(credentials) {
    return API.post("/api/user", credentials);
  },
}