import API from "@/apis/index"
import qs from "qs"

export default {
  addCart(input) {
    return API.post(`/api/cart/add_product`,input)
  },
  getAll() {
    return API.get(`/api/cart`)
  },
  remove(credentials) {
    return API.post(`/api/cart/remove_product`, credentials)
  }
}