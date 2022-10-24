<template>
  <div class="body-saler">
    <show-cart></show-cart>
  </div>
</template>
<script>
import ShowCart from "@/components/client/cart/_showCart.vue";

export default {
  name: "ShowCart",
  components: {
    showCart: ShowCart,
  },
  data() {
    return {};
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
