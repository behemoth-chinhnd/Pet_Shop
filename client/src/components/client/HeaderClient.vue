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
              <div class="login-header-mobile">
                  <login-header></login-header>
                </div>
              <button class="menu-toggle">
                <i class="fa fa-bars"></i>
              </button>
            </div>
            <div class="form-input-search mg-tb-20px">
              <input type="text" class="input-search" placeholder="Search" />
              <i class="icon-search fa fa-search"></i>
            </div>
            <div class="login-header">
              <login-header></login-header>
            </div>
          </div>
        </div>
      </section>
      <header-user></header-user>
    </header>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsAUTH = createNamespacedHelpers("AUTH");
const mapActionsCART = createNamespacedHelpers("CART");
import ListCartHeader from "@/components/client/cart/_showCartHeader.vue";
import EmptyCartHeader from "@/components/client/cart/_emptyCartHeader.vue";
import SliderBanner from "@/components/incfiles/_sliderBanner.vue";
import LoginHeader from "@/components/incfiles/_loginHeader.vue";
import HeaderUser from "@/components/client/users/HeaderUser.vue";
export default {
  components: {
    listCartHeader: ListCartHeader,
    emptyCartHeader: EmptyCartHeader,
    sliderBanner: SliderBanner,
    loginHeader: LoginHeader,
    headerUser: HeaderUser,

  },
  data() {
    return {
      isCarts: false,
      total_items: "",
      order_items: [],
      carts: "",
    };
  },
  created() {
    this.profile();
    this.getCarts();
  },
  computed: {
    isRun() {
      this.order_items = this.$store.state.CART.state.order_items;
      return (this.order_items = this.$store.state.CART.state.order_items);
    },
  },
  mounted() {},
  methods: {
    ...mapActionsAUTH.mapActions(["logout"]),
    ...mapActionsAUTH.mapActions({ getProfile: "profile" }),
    ...mapActionsCART.mapActions({ getAllCart: "getAll" }),

    async profile() {
      if (this.$store.state.AUTH.state.isActive) {
        await this.getProfile();
      }
    },
    async getCarts() {
      if (this.$store.state.AUTH.state.isActive) {
        await this.getAllCart().then(() => {
          this.order_items = this.$store.state.CART.state.order_items;
          this.total = this.$store.state.CART.state.total;
          this.total_items = this.$store.state.CART.state.total_items;
          this.carts = this.$store.state.CART.state.carts;
          console.log(this.order_items);
        });
      }
    },
  },
};
</script>

<style scoped>
#header-client #header-bottom {
  background: #ffe2e5;
}

#header-client .warning {
  background: #ffc220;
}

#header-client .primary {
  background: #3699ff;
}

#header-client .gap-10px {
  gap: 10px;
}
</style>
