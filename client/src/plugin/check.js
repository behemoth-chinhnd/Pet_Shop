
export default {
  errors(check) {
    console.log(`check`, check)
    const res = {
      errors: [],
      alert: []
    };
    if (check.response.request.satus = 422) {
      res.errors = check.response.data
      res.alert.status = "error"
      res.alert.message = "Failed"
    } else if (check.response.request.satus = 401) {
      res.alert.status = "error"
      res.alert.message = "Failed"
    }
    return res;
  },
  success(check) {
    console.log(`check`, check)
    const res = {
      alert: []
    };
    res.alert.status = "success"
    res.alert.message = "Successfull"
    return res;
  }
}