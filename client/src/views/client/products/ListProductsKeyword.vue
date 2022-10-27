<template>
  <div class="body-saler">
    <list-product></list-product>

  </div>
</template>
<script>
import ListProduct from "@/components/product/_showProductSearch.vue";

export default {
name: "ListProductsKeyword",
components: {
  listProduct: ListProduct,
},
data() {
  return {}
},
beforeCreate() {},
created() {},
mounted() {},
methods: {},
watch: {},
computed: {},
};
</script>
<style>
</style>
