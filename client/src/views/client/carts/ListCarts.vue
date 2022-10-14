<template>
  <div class="body">
    <div class="detail-product">
      <div class="container">
        <!-- is default address order -->
        <default-address></default-address>
        <!-- end is default address order -->

        <div
          class="card mgb-10px pd-10px"
          v-for="(post, index) in List"
          :key="index"
        >
          <div class="flex-row-space-between gap-10px">
            <div class="img-cart">
              <img
                  class="img"
                  ref="image"
                  :src="
                    post.product.image_url
                      ? post.product.image_url
                      : require('@/assets/images/plugin/no_photo.jpeg')
                  "
                  alt=""
                />
            </div>

            <div class="flex-1">
              <!-- <div class="flex-row-space-between"> -->
              <!-- <div class="flex-cloumn text-left"> -->
              <div class="title bold break-line-1">
                ID: #{{ post.product.id }} - {{ post.product.name }}
              </div>
              <!-- </div> -->
              <!-- <div class="flex-cloumn text-left"></div> -->
              <!-- </div> -->
              <div class="flex-row-space-between">
                <div class="price-product flex-row-space-between-center flex-1 row">
                  <div class="price flex-row-start-center col-md-4">
                    <p class="">{{ Intl.NumberFormat().format(post.product.master_sales_price) }}đ</p>
                    <p class="sale-off mgl-10px">
                      ({{ Intl.NumberFormat().format(post.product.master_list_price) }}đ)
                    </p>
                  </div>
                  <div class="quantily-product col-md-4 flex-row">
                    <div class="prev" @click="prev(index)">-</div>
                    <div class="quantily">{{ post.quantity }}</div>
                    <div class="next mgr-10px" @click="next(index)">+</div>
                    <div v-if="isMinimum" class="message">(Minimum = 1 )</div>
                    <div v-if="isMaximum" class="message">
                      (Maximum = {{ this.product.number }}
                    </div>
                  </div>

                  <p class="total-cash col-md-4">
                    Total:
                    {{
                      Intl.NumberFormat().format(
                        post.product.master_sales_price * post.quantity
                      )
                    }}
                    đ
                  </p>
                  <!-- </div> -->
                </div>
                <div class="flex-row-center-center pd-10px row">
                <b-button
                  class="btn submit width-100px"
                  @click="buyNow(post.product.id)"
                  >Buy Now</b-button
                >
                <b-button
                  class="mgl-10px width-30px"
                  variant="danger"
                  title="Delete"
                  @click="onDelete(post.product.id)"
                  ><i class="fa fa-close" aria-hidden="true"></i
                ></b-button>
              </div>
              </div>

              
            </div>
          </div>
        </div>
        <div
          v-if="this.$store.state.CART.state.total_items > 0"
          class="text-right"
        >
          <b-button variant="primary"
            >({{ this.total_quantity }} Product) - Total Cash:
            {{ Intl.NumberFormat().format(this.total) }}đ</b-button
          >
          <b-button class="btn submit mgl-10px" @click="createOrder()"
            >ORDER ALL</b-button
          >
        </div>
        <empty-cart></empty-cart>
      </div>

      <!-- <p>{{ this.$store.state.CART.state.order_items }}</p>
      <p>{{ this.$store.state.CART.state.total }}</p>
      <p>{{ this.address_order }}</p> -->
    </div>
  </div>
</template>
<script>
import DefaultAdress from "@/components/client/address/DefaultAddressOrder.vue";

import { mapActions } from "vuex";
import EmptyCart from "@/components/cart/EmptyCart.vue";
import func from "@/plugin/func";
export default {
  name: "ProductDta",
  components: {
    defaultAddress: DefaultAdress,
    emptyCart: EmptyCart,
  },
  data() {
    return {
      number: 1,
      isMinimum: false,
      isMaximum: false,
      message: "",
      sales: "",
      // products: [],
      carts: [],
      product: {
        id: "",
        name: "",
        number: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: "",
      },
      carts: [],
      cart: {
        product_id: "",
        quantity: 1,
      },
      order_items: [],
      total: "",
      total_items: "",
      total_quantity: "",
      totalCash: "",
      address_order: this.$store.state.ADDR.state.is_default,
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
  created() {
    this.getAll();
  },
  computed: {
    List() {
      this.order_items = this.$store.state.CART.state.order_items;
      this.total = this.$store.state.CART.state.total;
      this.total_items = this.$store.state.CART.state.total_items;
      this.total_quantity = this.$store.state.CART.state.total_quantity;
      this.address_order = this.$store.state.ADDR.state.is_default;
      return (this.order_items = this.$store.state.CART.state.order_items);
    },
  },
  methods: {
    ...mapActions([""]),

    isNumber(value) {
      return /^\d*$/.test(value);
    },

    sumQuantity() {
      let sum = 0;
      for (let i = 0; i < this.List.length; i++) {
        sum += this.List[i].quantity;
      }
      this.total_quantity = sum;
      //  this.$store.dispatch("CART/getQuantity", sum)
    },
    sumCash() {
      let sum = 0;
      for (let i = 0; i < this.List.length; i++) {
        sum += this.List[i].quantity * this.List[i].product.master_sales_price;
      }
      this.total = sum;
      //  this.$store.dispatch("CART/getCash", sum)
    },

    async next(id) {
      this.List[id].quantity += 1;
      this.List[id].quantity = parseInt(this.List[id].quantity);
      if (this.List[id].quantity > this.List[id].product.quantity) {
        this.List[id].quantity = this.List[id].product.quantity;
        alert(`Max = ${this.List[id].product.quantity}`);

        // this.isMaximum = true;
      } else {
        await this.$store.dispatch("CART/nextCart", this.List[id]);
      }
      this.sumQuantity();
      this.sumCash();
    },

    async prev(id) {
      this.List[id].quantity -= 1;

      this.List[id].quantity = parseInt(this.List[id].quantity);
      if (this.List[id].quantity < 1) {
        this.List[id].quantity = 1;
        alert(`Min = 1`);
        // this.isMaximum = true;
      } else {
        await this.$store.dispatch("CART/prevCart", this.List[id]);
      }
      this.sumQuantity();
      this.sumCash();
    },

    // next() {
    //   this.cart.quantity += 1;
    //   console.log(this.cart.quantity);
    //   console.log(this.product.number);
    //   this.isMinimum = false;
    //   this.isMaximum = false;
    //   if (this.cart.quantity > this.product.number) {
    //     this.cart.quantity = this.product.number;
    //     this.isMaximum = true;
    //   }
    // },
    // prev() {
    //   this.cart.quantity -= 1;
    //   this.isMinimum = false;
    //   this.isMaximum = false;
    //   console.log(this.cart.quantity);
    //   console.log(this.product.number);
    //   if (this.cart.quantity < 1) {
    //     this.cart.quantity = 1;
    //     this.isMinimum = true;
    //   }
    // },

    async getAll() {
      await this.$store.dispatch("CART/getAll");
      this.order_items = this.$store.state.CART.state.order_items;
      this.total = this.$store.state.CART.state.total;
      this.total_items = this.$store.state.CART.state.total_items;
      this.address_order = this.$store.state.ADDR.state.is_default;
      this.sumQuantity();
      this.sumCash();
      this.getAddress();
    },

    async getAddress() {
      await this.$store.dispatch("ADDR/getIsDefault");
    },

    async createOrder() {
      console.log(this.address_order);
      await this.$store.dispatch("ORDE/create", this.address_order);
    },

    onDelete(productId) {
      this.$swal
        .fire({
          title: "Delete?",
          text: "You won't be able to revert this!",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!",
          timer: 5000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("CART/delete", { product_id: productId })
              .then(() => {
                this.getAll();
                // this.$swal.fire(this.res.message, "", this.res.status);
              });
          }
        });
    },

    async addCart() {},
  },
};
</script>
<style scoped>
</style>
  