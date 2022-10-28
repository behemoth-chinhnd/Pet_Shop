
export default {
  errors(check) {
    console.log(`check`, check)
    const res = {
      errors: [],
      alert: []
    };
      res.errors = check.response.data
      res.alert.status = "error"
      res.alert.message = "Failed"
      res.alert.text = check.response.data.message
    return res;
  },
  success(check) {
    console.log(`check`, check)
    const res = {
      alert: []
    };
    res.alert.status = "success"
    res.alert.message = "Successful"
    res.alert.text = ""
    return res;
  }
}