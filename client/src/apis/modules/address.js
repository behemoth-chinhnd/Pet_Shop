import API from "@/apis/index"

export default {
  getIsDefault() {
        return API.get(`/api/addresses/show_default`)
    },
}