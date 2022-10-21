<template>
  <div id="layout-order">
    <header-order-admin></header-order-admin>
    <router-view />
  </div>
</template>
<script>
import HeaderOrderAdmin from "@/components/admin/order/_headerOrderAdmin.vue";

export default {
  name: "Admin",
  components: {
    headerOrderAdmin: HeaderOrderAdmin,
  },
  methods: {
  },
  computed: {},
};
</script>
<style scoped>
</style>
