<template>
    <list-product></list-product>
</template>
<script>
import ListProduct from "@/components/client/saler/products/_showProduct.vue";

export default {
  name: "ViewListProduct",
  components: {
    listProduct: ListProduct,
  },
  data() {
    return {

    }
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {},
  // components: { HeaderApp },
};
</script>
<style>
table {
  border-radius: 6px;
}

table td,
table th {
  border: 1px solid #f5f5f5;
}

table th {
  background: var(--primary) !important;
  color: var(--white);
}
</style>
  