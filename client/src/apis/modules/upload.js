import API from "@/apis/index"

export default {
    image(file) {
        return  API.post(`/api/uploads/upload`, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
    },
}