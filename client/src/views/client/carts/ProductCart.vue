<template>
  <div class="body">
    <div class="buy-now">
      <div class="container">
        <default-address></default-address>
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
              <div class="flex-cloumn text-left"></div>
            </div>

            <div class="number-product flex-row text-left mgt-10px">
              <div class="flex-row-start-center">
                <p class="">({{ product.master_sales_price }} VND)</p>
                <p class="saleoff">({{ product.master_list_price }} VND)</p>

                <div class="prev mgl-10px" @click="prev()">-</div>
                <div class="quantily">{{ buy_now.quantity }}</div>
                <div class="next mgr-10px" @click="next()">+</div>

                <div v-if="isMinimum" class="message">(Minimum = 1 )</div>
                <div v-if="isMaximum" class="message">
                  (Maximum = {{ this.product.quantity }} )
                </div>
                <p class="">
                  Total:
                  {{
                    Intl.NumberFormat().format(
                      product.master_sales_price * buy_now.quantity
                    )
                  }}
                  VND)
                </p>
              </div>

              <div class="list-content"></div>
            </div>

            <div class="mgt-10px right">
              <b-button variant="danger">Cancel</b-button>
              <b-button class="mgl-10px" variant="primary" @click="order()"
                >Order</b-button
              >
              <p>buy_now: {{ this.$store.state.CART.state.buy_now }}</p>
              <p>product: {{ this.$store.state.CART.state.product }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DefaultAdress from '@/components/client/address/DefaultAddressOrder.vue';

import { createNamespacedHelpers } from "vuex";
const mapActionsCART = createNamespacedHelpers("CART");
const mapActionsORDE = createNamespacedHelpers("ORDE");



import func from "@/plugin/func";
export default {
  name: "buyNow",
  components:{
    defaultAddress: DefaultAdress,
  },
  data() {
    return {
      number: 1,
      isMinimum: false,
      isMaximum: false,
      message: "",
      sales: "",
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
      buy_now: {
        product_id: "",
        quantity: 1,
      },
    };
  },
  created() {
    this.buy_now = this.$store.state.CART.state.buy_now;
    const productId = this.$store.state.CART.state.buy_now.product_id;
    if (productId) {
      this.getItem(productId);
    }
    this.sales = func.saleoff(
      this.product.master_sales_price,
      this.product.master_list_price,
      0
    );
  },
  computed: {
  },
  methods: {
    ...mapActionsCART.mapActions({
      getItemCART: "getItem",
      buyItemCART: "buyItem"
    }),
    ...mapActionsORDE.mapActions({
      buyNowORDE: "buyNow"
    }),

    async getItem(productId) {
      await this.getItemCART(productId).then(() => {
        this.product = this.$store.state.CART.state.product;
      });
    },

    async next() {
      this.buy_now.quantity += 1;
      this.isMinimum = false;
      this.isMaximum = false;
      if (this.buy_now.quantity > this.product.quantity) {
        this.buy_now.quantity = this.product.quantity;
        this.isMaximum = true;
      } else {
        await this.buyItemCART(this.buy_now);
      }
    },
    async prev() {
      this.buy_now.quantity -= 1;
      this.isMinimum = false;
      this.isMaximum = false;
      if (this.buy_now.quantity < 1) {
        this.buy_now.quantity = 1;
        this.isMinimum = true;
      } else {
        await this.buyItemCART(this.buy_now);
      }
    },

    async order(){
      await this.buyNowORDE(this.buy_now);
    }
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
  