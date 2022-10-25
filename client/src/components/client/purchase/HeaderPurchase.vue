<template>
  <div id="header-purchase">
    <div class="header-layout">
      <div class="container">
        <div class="scroll-x">
          <ul class="flex-row-space-between-center purchase width-700px">
            <li @click="nextParams(1,'text-warning')">
              <router-link
                class="purchase-item"
                to="/user/purchase/wait_comfirm"
                >Wait Comfirm
              </router-link>
            </li>
            <li @click="nextParams(2,'text-warning')">
              <router-link class="purchase-item" to="/user/purchase/wait_goods">
                Wait Goods
              </router-link>
            </li>
            <li @click="nextParams(3,'text-warning')">
              <router-link class="purchase-item" to="/user/purchase/delivering">
                Delivering
              </router-link>
            </li>
            <li @click="nextParams(4,'text-success')">
              <router-link class="purchase-item" to="/user/purchase/delivered">
                Delivered
              </router-link>
            </li>
            <li @click="nextParams(5,'text-danger')">
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
    async nextParams(ID, color) {
      console.log(ID, color);
      await this.$emit("next", ID, color );
    },
  },
  computed: {},
};
</script>
<style scoped>
</style>
