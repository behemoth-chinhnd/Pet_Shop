<template>
  <div class="flex-row-space-between-center gap-10px">
    <b-button v-if="!online" variant="primary">
      <router-link class="text-white" to="/login">Login User</router-link>
    </b-button>
    <b-button v-if="!online" variant="primary">
      <router-link class="text-white" to="/register">Register</router-link>
    </b-button>
    <!-- <div
      v-if="this.$store.state.AUTH.state.isActive"
      @click="isCarts = true"
      @mouseleave="isCarts = false"
      class="cart rel"
    > -->
    <div
      v-if="online"
      @click="isCarts = true"
      @mouseleave="isCarts = false"
      class="cart rel"
    >
      <router-link class="total_items text-white fz-25px rel" to="#">
        <p class="number-cart abs">
          {{ this.total_items }}
        </p>
        <i class="fa fa-shopping-cart text-white" aria-hidden="true"></i>
      </router-link>

      <div v-if="isCarts" class="box-list-cart abs">
        <list-cart-header></list-cart-header>
        <empty-cart-header></empty-cart-header>
      </div>
    </div>
    <div
      v-if="online"
      @mouseover="isActive = true"
      @mouseleave="isActive = false"
      class="avatar-icon mgl-20px pointer rel"
    >
      <!-- <div class="flex-row-center-center gap-10px"> -->
      <img
        v-if="client.sex_id === 1 && client.avatar_url === null"
        class="avatar"
        src="@/assets/images/icons/avatar-boy.png"
        alt=""
      />
      <img
        v-if="client.sex_id === 2 && client.avatar_url === null"
        class="avatar"
        src="@/assets/images/icons/avatar-girl.png"
        alt=""
      />
      <img
        v-if="client.avatar_url !== null"
        class="avatar"
        :src="client.avatar_url"
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
          <router-link class="" to="/user/purchase"> Purchase </router-link>
        </li>
        <li>
          <router-link class="" to="/seller/profile">
            Store Manager
          </router-link>
        </li>
        <li @click="this.logout">Logout</li>
      </ul>
    </div>
  </div>
</template>
<script>
import ListCartHeader from "@/components/client/cart/_showCartHeader.vue";
import EmptyCartHeader from "@/components/client/cart/_emptyCartHeader.vue";
import { createNamespacedHelpers } from "vuex";
const CART = createNamespacedHelpers("CART");
const AUTH = createNamespacedHelpers("AUTH");
export default {
  name: "categoriesForm",
  components: {
    listCartHeader: ListCartHeader,
    emptyCartHeader: EmptyCartHeader,
  },
  data() {
    return {
      isCarts: false,
      isActive: false,
      params: {
        page: 1,
        per_page: 5,
        q: {},
        pages: "",
      },
    };
  },
  beforeCreate() {},
  created() {
    this.getAll();
  },
  mounted() {
  },
  props: {
  },
  computed: {
    ...CART.mapState({
      total_items: (state) => state.state.total_items,
    }),
    ...AUTH.mapState({
      client: (state) => state.state.user,
      online: (state) => state.state.isActive,
    }),
  },
  methods: {
    ...AUTH.mapActions(["logout"]),
    ...CART.mapActions({
      getAllCART: "getAll",
      nextCART: "nextCart",
      prevCART: "prevCart",
      removeCART: "remove",
    }),
    async getAll() {
      if(this.online) {
        const res = await this.getAllCART();
      this.order_items = res.data.data;
      this.infos = res.data.infos;
      }
    },
  },
  watch: {},
};
</script>
<style>
</style>
