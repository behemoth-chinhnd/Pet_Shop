<template>
  <div
    class="menu-icon"
    :class="{ 'menu-left-on': isActive, 'menu-left-off': !isActive }"
  >
    <!-- Window width: {{ windowWidth }} <br />
    Window height: {{ windowHeight }} -->
    <section id="menu-icon" class="dark" :class="{ active: isActive }">
      <div class="logo">
        <router-link to="/"
          ><img src="/images/logo.png" alt=""
        /></router-link>
      </div>
      <button
        @click="clickToggle()"
        class="menu-left-toggle"
        :class="{ active: isActive, start: isStart }"
      >
        <i class="fa-solid fa-angles-right"></i>
      </button>
      <ul class="icon-img">
        <li>
          <router-link to="/admin/products"
            ><img src="/images/Icon-1.png" alt=""
          /></router-link>
        </li>
        <li>
          <router-link to="/admin/users"
            ><img src="/images/Icon-2.png" alt=""
          /></router-link>
          <!-- <a href="/admin/users"> -->

          <!-- </a> -->
        </li>
        <li class="active">
          <a href="#">
            <img src="/images/Equalizer.png" alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/Icon-4.png" alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/Icon-5.png" alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/Icon-6.png" alt="" />
          </a>
        </li>
      </ul>
    </section>
    <section
      id="menu-left"
      class="flex-column dark"
      :class="{ on: isActive, off: !isActive }"
    >
      <h1 class="pd-lr-20px mgt-20px">ADMINISTRATION</h1>
      <div class="form-search flex-row-space-between">
        <div class="flex-row-space-between rel">
          <i class="icon-search fa fa-search abs"></i>
          <input type="text" class="input-search" placeholder="Search" />
        </div>
        <!-- <a class="icon default" href="#">
          <img src="/images/User.png" alt="" />
        </a> -->
      </div>

      <ul class="menu-admin">
        <li class="sub-menu">
          <a class="active bold" href="#">MANAGEMENT PRODUCT</a>
          <ul>
            <li>
              <router-link
                :class="{
                  'sub-active': this.$route.path.includes(
                    '/saler/products/edit'
                  ),
                }"
                to="/saler/products"
                >List Product</router-link
              >
            </li>
            <li>
              <router-link to="/saler/products/create"
                >Create Product</router-link
              >
            </li>
          </ul>
        </li>
        <li class="sub-menu">
          <a class="active bold" href="#">MANAGEMENT CATEGORY</a>
          <ul>
            <li>
              <router-link
                :class="{
                  'sub-active': this.$route.path.includes(
                    '/admin/category/edit'
                  ),
                }"
                to="/admin/category"
                >List Category</router-link
              >
            </li>
            <li>
              <router-link to="/admin/category/create"
                >Create Category</router-link
              >
            </li>
            <li>
              <router-link
                :class="{
                  'sub-active': this.$route.path.includes(
                    '/admin/species/edit'
                  ),
                }"
                to="/admin/species"
                >List Species</router-link
              >
            </li>
            <li>
              <router-link to="/admin/species/create"
                >Create Species</router-link
              >
            </li>
            <li>
              <router-link
                :class="{
                  'sub-active': this.$route.path.includes(
                    '/admin/trademark/edit'
                  ),
                }"
                to="/admin/trademark"
                >List Trademark</router-link
              >
            </li>
            <li>
              <router-link to="/admin/trademark/create"
                >Create Trademark</router-link
              >
            </li>
          </ul>
        </li>
      </ul>

      <!-- <div class="flex-row item-group">
        <div class="icon bg-default">
          <img src="/images/Vector-3.png" alt="" />
        </div>
        <div class="mgl-15px">
          <h6 class="title">Top Authors</h6>
          <p class="content">Most Successful Fellas</p>
        </div>
      </div> -->
    </section>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("ADMU");
export default {
  data() {
    return {
      isActive: false,
      isStart: false,
      windowWidth: 0,
      windowHeight: 0,
    };
  },
  created() {
    this.isActiveMenuLeft();
    // if (this.windowWidth > 800) {
    //   this.isActive = true;
    //   this.isStart = true;
    // } else {
    //   this.isActive = false;
    // }
  },
  components: {},
  methods: {},
  mounted() {
    // this.$nextTick(function () {
    window.addEventListener("resize", this.getWindowWidth);
    window.addEventListener("resize", this.getWindowHeight);

    //Init
    // this.getWindowWidth();
    // this.getWindowHeight();
    // if (this.windowWidth > 800) {
    //   this.isActive = true;
    //   this.isStart = true;
    // } else {
    //   this.isStart = true;
    // }
    // });
  },
  methods: {
    ...mapActions({ runMenuLeft: "menuLeft" }),
    ...mapActions(["getMenuLeft"]),

    async isActiveMenuLeft() {
      const res = await this.getMenuLeft();
      this.isActive = res;
    },
    async clickToggle() {
      // return {
      // if (this.isActive == false) {
      //   this.isActive = true;
      //   this.isStart = true;
      // } else {
      //   this.isActive = false;
      // }

      const res = await this.runMenuLeft();
      this.isActive = res;
      this.isStart = res;
      console.log(res);

      //  this.$emit("clickToggle", this.menuleft);
    },
    // async getWindowWidth(event) {
    //   this.windowWidth = document.documentElement.clientWidth;
    //   if (this.windowWidth > 1200) {
    //     this.isActive = true;
    //     this.isStart = true;
    //   } else {
    //     this.isActive = false;
    //     this.isStart = true;
    //   }
    //   const res = await this.runMenuLeft(this.isActive);
    //  console.log(res)
    // },

    // getWindowHeight(event) {
    //   this.windowHeight = document.documentElement.clientHeight;
    // },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("resize", this.getWindowHeight);

    if (this.windowWidth > 800) {
      this.isStart = true;
    } else {
      this.isStart = false;
    }
  },
};
</script>
