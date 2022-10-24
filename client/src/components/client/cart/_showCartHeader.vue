<template>
  <div id="list-cart-header">
    <div v-for="(cart, index) in carts" :key="index" class="cart-item">
      <div class="flex-row-space-between-center gap-10px">
        <div class="image-cart-header">
          <img
            class="img"
            ref="image"
            :src="
              cart.product.image_url
                ? cart.product.image_url
                : require('@/assets/images/plugin/no_photo.jpeg')
            "
            alt=""
          />
        </div>
        <div class="flex-1 flex-row-space-between-center break-line-2 gap-10px">
          {{ cart.product.name }}
          <p class="total-cash">{{ format_number(cart.product.master_sales_price) }}đ</p>
        </div>
      </div>
    </div>
    <router-link
      v-if="this.$store.state.CART.state.total_items > 0"
      to="/carts"
    >
      <button class="btn submit right">Go to Cart [{{this.total_items}}]</button>
    </router-link>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {mapActions, mapState} = createNamespacedHelpers("CART");
import mixins from "@/mixins/index"

export default {
  mixins:[mixins],
  components: {},
  data() {
    return {
      carts: [],
    };
  },
  created() {
    this.getCarts();
  },
  computed: {
    ...mapState({
      total_items: (state) => state.state.total_items,
    }),
    isRun() {
      this.carts = this.$store.state.CART.state.order_items;
      return (this.carts = this.$store.state.CART.state.order_items);
    },
  },
  mounted() {
    console.log(`map`,this.total_items);
  },
  methods: {
    async getCarts() {
      await this.$store.dispatch("CART/getAll").then(() => {
        this.carts = this.$store.state.CART.state.order_items;
      });
    },
  },
};
</script>
<style>
</style>