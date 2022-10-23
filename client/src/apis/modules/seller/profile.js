import API from "@/apis/index"

export default {
  update(credentials) {
    return API.put("/api/user/change_name_store", credentials)
  },
}