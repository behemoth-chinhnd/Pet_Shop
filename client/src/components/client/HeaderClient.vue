<template>
  <div id="header-client">
    <header id="header" class="">
      <section id="header-top" class="">
        <div class="container">
          <div class="list-menu-header">
            <div class="flex-row-space-between-center">
              <div class="left-item-header flex-row-space-between-center">
                <div class="logo">
                  <img src="/pet2.png" alt="" />
                </div>
              </div>
              <div class="flex-row-space-between-center gap-40px">
                <div class="login-header-mobile">
                  <login-header></login-header>
                </div>
                <button class="menu-toggle">
                  <i class="fa fa-bars"></i>
                </button>
              </div>
            </div>
            <div class="flex-row-space-between-center flex-1 gap-40px">
              <search-product></search-product>
              <div class="login-header">
                <login-header></login-header>
              </div>
            </div>
          </div>
        </div>
      </section>
      <router-client></router-client>
    </header>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsAUTH = createNamespacedHelpers("AUTH");
import SearchProduct from "@/components/product/_searchProduct.vue";
import SliderBanner from "@/components/incfiles/_sliderBanner.vue";
import LoginHeader from "@/components/incfiles/_loginHeader.vue";
import RouterClient from "@/components/client/incfiles/_routerClient.vue";
export default {
  components: {
    sliderBanner: SliderBanner,
    loginHeader: LoginHeader,
    routerClient: RouterClient,
    searchProduct: SearchProduct,
  },
  data() {
    return {
      runKeyword: false,
      order_items: [],
      carts: false,
    };
  },
  created() {},
  computed: {
    isRun() {
      this.order_items = this.$store.state.CART.state.order_items;
      return (this.order_items = this.$store.state.CART.state.order_items);
    },
  },
  mounted() {},
  methods: {
    ...mapActionsAUTH.mapActions(["logout"]),
  },
};
</script>

<style scoped>
</style>
