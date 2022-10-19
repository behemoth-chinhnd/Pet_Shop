<template>
  <edit-product></edit-product>
</template>
<script>
import EditProduct from "@/components/client/saler/products/_editProduct.vue";

export default {
name: "ViewEditProduct",
components: {
  editProduct: EditProduct,
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
