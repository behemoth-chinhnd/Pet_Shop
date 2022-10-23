import API from "@/apis/index"

export default {
  update(credentials) {
    return API.post("/api/user/change_name_store", credentials)
  },
}