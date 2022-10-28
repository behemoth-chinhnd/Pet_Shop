<template>
  <div class="body">
    <div class="detail-product">
      <div class="container">
        <div v-if="error" class="error">
          <img src="@/assets/images/plugin/404_error.png" alt="" />
        </div>
        <div v-if="!error" class="row">
          <div class="col-xs-5 col-md-5 col-lg-5">
            <img
              class="img-detail-product"
              ref="image"
              :src="
                product.image_url
                  ? product.image_url
                  : require('@/assets/images/plugin/no_photo.jpeg')
              "
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
                  {{ format_number(product.master_sales_price) }} VND
                </div>
                <div class="sale">
                  {{ saleoff(product) }}%
                  <span class="saleoff"
                    >{{ format_number(product.master_list_price) }} VND</span
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
const ORDE = createNamespacedHelpers("ORDE");
import mixins from "@/mixins/index";
export default {
  name: "DetailOrder",
  mixins: [mixins],
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
      alert: {
        is_res: null,
        status: "",
        message: "",
        text: "",
      },
      error: false,
    };
  },
  created() {
    const numberOrder = this.$route.params.id;
    if (numberOrder) {
      this.detail(numberOrder);
    } else {
      console.log(`error`);
    }
  },
  computed: {},
  methods: {
    ...ORDE.mapActions({ getDetail: "detail" }),

    async detail(numberOrder) {
      const res = await this.getDetail(numberOrder);
      console.log(res);
    },
  },
};
</script>
<style >
</style>
  