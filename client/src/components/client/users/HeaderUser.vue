<template>
  <div id="header-user">
    <div class="header-layout">
      <div class="container ">
        <div class="flex">
          <ul class="flex">
            <li>
              <router-link to="/">
                Home
              </router-link>
            </li>
            <!-- User -->
            <li v-if="this.$route.path.includes('/user')">
              <router-link  :to="{path:'/user'}">
                User
              </router-link>
            </li>
            <li v-if="this.$route.path.includes('/user/profile')">
              <router-link to="/user/profile">
                Profile
              </router-link>
            </li>
            <!-- Cart -->
            <li v-if="this.$route.path.includes('/carts')">
              <router-link  :to="{path:'/carts'}">
                Carts
              </router-link>
            </li>
            <li v-if="this.$route.path.includes('/carts/buynow')">
              <router-link  :to="{path:'/carts/buynow'}">
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
