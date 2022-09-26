<template>
  <div id="nav" :class="{ active: isOn, on: isOn, off: isOff }">
    <section id="header-mobile">
      <header id="header-admin">
        <div class="logo-header">
          <img src="/images/logo.png" alt="" />
        </div>
        <div class="form-search flex-row-space-between hidden">
          <div class="flex-row-space-between rel">
            <i class="icon-search fa fa-search abs"></i>
            <input type="text" class="input-search" placeholder="Search" />
          </div>
          <a class="icon default" href="#">
            <img src="/images/User.png" alt="" />
          </a>
        </div>
        <client-app></client-app>
        <button class="menu-toggle hidden" @click="(isOn = !isOn), (isOff = !isOff)">
          <i class="fa fa-bars"></i>
        </button>
      </header>
    </section>
  </div>
</template>

<script>
import ClientApp from "@/components/admin/incfiles/ClientApp.vue";

export default {
  components: {
    clientApp: ClientApp,
  },
  data() {
    return {
      isOn: false,
      isOff: true,
    };
  },
  created() {},
  mounted() {
    window.addEventListener("resize", this.getWindowWidth);
    this.windowWidth = document.documentElement.clientWidth;

    if (this.windowWidth >= 576) {
      this.isOn = true;
      this.isOff = false;
    } else {
      this.isOn = false;
    }
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
      if (this.windowWidth >= 576) {
        this.isOn = true;
        this.isOff = false;
      } else {
        this.isOn = false;
      }
    },
  },
};
</script>

<style scoped>
#header-admin {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background: var(--dark);
  padding: 0 40px;
}
</style>
