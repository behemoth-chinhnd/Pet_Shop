<template>
  <div id="client">
    <header-client></header-client>
    <router-view></router-view>
    <footer-client></footer-client>
  </div>
</template>
<script>
import HeaderClient from "@/components/client/HeaderClient.vue";
import FooterClient from "@/components/client/FooterClient.vue";

export default {
  components: {
    headerClient: HeaderClient,
    footerClient: FooterClient,

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
