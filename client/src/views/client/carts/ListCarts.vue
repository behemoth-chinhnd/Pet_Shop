<template>
  <div class="body">
    <div class="detail-product">
      <div class="container">
        <div class="address mgb-10px">
          <div class="address-header"></div>
          <div class="address-body">
            <div class="address-titel gap-10px">
              <svg
                height="16"
                viewBox="0 0 12 16"
                width="12"
                class="shop-pet-svg-icon icon-location-marker"
              >
                <path
                  d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                  fill-rule="evenodd"
                ></path>
              </svg>

              <p>Địa Chỉ Nhận Hàng</p>
            </div>
            <div class="address-info flex-row-start-center fz-15 gap-10px">
              <b style="font-size: 15px">{{
                address_order.name + " " + address_order.phone + " "
              }}</b>
              <span>{{
                " " +
                address_order.description +
                "," +
                address_order.apartment_number +
                "," +
                address_order.street +
                ", " +
                address_order.county +
                ", " +
                address_order.city
              }}</span>

              <div class="is-default">Default</div>
              <div class="change">
                <router-link to="/address_order">
                  Change
                </router-link>
                
              </div>
            </div>
          </div>
        </div>
        <div
          class="card mgb-10px pd-10px"
          v-for="(post, index) in List"
          :key="index"
        >
          <div class="flex-row-space-between gap-10px">
            <div class="width-150px">
              <img
                class="img-detail-product"
                src="@/assets/images/products/gai-xinh-1.jpg"
                alt=""
              />
            </div>
            <div class="flex-1">
              <div class="details-price flex-row-space-between">
                <div class="flex-cloumn text-left">
                  <div class="price-sale mgb-10px">
                    {{ post.product.id }}
                    {{ post.product.name }}
                  </div>
                </div>
                <div class="flex-cloumn text-left"></div>
              </div>

              <div class="number-product flex-row text-left mgt-10px">
                <div class="flex-row-start-center">
                  <p class="">({{ post.product.master_sales_price }} VND)</p>
                  <p class="saleoff">
                    ({{ post.product.master_list_price }} VND)
                  </p>

                  <div class="prev mgl-10px" @click="prev(index)">-</div>
                  <div class="quantily">{{ post.quantity }}</div>
                  <div class="next mgr-10px" @click="next(index)">+</div>
                  <div v-if="isMinimum" class="message">(Minimum = 1 )</div>
                  <div v-if="isMaximum" class="message">
                    (Maximum = {{ this.product.number }} )
                  </div>
                  <p class="">
                    Total:
                    {{
                      Intl.NumberFormat().format(
                        post.product.master_sales_price * post.quantity
                      )
                    }}
                    VND)
                  </p>
                </div>

                <div class="list-content"></div>
              </div>
            </div>

            <div class="right">
              <b-button variant="danger" @click="onDelete(post.product.id)"
                >Delete</b-button
              >
            </div>
          </div>
        </div>
        <div class="right">
          <b-button variant="primary"
            >({{ this.total_items }} Product) - Total Cash:
            {{ Intl.NumberFormat().format(this.total) }} VNĐ</b-button
          >
          <b-button class="details-price mgl-10px">ORDER</b-button>
        </div>
      </div>
      <!-- <p>{{ this.$store.state.CART.state.order_items }}</p>
      <p>{{ this.$store.state.CART.state.total }}</p>
      <p>{{ this.address_order }}</p> -->
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import func from "@/plugin/func";
export default {
  name: "ProductDta",
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
      this.total_items = sum;
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

    next(id) {
      this.List[id].quantity += 1;
      this.sumQuantity();
      this.sumCash();
    },

    prev(id) {
      this.List[id].quantity -= 1;
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
            this.$store.dispatch("CART/delete", { product_id: productId });
            this.getAll();
          }
        });
    },

    async addCart() {},
  },
};
</script>
<style scoped>
.address-header {
  height: 3px;
  width: 100%;
  background-position-x: -30px;
  background-size: 116px 3px;
  background-image: repeating-linear-gradient(
    45deg,
    #6fa6d6,
    #6fa6d6 33px,
    transparent 0,
    transparent 41px,
    #f18d9b 0,
    #f18d9b 74px,
    transparent 0,
    transparent 82px
  );
}

.address-body {
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  background: #fff;
  padding: 20px;
}

.address-titel {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  color: #ee4d2d;
  margin-bottom: 20px;
  text-transform: capitalize;
  flex: 1 1 auto;
}

.shop-pet-svg-icon {
  color: #ee4d2d;
  fill: currentColor;
}

.is-default {
  padding: 2px 5px;
  margin-left: 1.5em;
  color: #ee4d2d;
  border-radius: 1px;
  border: 0.5px solid;
  font-size: 10px;
  text-transform: capitalize;
  flex-shrink: 0;
}

.change {
  color: #4080ee;
  text-transform: capitalize;
  margin-left: 2.5rem;
  cursor: pointer;
}
.saleoff {
  text-decoration: line-through;
  font-style: italic;
}

.message {
  color: red;
}

.prev,
.next,
.quantily {
  padding: 5px 10px;
  border: 1px solid #a4a4a4;
}

.quantily {
  width: 50px;
  text-align: center;
}

.prev,
.next {
  cursor: pointer;
}

.content-product {
  border-radius: 10px;
  margin-top: 1em;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
}

.list-title {
  background: var(--light);
  border-radius: 10px 10px 0 0;
  margin-bottom: 0;
  padding: 0.5em 1em;
}

.list-content {
  padding: 20px;
}

.list-content ul {
  list-style: disc;
}

.list-content ul li {
  padding: 5px;
}

img.img-detail-product {
  width: 100%;
  /* height: 300px; */
  /* margin-bottom: 12px; */
}

.detail-product {
  margin-top: 12px;
}

.details-price {
  color: var(--white);
  background: linear-gradient(100deg, #ff424e, #fd820a);
  /* margin: 12px 0 0; */
  padding: 6px 15px;
  border-radius: 6px;
}

.form-group {
  margin-bottom: 10px;
}
</style>
  