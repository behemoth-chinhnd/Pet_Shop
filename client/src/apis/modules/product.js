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
  },
  getItemSaler(id) {
    return API.get(`/api/user/show_product?product_id=${id}`)
  },
  editItemSaler(credentials) {
    return API.put(`/api/products/${credentials.product.id}`, credentials)
  }
}