import API from "@/apis/index"
import qs from "qs"

export default {
  create(input) {
    return API.post("/api/products", input)
  },
  getAll(queryParams) {
    return API.get(`/api/products`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  getAllList(queryParams) {
    return API.get(`/api/user/list_product`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  delete(id) {
    return API.delete(`/api/products/${id}`)
  },
  getItem(id) {
    return API.get(`/api/products/${id}`)
  }
}