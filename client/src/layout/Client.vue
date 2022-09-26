<template>
  <div id="client">
    <header-client></header-client>
    <router-view></router-view>
    <!-- <menu-app></menu-app> -->
  </div>
</template>
<script>
import HeaderClient from "@/components/client/HeaderClient.vue";

// import "@/assets/css/";
// import MenuApp from "@/components/incfiles/MenuApp.vue";

export default {
  // name: "App",
  components: {
    headerClient: HeaderClient,
    // menuApp: MenuApp,
    // clientApp: ClientApp,
  },
  methods: {
    toggle() {
      document.getElementsByClassName("sold").classList.toggle("hide");
    },
  },
  computed: {},
};
</script>

<style scoped></style>
