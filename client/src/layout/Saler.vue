<template>
  <div id="admin">
    <header-app> </header-app>

    <menu-app></menu-app>
    <router-view />
  </div>
</template>
<script>
import HeaderApp from "@/components/admin/incfiles/HeaderApp.vue";
// import RouterSaler from "../components/client/saler/incfiles/RouterSaler.vue";
import MenuApp from "@/components/admin/incfiles/MenuApp.vue";

export default {
  name: "Admin",
  components: {
    headerApp: HeaderApp,
    menuApp: MenuApp,
    // routerSaler: RouterSaler,
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
/* @import "@/assets/css/mms-style.css"; */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app a {
  text-decoration: none;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
