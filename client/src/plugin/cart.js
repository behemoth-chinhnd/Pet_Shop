import api from '@/plugin/axios'

export default {
  saleoff(a, b, c) {
    const result = ((1 - a / b) * 100).toFixed(c);
    return result;
  },
  integer(a, b) {
    const result = Math.floor((1 - a / b) * 100);
    return result;
  },
  cash(number){
    const result = Intl.NumberFormat().format(number)
    return result;
  },

  async addCart(input) {
    await api.post("/api/cart/add_product", input).then(res => {
      const result = res.data
      console.log(`addCart`, res.data);
      return result
    }).catch((res) => {
      const result = res.responsi
      console.log(`addCart`, res.responsi);
      return result;
    })
  }
  
}
