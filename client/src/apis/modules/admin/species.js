

import API from "@/apis/index"
import qs from "qs"

export default {
  create(input) {
    return API.post("/api/admins/species", input)
  },
  getAllList(queryParams) {
    return API.get(`/api/admins/species`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  getItem(id) {
    return API.get(`/api/admins/species/${id}`)
  },
  edit(credentials) {
    return API.put(`/api/admins/species/${credentials.species.id}`, credentials)
  },
  delete(id) {
    return API.delete(`/api/admins/species/${id}`)
  },
}