export default {
  mounted() {
  },
  computed:{

  },
  methods: {
    saleoff(product) {
      const result = ((1 - product.master_sales_price / product.master_list_price) * 100).toFixed(0);
      return result;
    },
    format_number(number){
        const result = Intl.NumberFormat().format(number)
        return result;
    }
  }
}