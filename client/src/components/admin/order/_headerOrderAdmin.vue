<template>
  <div id="header-order">
    <div class="header-layout">
      <div class="container">
        <div class="scroll-x">
          <ul class="flex-row-space-between-center purchase width-700px">
            <li :class="{ active: this.$route.path === '/admin/order' }">
              <router-link class="purchase-item" to="/admin/order">
                Wait Comfirm
              </router-link>
            </li>
            <li
              :class="{ active: this.$route.path === '/admin/order/wait-good' }"
            >
              <router-link class="purchase-item" to="/admin/order/wait-goods">
                Wait Goods
              </router-link>
            </li>
            <li
              :class="{
                active: this.$route.path === '/admin/order/delivering',
              }"
            >
              <router-link class="purchase-item" to="/admin/order/delivering">
                Delivering
              </router-link>
            </li>
            <li
              :class="{ active: this.$route.path === '/admin/order/delivered' }"
            >
              <router-link class="purchase-item" to="/admin/order/delivered">
                Delivered</router-link
              >
            </li>
            <li
              :class="{ active: this.$route.path === '/admin/order/cancelled' }"
            >
              <router-link class="purchase-item" to="/admin/order/cancelled">
                Cancelled
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {},
  computed: {},
};
</script>

<style scoped>
</style>
