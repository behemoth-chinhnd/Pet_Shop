<template>
  <div id="client">
    <!-- <header-saler></header-saler> -->
    <router-view></router-view>
  </div>
</template>
<script>
// import HeaderSaler from "@/components/client/saler/HeaderSaler.vue";
export default {
  components: {
    // headerSaler: HeaderSaler,
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
