import API from "@/apis/index"
import qs from "qs"

export default {
  create(credentials){
    return API.post("/api/order/submit", { order: { customer_address_id: credentials.id } })
  },
  getAll(input) {
    return API.get(`/api/orders`, input)
  },
  getAllList(input) {
    return API.get(`/api/orders?page=${input.page}&per_page=${input.per_page}`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  detail(number){
    return API.get(`/api/order_history`,number)
  }
}