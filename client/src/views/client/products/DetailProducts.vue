<template>
  <div class="body">
    <!-- <section id="main-body"> -->
    <div class="detail-product">
      <!-- <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h3 class="display-5">Product Information</h3>
                <router-link to="/products">Back</router-link>
            </div> -->
      <div class="container">
        <div class="row">
          <div class="col-xs-5 col-md-5 col-lg-5">
            <img
              class="img-detail-product"
              src="@/assets/images/products/gai-xinh-1.jpg"
              alt=""
            />
          </div>
          <div class="col-md-7">
            <div class="details-name text-left">
              <h1>{{ product.name }}</h1>
            </div>

            <div class="details-price flex-row-space-between">
              <div class="flex-cloumn text-left">
                <div class="price-sale mgb-10px">
                  {{ product.master_sales_price }} VND
                </div>
                <div class="sale">
                  {{ sales }}%
                  <span class="saleoff"
                    >{{ product.master_list_price }} VND</span
                  >
                </div>
              </div>
              <div class="flex-cloumn text-left">
                <div class="mgb-10px">Time Out</div>
                <div class="time-out">
                  {{ product.time }}
                </div>
              </div>
            </div>
            <div class="content-product flex-cloumn text-left">
              <div class="list-title">
                <p>ĐẶC QUYỀN ĐI KÈM</p>
              </div>
              <div class="list-content">
                <ul>
                  <li>Bảo hành sức khỏe 30 ngày.</li>
                  <li>Giảm 10% khi mua bé thứ 2.</li>
                  <li>Giảm trọn đời 5% khi mua phụ kiện.</li>
                  <li>
                    Giảm trọn đời 20% Spa cắt tỉa – Áp dụng với KH khu vực Hà
                    Nội.
                  </li>
                </ul>
              </div>
            </div>
            <div class="number-product flex-row text-left mgt-10px">
              <div class="flex-row-start-center">
                <div>Quantity:</div>

                <div class="prev mgl-10px" @click="prev()">-</div>
                <div class="quantily">{{ cart.quantity }}</div>
                <!-- <input class="quantily" v-model="number"/> -->
                <div class="next mgr-10px" @click="next()">+</div>

                <div class="">(Max: {{ this.product.number }} Products)</div>
                <div v-if="isMinimum" class="message">(Minimum = 1 )</div>
                <div v-if="isMaximum" class="message">
                  (Maximum = {{ this.product.number }} )
                </div>
              </div>

              <div class="list-content"></div>
            </div>

            <div class="mgt-10px left">
              <b-button variant="danger" @click="addCart()"
                >Add To Cart</b-button
              >
              <!-- <b-button  variant="outline-danger">Danger</b-button> -->
              <b-button class="mgl-10px" variant="primary" @click="buyItem()"
                >Buy Now</b-button
              >
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
import func from '@/plugin/func'
export default {
  name: "ProductDta",
  data() {
    return {
      number: 1,
      isMinimum: false,
      isMaximum: false,
      message: "",
      sales: [],
      products: [],
      product: {
        id:"",
        name: "",
        number: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: ""
      },
      carts: [],
      cart: {
        product_id:"",
        quantity: 1
      }
    };
  },
  created() {
    const itemId = this.$route.params.id;

    console.log(itemId);
    if (itemId) {
      this.getItem(itemId);
      this.product = this.$store.state.PROD.state.product
    }
    this.sales = func.saleoff(this.product.master_sales_price, this.product.master_list_price, 0);
    this.product.number = parseInt(this.product.number)
  },
  computed:{
  },
  methods: {
    ...mapActions([""]),

    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async getItem(itemId) {
      await this.$store.dispatch("PROD/getItem", itemId)
      await this.$store.dispatch("CART/getItem", itemId)
      this.product = this.$store.state.PROD.state.product
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

    async buyItem() {
      this.cart.product_id = this.product.id
      this.cart.quantity = parseInt(this.cart.quantity)
      // this.cart.name = this.product.name
      // this.cart.master_sku = this.product.master_sku
      // this.cart.master_list_price = this.product.master_list_price
      // this.cart.master_sales_price = this.product.master_sales_price
      await this.$store.dispatch("CART/buyItem", this.cart);
      this.$router.push({path: '/carts/product'})
    },
    async addCart() {
      console.log(1);
      this.cart.quantity = parseInt(this.cart.quantity)
      await this.$store.dispatch("CART/addCart", this.cart.quantity);
    },

    async getAll() {
      console.log(this.builUrl());
      await this.$request.get(this.builUrl()).then((res) => {
        this.carts = res.data;
        var md5 = require("md5");
        console.log(md5("message"));
      });
    },
    builUrl() {
      return `http://localhost:8000/api/carts`;
    },
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
  height: 300px;
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
  