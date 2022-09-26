<template>
  <div id="app">
    <!-- <h1>{{ $store.state.count }}</h1> -->
    <!-- <ClientApp />
    <HeaderApp />
    <MenuApp /> -->
    <!-- <TestVueX2 /> -->
    <!-- <TestVueX /> -->
    <!-- {{ $st }} -->
    <!-- <MenuLeft /> -->
    <router-view />
    <!-- <FooterApp /> -->
  </div>
</template>
<script>
// import HeaderApp from "@/components/incfiles/HeaderApp.vue";
// import MenuIcon from "@/components/incfiles/MenuApp.vue";
// import MenuApp from "@/components/incfiles/MenuApp.vue";
// import TestVueX from "./components/tester/TestVueX.vue";
// import TestVueX2 from "./components/tester/TestVueX2.vue";
// import ClientApp from "./components/incfiles/ClientApp.vue";

// import MenuLeft from "@/components/incfiles/MenuLeft.vue";
// import FooterApp from "@/components/incfiles/FooterApp.vue";
// import "./assets/js/style.js";

export default {
  // name: "App",
  components: {
    // HeaderApp,
    // MenuIcon,
    // MenuApp,
    // TestVueX,
    // TestVueX2,
    // ClientApp,
  },
  methods: {
    // toggle() {
    //   document.getElementsByClassName("sold").classList.toggle("hide");
    // },
  },
};
</script>

<style>
#app {
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
}
</style>
