<template>
  <div id="index">
    <ListProduct></ListProduct>
    <main id="main" class="">
    </main>
  </div>
</template>

<script>
import ListProduct from "@/components/product/_showProduct.vue";

export default {
  components: {
    ListProduct
  },
  data() {
    return {
      isOn: false,
      isOff: true,
    };
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style></style>
