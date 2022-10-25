<template>
  <div id="list-cart-header">
    <div
      class=" card-cart "
      v-for="(post, index) in this.order_items"
      :key="index"
    >
      <div class="" v-for="(item, index) in post.orders" :key="index">
        <div
          class="product-item"
          v-for="(info, index) in item.order_items"
          :key="index"
        >
          <div class="flex-row-space-between gap-10px">
            <div class="img-cart">
              <img
                class="img"
                ref="image"
                :src="
                  info.product.image_url
                    ? info.product.image_url
                    : require('@/assets/images/plugin/no_photo.jpeg')
                "
                alt=""
              />
            </div>

            <div class="flex-1 flex-column-space-between">
              <div class="title bold break-line-1">
                {{ info.product.name }}
              </div>
              <div class="flex-row-space-between">
                <div
                  class="price-product flex-row-space-between-center flex-1 row"
                >
                  <div class="text-danger">x {{ info.quantity }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link v-if="total_items > 0" to="/carts">
      <button class="btn submit right">
        Go to Cart
      </button>
    </router-link>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const CART = createNamespacedHelpers("CART");
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  components: {},
  data() {
    return {
      order_items: [],
      params: {
        page: 1,
        per_page: 3,
        q: {},
        pages: "",
      },
    };
  },
  created() {
    this.getAll();
  },
  computed: {
    ...CART.mapState({
      total_items: (state) => state.state.total_items,
    }),
  },
  mounted() {
  },
  methods: {
    ...CART.mapActions({
      getAllCART: "getAll",
    }),
    async getAll() {
      const res = await this.getAllCART();
      this.order_items = res.data.data;
      this.infos = res.data.infos;
    },
  },
};
</script>
<style>
</style>