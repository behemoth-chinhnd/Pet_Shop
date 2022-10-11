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
            <div class="flex-row-space-between-center gap-10px">
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
                @click="(isCarts = true)"
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
                <!-- <div class="flex-row-center-center gap-10px"> -->
                <img
                  v-if="this.$store.state.AUTH.state.user.sex_id === 1"
                  class="avatar"
                  src="@/assets/images/icons/avatar-boy.png"
                  alt=""
                />
                <img
                  v-if="this.$store.state.AUTH.state.user.sex_id === 2"
                  class="avatar"
                  src="@/assets/images/icons/avatar-girl.png"
                  alt=""
                />
                <img
                  v-if="this.$store.state.AUTH.state.user.sex_id === 3"
                  class="avatar"
                  :src="this.avatar"
                  alt=""
                />
                <!-- <p class="text-white bold">{{this.$store.state.AUTH.state.user.name}}</p> -->
                <!-- </div> -->

                <ul v-if="isActive" class="abs box-menu-user">
                  <li>
                    <router-link class="" to="/user/account/profile">
                      My Account
                    </router-link>
                  </li>
                  <li>
                    <router-link class="" to="/user/purchase">
                      Purchase
                    </router-link>
                    </li>
                  <li @click="logout()">Logout</li>
                </ul>
              </div>
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
            
          </div>
        </div>
      </section>
      <header-user></header-user>
    </header>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsAUTH = createNamespacedHelpers("AUTH");
const mapActionsCART = createNamespacedHelpers("CART");
import ListCartHeader from "@/components/cart/ListCartHeader.vue";
import EmptyCartHeader from "@/components/cart/EmptyCartHeader.vue";
import HeaderUser from "@/components/client/users/HeaderUser.vue";

export default {
  components: {
    headerUser: HeaderUser,
    listCartHeader: ListCartHeader,
    emptyCartHeader: EmptyCartHeader,
  },
  data() {
    return {
      isActive: false,
      isCarts: false,
      total_items: "",
      order_items: [],
      carts: "",
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
    ...mapActionsAUTH.mapActions(['logout'] ),
    ...mapActionsAUTH.mapActions({ getProfile: 'profile' }),
    ...mapActionsCART.mapActions({ getAllCart: 'getAll' }),


    async profile() {
      if(this.$store.state.AUTH.state.isActive) {
        await this.getProfile();
      }
    },
    async getCarts() {
      if(this.$store.state.AUTH.state.isActive) {
        await this.getAllCart()
        .then(() => {
        this.order_items = this.$store.state.CART.state.order_items;
        this.total = this.$store.state.CART.state.total;
        this.total_items = this.$store.state.CART.state.total_items;
        this.carts = this.$store.state.CART.state.carts;
        console.log(this.order_items);
      });
      }

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
