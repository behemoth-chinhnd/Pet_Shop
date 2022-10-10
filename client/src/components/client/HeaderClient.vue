<template>
  <div id="header-client">
    <header id="header" class="">
      <section id="header-top" class="">
        <div class="container">
          <div class="list-menu-header height-110px gap-30px">
            <div class="flex-row-space-between-center">
              <div class="left-item-header flex-row">
                <div class="logo">
                  <img src="/pet2.png" alt="" />
                </div>
              </div>

              <button class="menu-toggle">
                <i class="fa fa-bars"></i>
              </button>
            </div>
            <div class="form-input-search">
              <input type="text" class="input-search" placeholder="Search" />
              <i class="icon-search fa fa-search"></i>
            </div>
            <div class="flex-row-wrap gap-10px">
              <b-button
                v-if="!this.$store.state.AUTH.state.isActive"
                variant="primary"
              >
                <router-link class="text-white" to="/login"
                  >Login User</router-link
                >
              </b-button>
              <b-button
                v-if="!this.$store.state.AUTH.state.isActive"
                variant="primary"
              >
                <router-link class="text-white" to="/register"
                  >Register</router-link
                >
              </b-button>
              <div
                v-if="this.$store.state.AUTH.state.isActive"
                @click="(isCarts = true), getCarts()"
                @mouseleave="isCarts = false"
                class="cart rel"
              >
                <router-link class="total_items text-white fz-25px rel" to="#">
                  <p class="number-cart abs">
                    {{ this.$store.state.CART.state.total_items }}
                  </p>
                  <i
                    class="fa fa-shopping-cart text-white"
                    aria-hidden="true"
                  ></i>
                </router-link>

                <div v-if="isCarts" class="box-list-cart abs">
                  <list-cart-header></list-cart-header>
                  <empty-cart-header></empty-cart-header>
                </div>
              </div>
              <div
                v-if="this.$store.state.AUTH.state.isActive"
                @mouseover="isActive = true"
                @mouseleave="isActive = false"
                class="avatar-icon mgl-20px pointer rel"
              >
                <img src="@/assets/images/icons/avatar-boy.png" alt="" />
                <ul v-if="isActive" class="abs box-menu-user">
                  <li>
                    <router-link class="" to="/user/profile">
                      My Account
                    </router-link>
                  </li>
                  <li>Purchase</li>
                  <li @click="logout()">Logout</li>
                </ul>
              </div>

              <!-- <b-button v-if="this.$store.state.AUTH.state.isActive" variant="danger" @click="logout()">
                <i class="fa fa-sign-out"></i> Logout
              </b-button> -->
            </div>
          </div>
        </div>
      </section>
      <section id="header-bottom" class="top-110px">
        <div class="container">
          <div class="list-menu-header-bottom scroll-x">
            <ul id="menu-row" class="btn-list-dark">
              <li class="active">
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <router-link to="/products">Products</router-link>
              </li>
              <li>
                <router-link to="/carts">Carts</router-link>
              </li>
              <li>
                <router-link to="/orders">Order</router-link>
              </li>
              <li>
                <router-link to="/address_order">Address Order</router-link>
              </li>
            </ul>
            <div class="form-input-search">
              <!-- <i class="icon-search fa fa-search"></i>
              <input type="text" class="input-search" placeholder="Search" />
              <button class="icon-text button-search bg-danger-bland">Search</button> -->
            </div>
          </div>
        </div>
      </section>
    </header>
  </div>
</template>

<script>
// import ClientApp from "@/components/incfiles/ClientApp.vue";
import ListCartHeader from "@/components/cart/ListCartHeader.vue";

import EmptyCartHeader from "@/components/cart/EmptyCartHeader.vue";


export default {
  components: {
    listCartHeader: ListCartHeader,
    emptyCartHeader: EmptyCartHeader

  },
  data() {
    return {
      isActive: false,
      isCarts: false,
      total_items: "",
      order_items: [],
      carts: "",
      // isOn: false,
      // isOff: true,
    };
  },
  created() {
    this.profile();
    this.getCarts();
  },
  computed: {
    isRun() {
      this.order_items = this.$store.state.CART.state.order_items;
      return (this.order_items = this.$store.state.CART.state.order_items);
    },
  },
  mounted() {},
  methods: {
    async logout() {
      await this.$store.dispatch("AUTH/logout");
    },
    async profile() {
      await this.$store.dispatch("AUTH/profile");
    },
    async getCarts() {
      await this.$store.dispatch("CART/getAll").then(() => {
        this.order_items = this.$store.state.CART.state.order_items;
        this.total = this.$store.state.CART.state.total;
        this.total_items = this.$store.state.CART.state.total_items;
        this.carts = this.$store.state.CART.state.carts;
        console.log(this.order_items);
      });
    },
  },
};
</script>

<style scoped>


#header-client #header-bottom {
  background: #ffe2e5;
}

#header-client .warning {
  background: #ffc220;
}

#header-client .primary {
  background: #3699ff;
}

#header-client .gap-10px {
  gap: 10px;
}
</style>
