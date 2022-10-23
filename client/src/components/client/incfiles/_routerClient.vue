<template>
  <div id="header-site">
    <div class="header-layout">
      <div class="container">
        <div class="flex">
          <ul class="flex header-site">
            <li>
              <router-link to="/"> Home </router-link>
            </li>
            <!-- User -->
            <li v-if="this.$route.path.includes('/user')">
              <router-link :to="{ path: '/user' }"> User </router-link>
            </li>
            <li v-if="this.$route.path.includes('/user/account')">
              <router-link to="/user/account"> Account </router-link>
            </li>
            <li v-if="this.$route.path.includes('/user/account/profile')">
              <router-link to="/user/account/profile"> Profile </router-link>
            </li>
            <!-- change info User -->
            <li v-if="this.$route.path.includes('/user/account/change_email')">
              <router-link :to="{ path: '/user/account/change_email' }">
                Change Email
              </router-link>
            </li>
            <li v-if="this.$route.path.includes('/user/account/change_phone')">
              <router-link :to="{ path: '/user/account/change_phone' }">
                Change Phone
              </router-link>
            </li>
            <li
              v-if="this.$route.path.includes('/user/account/change_password')"
            >
              <router-link :to="{ path: '/user/account/change_password' }">
                Change Password
              </router-link>
            </li>

            <!-- User Address Order-->
            <li v-if="this.$route.path.includes('/user/account/address_order')">
              <router-link :to="{ path: '/user/account/address_order' }">
                Address
              </router-link>
            </li>
            <li
              v-if="
                this.$route.path.includes('/user/account/address_order/edit')
              "
            >
              <router-link :to="{ path: '' }"> Edit </router-link>
            </li>
            <li
              v-if="
                this.$route.path.includes('/user/account/address_order/create')
              "
            >
              <router-link :to="{ path: '/user/account/address_order/create' }">
                Create
              </router-link>
            </li>
            <li v-if="this.$route.path.includes('/user/purchase')">
              <router-link to="/user/purchase"> Purchase </router-link>
            </li>

            <!-- product -->
            <li v-if="this.$route.path.includes('/products')">
              <router-link :to="{ path: '/products' }"> Products </router-link>
            </li>
            <li v-if="this.$route.path.includes('/products/detail/')">
              <router-link to="">
                {{ this.$store.state.PROD.state.name_detail }}
              </router-link>
            </li>
            <!-- Cart -->
            <li v-if="this.$route.path.includes('/carts')">
              <router-link :to="{ path: '/carts' }"> Carts </router-link>
            </li>
            <li v-if="this.$route.path.includes('/carts/buynow')">
              <router-link :to="{ path: '/carts/buynow' }">
                Buy Now
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import HeaderUser from "@/components/client/users/HeaderUser.vue";
export default {
  components: {
    // headerUser: HeaderUser,
  },
  methods: {
    toggle() {
      document.getElementsByClassName("sold").classList.toggle("hide");
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>
