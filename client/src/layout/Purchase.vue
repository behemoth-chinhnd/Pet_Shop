<template>
  <div id="client">
    <header-purchase></header-purchase>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderPurchase from "@/components/client/purchase/_headerPurchase.vue";
export default {
  components: {
    headerPurchase: HeaderPurchase,
  },
  methods: {
    
  },
  computed: {},
};
</script>

<style scoped>
  
</style>
