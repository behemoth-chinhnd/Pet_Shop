

import API from "@/apis/modules/admin/index"
import qs from "qs"

export default {
  create(input) {
    return API.post("/api/admins/trademarks", input)
  },
  getAll() {
    return API.get(`/api/admins/trademarks`)
  },
  getAllList(queryParams) {
    return API.get(`/api/admins/trademarks`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  getItem(id) {
    return API.get(`/api/admins/trademarks/${id}`)
  },
  edit(credentials) {
    return API.put(`/api/admins/trademarks/${credentials.trademark.id}`, credentials)
  },
  delete(id) {
    return API.delete(`/api/admins/trademarks/${id}`)
  },
}