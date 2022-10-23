import API from "@/apis/index"
import qs from "qs"

export default {
  getAll(input) {
    return API.get(`/api/orders`, input)
  },
  getAllList(input) {
    return API.get(`/api/orders?page=${input.page}&per_page=${input.per_page}`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  }

}