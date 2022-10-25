<template>
  <div id="header-purchase">
    <div class="header-layout">
      <div class="container">
        <div class="scroll-x">
          <ul class="flex-row-space-between-center purchase width-700px">
            <li :class="{ active: this.$route.path === '/user/purchase' }">
              <router-link class="purchase-item" to="/user/purchase">
                All
              </router-link>
            </li>
            <li @click="nextParams(1)">
              <router-link
                class="purchase-item"
                to="/user/purchase/wait_comfirm"
              >Wait Comfirm
              </router-link>
            </li>
            <li @click="nextParams(2)">
              <router-link class="purchase-item" to="/user/purchase/wait_goods">
                Wait Goods
              </router-link>
            </li>
            <li @click="nextParams(3)">
              <router-link class="purchase-item" to="/user/purchase/delivering">
                Delivering
              </router-link>
            </li>
            <li @click="nextParams(4)">
              <router-link class="purchase-item" to="/user/purchase/delivered">
                Delivered</router-link
              >
            </li>
            <li @click="nextParams(5)">
              <router-link class="purchase-item" to="/user/purchase/cancelled">
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
  data() {
    return {
      ID: "",
    };
  },
  methods: {
    async nextParams(ID) {
      console.log(ID);
      await this.$emit("next", ID);
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>
