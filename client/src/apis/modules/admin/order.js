

import API from "@/apis/modules/admin/index"
import qs from "qs"

export default {
  getAllList(queryParams) {
    return API.get(`/api/admins/orders`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  getAll() {
    return API.get(`/api/admins/orders`)
  },
  
  confirmOrder(params) {
    return API.post(`/api/order/status_confirm`, params)
  },
  confirmTransport(params) {
    return API.post(`/api/order/status_transported`, params)
  },
  cancel(params) {
    return API.post(`/api/order/status_canceled`, params)
  },
  complete(params) {
    return API.post(`/api/order/status_delivered`, params)
  }
}