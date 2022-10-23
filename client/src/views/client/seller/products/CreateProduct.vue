<template>
  <create-product></create-product>
</template>
<script>
import CreateProduct from "@/components/client/seller/products/_createProduct.vue";

export default {
name: "ViewCreateProduct",
components: {
  createProduct: CreateProduct,
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
