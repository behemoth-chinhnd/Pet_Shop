<template>
  <div class="body">
    <div class="detail-product">
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
              <h1>ID: #{{ product.id }} - {{ product.name }}</h1>
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
                <div class="next mgr-10px" @click="next()">+</div>
                <div class="">(Max: {{ this.product.quantity }} Products)</div>
                <div v-if="isMinimum" class="message">(Minimum = 1 )</div>
                <div v-if="isMaximum" class="message">
                  (Maximum = {{ this.product.quantity }} )
                </div>
              </div>

              <div class="list-content"></div>
            </div>

            <div class="mgt-10px left">
              <b-button variant="danger" @click="addToCart()"
                >Add To Cart</b-button
              >
              <b-button class="mgl-10px" variant="primary" @click="buyItem()"
                >Buy Now</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </section> -->
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsPROD = createNamespacedHelpers("PROD");
const mapActionsCART = createNamespacedHelpers("CART");

import func from "@/plugin/func";

export default {
  name: "DetailProduct",
  data() {
    return {
      number: 1,
      isMinimum: false,
      isMaximum: false,
      message: "",
      sales: [],
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
      res: {
        is_res: null,
        status: "",
        message: "",
        text: "",
      },
    };
  },
  created() {
    const itemId = this.$route.params.id;
    console.log(itemId);
    if (itemId) {
      this.getItem(itemId);
      this.product = this.$store.state.PROD.state.product;
    }
    this.sales = func.saleoff(
      this.product.master_sales_price,
      this.product.master_list_price,
      0
    );
    this.product.number = parseInt(this.product.number);
  },
  computed: {},
  methods: {
    ...mapActionsPROD.mapActions({ getItemPROD: "getItem" }),
    ...mapActionsCART.mapActions({
      getItemCART: "getItem",
      buyItemCART: "buyItem",
    }),
    ...mapActionsCART.mapActions(["addCart"]),

    isNumber(value) {
      return /^\d*$/.test(value);
    },

    async getItem(itemId) {
      const res = await this.getItemPROD(itemId);
      console.log(`res`, res);
      if (res.data) {
        this.product = res.data;
      } else {
        this.$swal.fire(res.message, "", res.status);
      }
    },

    next() {
      this.cart.quantity += 1;
      this.isMinimum = false;
      this.isMaximum = false;
      if (this.cart.quantity > this.product.quantity) {
        this.cart.quantity = this.product.quantity;
        this.isMaximum = true;
      }
    },
    prev() {
      this.cart.quantity -= 1;
      this.isMinimum = false;
      this.isMaximum = false;
      if (this.cart.quantity < 1) {
        this.cart.quantity = 1;
        this.isMinimum = true;
      }
    },

    async buyItem() {
      const input = {
        product_id: this.product.id,
        quantity: this.cart.quantity,
      };
      this.cart.product_id = this.product.id;
      await this.buyItemCART(input);
      this.$router.push({ path: "/carts/buynow" });
    },
    async addToCart() {
      const input = {
        product_id: this.product.id,
        quantity: this.cart.quantity,
      };
      const res = await this.addCart(input);
      this.$swal.fire(res.message, res.text, res.status);
    },
  },
};
</script>
<style >
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
  