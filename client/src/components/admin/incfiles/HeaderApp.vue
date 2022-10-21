<template>
  <div
    id="nav"
    :class="{
      active: isOn,
      on: isOn,
      off: isOff,
      'menu-left-on': this.$store.state.ADMU.state.menu_left,
      'menu-left-off': !this.$store.state.ADMU.state.menu_left,
    }"
  >
    <section id="header-mobile">
      <header id="header-admin">
        <div class="logo-header">
          <!-- <img src="/images/logo.png" alt="" /> -->
        </div>
        <div class="form-search flex-row-space-between hidden">
          <!-- <div class="flex-row-space-between rel">
            <i class="icon-search fa fa-search abs"></i>
            <input type="text" class="input-search" placeholder="Search" />
          </div> -->
          <!-- <a class="icon default" href="#">
            <img src="/images/User.png" alt="" />
          </a> -->
          <b-button variant="danger" @click="logoutAdmin">
            Logout
          </b-button>
        </div>
        <client-app></client-app>
        <button
          class="menu-toggle hidden"
          @click="(isOn = !isOn), (isOff = !isOff)"
        >
          <i class="fa fa-bars"></i>
        </button>
      </header>
      <router-saler></router-saler>
    </section>
  </div>
</template>

<script>
import RouterSaler from "@/components/client/saler/incfiles/RouterSaler.vue";
import { createNamespacedHelpers } from "vuex";
const ADAU = createNamespacedHelpers("ADAU");
const { mapActions, mapState } = createNamespacedHelpers("ADMU");
import ClientApp from "@/components/admin/incfiles/ClientApp.vue";

export default {
  components: {
    clientApp: ClientApp,
    routerSaler: RouterSaler,
  },
  data() {
    return {
      isActive: false,
      isOn: false,
      isOff: true,
    };
  },
  created() {
    // console.log(`menu`, menu_left)
    this.isActiveMenuLeft();
  },
  computed: {
    ...mapState({ menu_left: (state) => state.menu_left }),
    async runIsActive() {
      this.isActiveMenuLeft();
      const res = await this.getMenuLeft();
      return (this.isActive = res);
    },
  },
  mounted() {
    this.isActiveMenuLeft();
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
    ...mapActions({ runMenuLeft: "menuLeft" }),
    ...mapActions(["getMenuLeft"]),

    ...ADAU.mapActions({
      logoutAdmin:'logout'
    }),

    async isActiveMenuLeft() {
      const res = await this.getMenuLeft();
      this.isActive = res;
    },

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
