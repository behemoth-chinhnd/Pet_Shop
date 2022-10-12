<template>
  <div id="header-purchase">
    <div class="header-layout">
      <div class="container">
        <div class=" scroll-x">
          <ul class="flex-row-space-between-center purchase width-700px ">
            <li :class="{active: (this.$route.path === '/user/purchase' )}">
              <router-link class="purchase-item" to="/user/purchase"> All </router-link>
            </li>
            <li>
              <router-link class="purchase-item" to="/user/purchase/wait-comfirm"> Wait Comfirm </router-link>
            </li>
            <li>
              <router-link class="purchase-item" to="/user/purchsae/wait-goods"> Wait Goods </router-link>
            </li>
            <li>
              <router-link class="purchase-item" to="/user/purchase/delivering"> Delivering </router-link>
            </li>
             <li>
              <router-link class="purchase-item" to="/user/purchase/delivered"> Delivered</router-link>
            </li>
            <li>
              <router-link class="purchase-item" to="/user/purchase/cancelled"> Cancelled </router-link>
            </li>           
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  methods: {
  },
  computed: {},
};
</script>

<style scoped>
</style>
