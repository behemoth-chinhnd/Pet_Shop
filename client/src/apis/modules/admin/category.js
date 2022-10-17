

import API from "@/apis/modules/admin/index"
import qs from "qs"

export default {
  create(input) {
    return API.post("/api/admins/categories", input)
  },
  getAllList(queryParams) {
    return API.get(`/api/admins/categories`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  getAll() {
    return API.get(`/api/admins/categories`)
  },
  getItem(id) {
    return API.get(`/api/admins/categories/${id}`)
  },
  edit(credentials) {
    return API.put(`/api/admins/categories/${credentials.category.id}`, credentials)
  },
  delete(id) {
    return API.delete(`/api/admins/categories/${id}`)
  },
}