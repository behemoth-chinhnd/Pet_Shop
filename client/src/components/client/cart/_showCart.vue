<template>
  <div class="body">
    <div class="detail-product">
      <div class="container">
        <!-- is default address order -->
        <default-address></default-address>
        <!-- end is default address order -->
        <div
          class="card card-cart mgb-10px"
          v-for="(post, index) in this.order_items"
          :key="index"
        >
          <div class="" v-for="(item, index) in post.orders" :key="index">
            <div
              class="product-item"
              v-for="(info, index) in item.order_items"
              :key="index"
            >
              <div class="flex-row-space-between gap-10px">
                <div class="img-cart">
                  <img
                    class="img"
                    ref="image"
                    :src="
                      info.product.image_url
                        ? info.product.image_url
                        : require('@/assets/images/plugin/no_photo.jpeg')
                    "
                    alt=""
                  />
                </div>

                <div class="flex-1">
                  <div class="title bold break-line-1">
                    ID: #{{ info.product.id }} - {{ info.product.name }}
                  </div>
                  <div class="flex-row-space-between">
                    <div
                      class="
                        price-product
                        flex-row-space-between-center flex-1
                        row
                      "
                    >
                      <div class="price flex-row-start-center col-md-4">
                        <p class="">
                          {{ format_number(info.product.master_sales_price) }}đ
                        </p>
                        <p class="sale-off mgl-10px">
                          ({{ format_number(info.product.master_list_price) }}đ)
                        </p>
                      </div>
                      <div class="quantily-product col-md-4 flex-row">
                        <div class="prev" @click="prev(info)">-</div>
                        <div class="quantily">{{ info.quantity }}</div>
                        <div class="next mgr-10px" @click="next(info)">+</div>
                      </div>

                      <p class="total-cash col-md-4">
                        Total:
                        {{
                          format_number(
                            info.product.master_sales_price * info.quantity
                          )
                        }}
                        đ
                      </p>
                    </div>
                    <div class="flex-row-center-center pd-10px row">
                      <b-button
                        class="btn submit width-100px"
                        @click="buyNow(info.product.id)"
                        >Buy Now</b-button
                      >
                      <b-button
                        class="mgl-10px width-30px"
                        variant="danger"
                        title="Delete"
                        @click="remove(info.product.id)"
                        ><i class="fa fa-close" aria-hidden="true"></i
                      ></b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="total flex-row-space-between-center mg-tb-10px">
              <div class="content">{{ format_number(item.total_quantity) }} product</div>
              <div class="all flex-column text-right">
                <div class="shipping-fee mgb-10px">
                  Shipping Fee:
                  <span class="sub-total"
                    >{{ format_number(item.shipping_fee) }}đ</span
                  >
                </div>
                <div>
                  Into Money:
                  <span class="sub-total"
                    >{{ format_number(item.total) }}đ</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.infos.number_of_items > 0" class="text-right">
          <b-button variant="primary"
            >({{ this.infos.total_quantity }} Product) - Total Cash:
            {{ format_number(this.infos.total) }}đ</b-button
          >
          <b-button class="btn submit mgl-10px" @click="orderAll()"
            >ORDER ALL</b-button
          >
        </div>
        <empty-cart v-if="this.infos.number_of_items <= 0"></empty-cart>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsCART = createNamespacedHelpers("CART");
const mapActionsPROD = createNamespacedHelpers("PROD");
const mapActionsORDE = createNamespacedHelpers("ORDE");
const mapActionsADDR = createNamespacedHelpers("ADDR");
import DefaultAdress from "@/components/client/address/DefaultAddressOrder.vue";
import EmptyCart from "@/components/client/cart/_emptyCart.vue";
import mixins from "@/mixins/index";
export default {
  mixins: [mixins],
  name: "ShowCarts",
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
      infos: "",
      total: "",
      total_items: "",
      total_quantity: "",
      totalCash: "",
      address_order: null,
      params: {
        page: 1,
        per_page: 5,
        q: {},
        pages: "",
      },
    };
  },
  created() {
    this.getAll();
    this.getAddress();
  },
  computed: {},
  methods: {
    ...mapActionsCART.mapActions({
      getAllCART: "getAll",
      nextCART: "nextCart",
      prevCART: "prevCart",
      removeCART: "remove",
    }),
    ...mapActionsPROD.mapActions({
      getItemPROD: "getItem",
    }),
    ...mapActionsORDE.mapActions({
      orderAllORDE: "create",
    }),
    ...mapActionsADDR.mapActions({
      getDefaultADDR: "getIsDefault",
    }),

    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async next(info) {
      if (info.quantity >= info.product.quantity) {
        this.$swal.fire("Exceeded the allowed amount", "", "error");
      } else {
        info.quantity += 1;
        await this.nextCART(info.product.id);
      }
      await this.getAll();
    },

    async prev(info) {
      if (info.quantity <= 1) {
        await this.remove(info.product.id);
      } else {
        info.quantity -= 1;
        await this.prevCART(info.product.id);
      }
      await this.getAll();
    },

    async getAll() {
      const res = await this.getAllCART();
      this.order_items = res.data.data;
      this.infos = res.data.infos;
    },

    async getAddress() {
      const res = await this.getDefaultADDR();
      console.log(res);
      this.address_order = res;
    },

    async orderAll() {
      const res = await this.orderAllORDE(this.address_order);
      this.$swal.fire(res.alert.message, "", res.alert.status);
      await this.getAll();
    },

    async remove(productId) {
      this.$swal
        .fire({
          title: "Remove Product?",
          text: "Want to remove this product from your cart?",
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
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.removeCART({ product_id: productId });
            await this.getAll();
          }
        });
    },
  },
};
</script>
<style scoped>
</style>
  