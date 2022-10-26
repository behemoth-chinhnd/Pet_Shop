<template>
  <div class="body">
    <header-purchase
      :ID="ID"
      :color="color"
      @next="nextPurchase"
      ref="test"
    ></header-purchase>
    <div class="detail-product">
      <div class="container">
        <div
          class="card-order mgb-10px pd-10px"
          v-for="(post, index) in this.orders"
          :key="index"
        >
          <div class="flex-row-space-between gap-10px">
            <div class="flex-1">
              <div class="flex-row-space-between">
                <div class="flex-cloumn text-left"></div>
                <div class="flex-cloumn text-left"></div>
              </div>

              <div
                class="number-product flex-row-space-between text-left mgt-10px"
              >
                <div class="">
                  <p class="">
                    <i class="fa-solid fa-store pdr-5px"></i>{{ post.number }}
                  </p>
                </div>
                <div
                  class="status-order"
                  :class="color_status"
                >
                  {{ titel_status }}
                </div>
              </div>
              <div
                class="order-items mgb-10px pd-10px flex-row-space-between"
                v-for="(item, index) in post.all_order_items"
                :key="index"
              >
                <div class="images-order">
                  <img
                    class="img"
                    ref="image"
                    :src="
                      item.product.image_url
                        ? item.product.image_url
                        : require('@/assets/images/plugin/no_photo.jpeg')
                    "
                    alt=""
                  />
                </div>
                <div class="detail-item flex-1 flex-row-space-between">
                  <div class="col-md-6 col-sm-9 mgb-5px">
                    <div class="name break-line-1 mgb-10px text-body bold">
                      <router-link :to="`/products/detail/${item.product.id}`">
                        {{ item.product.name }}
                      </router-link>
                    </div>
                    <div>Decription</div>
                  </div>
                  <div class="total-price col-md-6 col-sm-3 text-right">
                    x {{ item.quantity }}
                    <div class="total-cash flex-row-end">
                      {{ format_number(item.total / item.quantity) }}đ
                    </div>
                  </div>
                </div>
              </div>
              <div class="total flex-row-space-between pd-lr-10px">
                <div class="content">{{ post.total_quantity }} product</div>
                <div class="all text-right">
                  Into Money:
                  <span class="sub-total"
                    >{{ format_number(post.total) }}đ</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.params.pages > 1" class="panel-footer">
          <paginate
            v-model="params.page"
            :page-count="this.params.pages"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'<<'"
            :next-text="'>>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          >
          </paginate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderPurchase from "@/components/client/purchase/HeaderPurchase.vue";
import { createNamespacedHelpers } from "vuex";
const ORDE = createNamespacedHelpers("ORDE");
import mixins from "@/mixins/index";
export default {
  mixins: [mixins],
  name: "ProductDta",
  components: {
    headerPurchase: HeaderPurchase,
  },
  data() {
    return {
      namePage: "Show Order",
      ID: "",
      color: "",
      message: "",
      titel_status: "",
      sales: "",
      carts: [],
      cart: {
        product_id: "",
        quantity: 1,
      },
      orders: [],
      total: "",
      total_items: "",
      totalCash: "",
      params: {
        page: 1,
        per_page: 5,
        q: {
          status: 1,
        },
        pages: "",
      },
    };
  },
  created() {
    const status = this.$route.params.id;
    if (status === "wait_comfirm") {
      this.params.q.status = 1;
      this.color_status = "text-warning";
      this.titel_status = "Wait Comfirm";
    } else if (status === "wait_goods") {
      this.params.q.status = 2;
      this.color_status = "text-warning";
      this.titel_status = "Wait Goods";
    } else if (status === "delivering") {
      this.params.q.status = 3;
      this.color_status = "text-warning";
      this.titel_status = "Delivering";
    } else if (status === "delivered") {
      this.params.q.status = 4;
      this.color_status = "text-success";
      this.titel_status = "Delivered";
    } else if (status === "cancelled") {
      this.params.q.status = 5;
      this.color_status = "text-danger";
      this.titel_status = "Cancelled";
    } else {
      this.params.q.status = 1;
      this.color_status = "text-warning";
      this.titel_status = "Wait Comfirm";
    }
    this.getAll();
  },
  computed: {
  },
  methods: {
    ...ORDE.mapActions({
      getAllORDE: "getAll",
      getDetailORDE: "getDetail",
    }),
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll();
    },
    async getAll() {
      const res = await this.getAllORDE({
        page: this.params.page,
        per_page: this.params.per_page,
        q: this.params.q,
      });
      if(res.errors){
        this.$swal.fire(this.namePage + " " + res.alert.message, res.alert.text, res.alert.status);
      } else {
        console.log(`ListOrder`, res)
      this.orders = res.orders
      this.params.page = res.meta.page
      this.params.pages = res.meta.pages
      }



    },
    async nextPurchase(ID) {
      this.params.q.status = ID;
      if (ID === 1) {
      this.color_status = "text-warning";
      this.titel_status = "Wait Comfirm"
    } else if (ID === 2) {
      this.color_status = "text-warning";
      this.titel_status = "Wait Goods"
    } else if (ID === 3) {
      this.color_status = "text-warning";
      this.titel_status = "Delivering"
    } else if (ID === 4) {
      this.color_status = "text-success";
      this.titel_status = "Delivered"
    } else if (ID === 5) {
      this.color_status = "text-danger";
      this.titel_status = "Cancelled"
    } else {
      this.params.q.status = 1;
      this.color_status = "text-warning";
      this.titel_status = "Wait Comfirm"
    }
      this.getAll();
    },
  },
};
</script>
<style scoped>
</style>
  