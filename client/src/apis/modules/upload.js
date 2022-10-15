import API from "@/apis/index"
const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
}
export default {
  image(file) {
    return API.post(`/api/uploads/upload`, file, headers)
  },
}