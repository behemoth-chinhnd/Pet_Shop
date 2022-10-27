<template>
  <div id="header-client">
    <search-product v-if="runKeyword" :KeyWord="keyword"></search-product>
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
              <div class="form-input-search mg-tb-20px">
                <input
                  @change="searchKeyword"
                  v-model="keyword"
                  type="text"
                  class="input-search"
                  placeholder="Search"
                />
                <i class="icon-search fa fa-search"></i>
              </div>
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
const CART = createNamespacedHelpers("CART");
const PROD = createNamespacedHelpers("PROD");
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
      keyword: "",
      runKeyword: false,
      // isCarts: false,
      // total_items: "",
      order_items: [],
      carts: false,
    };
  },
  created() {},
  computed: {
    ...PROD.mapState({
      keywordSearch: (state) => state.state.keyword,
    }),
    isRun() {
      this.order_items = this.$store.state.CART.state.order_items;
      return (this.order_items = this.$store.state.CART.state.order_items);
    },
  },
  mounted() {},
  methods: {
    ...mapActionsAUTH.mapActions(["logout"]),
    ...PROD.mapActions({
      searchKeywordPROD: "searchKeyword",
    }),
    async searchKeyword() {
      // this.runKeyword = false
      // if ((this.runKeyword === false)) {
        this.runKeyword = true;
        console.log(`keywordHeader`, this.keyword);
        if(this.$route.path.includes(`/products&keyword=`)){
          this.$router.push({ path: `/products&keywords=${this.keyword}` });
        } else {
          this.$router.push({ path: `/products&keyword=${this.keyword}` });
        }
        await this.searchKeywordPROD(this.keyword);
        this.keyword = this.keywordSearch;
        this.runKeyword = false;
      // }
      // this.runKeyword = true;

    },
  },
};
</script>

<style scoped>
</style>
