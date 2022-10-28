<template>
  <div id="header-site">
    <div class="header-layout">
      <div class="container">
        <div class="flex">
          <ul class="flex header-site break-line-1">
            <li v-for="(item, index) in routers" :key="index">
              <router-link
                v-if="$route.path.includes(item.case)"
                :to="{ path: item.link }"
                :class="{ active: item.name == 'Search' }"
              >
                {{ setName(item) }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const PROD = createNamespacedHelpers("PROD");
export default {
  components: {},
  computed: {
    ...PROD.mapState({
      name_product: (state) => state.state.name_detail,
    }),
  },
  created() {},
  data() {
    return {
      is_active: false,
      routers: [
        {
          name: "Home",
          link: "/",
          case: "/",
        },
        {
          name: "Search",
          link: "",
          case: "/search",
        },
        {
          name: "User",
          link: "/user",
          case: "/user",
        },
        {
          name: "Account",
          link: "/user/account",
          case: "/user/account",
        },
        {
          name: "Profile",
          link: "/user/account/profile",
          case: "/user/account/profile",
        },
        {
          name: "Change Email",
          link: "/user/account/change_email",
          case: "/user/account/change_email",
        },
        {
          name: "Change Phone",
          link: "/user/account/change_phone",
          case: "/user/account/change_phone",
        },
        {
          name: "Change Password",
          link: "/user/account/change_password",
          case: "/user/account/change_password",
        },
        {
          name: "Address",
          link: "/user/account/address_order",
          case: "/user/account/address_order",
        },
        {
          name: "Create",
          link: "/user/account/address_order/create",
          case: "/user/account/address_order/create",
        },
        {
          name: "Edit",
          link: "",
          case: "/user/account/address_order/edit",
        },
        {
          name: "Purchase",
          link: "/user/purchase",
          case: "/user/purchase",
        },
        {
          name: "Wait Comfirm",
          link: "/user/purchase/wait_comfirm",
          case: "/user/purchase/wait_comfirm",
        },
        {
          name: "Wait Goods",
          link: "/user/purchase/wait_goods",
          case: "/user/purchase/wait_goods",
        },
        {
          name: "Delivering",
          link: "/user/purchase/delivering",
          case: "/user/purchase/delivering",
        },
        {
          name: "Delivered",
          link: "/user/purchase/delivered",
          case: "/user/purchase/delivered",
        },
        {
          name: "Cancelled",
          link: "/user/purchase/cancelled",
          case: "/user/purchase/cancelled",
        },
        {
          name: "Products",
          link: "/products",
          case: "/products",
        },
        {
          name: "nameProduct",
          link: "",
          case: "/products/detail",
        },
        {
          name: "Carts",
          link: "/carts",
          case: "/carts",
        },
        {
          name: "Buy Now",
          link: "/carts/buynow",
          case: "/carts/buynow",
        },
      ],
    };
  },
  methods: {
    setName(item) {
      if (item.name === "nameProduct") {
        return this.name_product;
      } else {
        return item.name;
      }
    },
  },
};
</script>
<style scoped>
</style>
