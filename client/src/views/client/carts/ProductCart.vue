<template>
  <div class="body">
    <!-- <section id="main-body"> -->
    <div class="detail-product">
      <!-- <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h3 class="display-5">Product Information</h3>
                <router-link to="/products">Back</router-link>
            </div> -->
      <div class="container">
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
                  {{ product.name }}
                </div>
               
              </div>
              <div class="flex-cloumn text-left">
              </div>
            </div>

            <div class="number-product flex-row text-left mgt-10px">
              <div class="flex-row-start-center">
                
                  <p class="">({{ product.master_sales_price }} VND) </p>
                  <p class="saleoff">({{ product.master_list_price }} VND)</p>
                

                <div class="prev mgl-10px" @click="prev()">-</div>
                <div class="quantily">{{ cart.quantity }}</div>
                <!-- <input class="quantily" v-model="number"/> -->
                <div class="next mgr-10px" @click="next()">+</div>
                <div v-if="isMinimum" class="message">(Minimum = 1 )</div>
                <div v-if="isMaximum" class="message">
                  (Maximum = {{ this.product.number }} )
                </div>
                <p class="">Total: {{ Intl.NumberFormat().format(product.master_sales_price * cart.quantity) }} VND)</p>
              </div>

              <div class="list-content"></div>
            </div>

            <div class="mgt-10px right">
              <b-button variant="danger">Cancel</b-button>
              <!-- <b-button  variant="outline-danger">Danger</b-button> -->
              <b-button class="mgl-10px" variant="primary" @click="buyItem()"
                >Order</b-button
              >
              <p>{{ this.$store.state.CART.state.order }}</p>
              <p>{{ this.$store.state.CART.state.product }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </section> -->
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
      products: [],
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
    };
  },
  created() {
    // this.product = this.$store.state.CART.state.cart;
    const itemId = this.$store.state.CART.state.order.products_data.product_id;
    this.cart.quantity = this.$store.state.CART.state.cart.quantity;

    console.log(itemId);
    if (itemId) {
      this.getItem(itemId);
    }
    this.sales = func.saleoff(
      this.product.master_sales_price,
      this.product.master_list_price,
      0
    );
    this.cart = this.$store.state.CART.state.cart;
  },
  computed: {

  },
  methods: {
    ...mapActions([""]),

    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async getItem(itemId) {
      await this.$store.dispatch("CART/getItem", itemId);
      this.product = this.$store.state.CART.state.product;
    },

    next() {
      this.cart.quantity += 1;
      console.log(this.cart.quantity);
      console.log(this.product.number);
      this.isMinimum = false;
      this.isMaximum = false;
      if (this.cart.quantity > this.product.number) {
        this.cart.quantity = this.product.number;
        this.isMaximum = true;
      }
    },
    prev() {
      this.cart.quantity -= 1;
      this.isMinimum = false;
      this.isMaximum = false;
      console.log(this.cart.quantity);
      console.log(this.product.number);
      if (this.cart.quantity < 1) {
        this.cart.quantity = 1;
        this.isMinimum = true;
      }
    },

    // async buyItem() {
    //   this.cart.name = this.product.name;
    //   this.cart.master_sku = this.product.master_sku;
    //   this.cart.master_list_price = this.product.master_list_price;
    //   this.cart.master_sales_price = this.product.master_sales_price;
    //   await this.$store.dispatch("CART/buyItem", this.cart);
    //   this.$router.push({ path: "/buy/product" });
    // },
    async addCart() {},
  },
};
</script>
<style scoped>
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
  margin-bottom: 12px;
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
  