<template>
  <div id="client">
    <header-client></header-client>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderClient from "@/components/client/HeaderClient.vue";
export default {
  components: {
    headerClient: HeaderClient,
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
