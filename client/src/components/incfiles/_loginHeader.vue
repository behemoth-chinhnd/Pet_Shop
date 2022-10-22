<template>
  <div class="flex-row-space-between-center gap-10px">
    <b-button v-if="!this.$store.state.AUTH.state.isActive" variant="primary">
      <router-link class="text-white" to="/login">Login User</router-link>
    </b-button>
    <b-button v-if="!this.$store.state.AUTH.state.isActive" variant="primary">
      <router-link class="text-white" to="/register">Register</router-link>
    </b-button>
    <!-- <div
      v-if="this.$store.state.AUTH.state.isActive"
      @click="isCarts = true"
      @mouseleave="isCarts = false"
      class="cart rel"
    > -->
    <div
      v-if="this.$store.state.AUTH.state.isActive"
      @click="isCarts = true"
      @mouseleave="isCarts = false"
      class="cart rel"
    >
      <router-link class="total_items text-white fz-25px rel" to="#">
        <p class="number-cart abs">
          {{ this.$store.state.CART.state.total_items }}
        </p>
        <i class="fa fa-shopping-cart text-white" aria-hidden="true"></i>
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
        v-if="
          this.$store.state.AUTH.state.user.sex_id === 1 &&
          this.$store.state.AUTH.state.user.avatar_url === null
        "
        class="avatar"
        src="@/assets/images/icons/avatar-boy.png"
        alt=""
      />
      <img
        v-if="
          this.$store.state.AUTH.state.user.sex_id === 2 &&
          this.$store.state.AUTH.state.user.avatar_url === null
        "
        class="avatar"
        src="@/assets/images/icons/avatar-girl.png"
        alt=""
      />
      <img
        v-if="this.$store.state.AUTH.state.user.avatar_url !== null"
        class="avatar"
        :src="this.$store.state.AUTH.state.user.avatar_url"
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
          <router-link class="" to="/saler"> Store Manager </router-link>
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
const mapActionsCART = createNamespacedHelpers("CART");
const mapActionsAUTH = createNamespacedHelpers("AUTH");
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
        sort_column: "id",
        direction: "desc",
        search_column: "id",
        search_operator: "equal_to",
        search_query_1: "",
        search_query_2: "",
        q: {},
        pages: "",
      },
    };
  },
  beforeCreate() {},
  created() {
    this.getAll();
    // this.isActive(1);
  },
  mounted() {},
  props: {
    categories2: [],
  },
  methods: {
    ...mapActionsAUTH.mapActions(["logout"]),
    ...mapActionsCART.mapActions({
      getAllCART: "getAll",
      nextCART: "nextCart",
      prevCART: "prevCart",
      removeCART: "remove",
    }),
    async getAll() {
      const res = await this.getAllCART();
      this.order_items = res.data.data;
      this.infos = res.data.infos;
    },
  },
  watch: {},
  computed: {},
};
</script>
<style>
</style>
