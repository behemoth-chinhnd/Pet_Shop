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
  }
  
}
