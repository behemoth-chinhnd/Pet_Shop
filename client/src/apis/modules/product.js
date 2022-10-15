import API from "@/apis/index"
import qs from "qs"

export default {
  getAll(queryParams) {
    return API.get(`/api/products`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  delete(id) {
    return API.delete(`/api/products/${id}`)
  }
}