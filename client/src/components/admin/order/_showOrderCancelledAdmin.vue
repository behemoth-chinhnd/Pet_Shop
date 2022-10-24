<template>
  <div class="body">
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
                  <p class="">#{{ post.number }}</p>
                </div>

                <div
                  class="status-order text-danger"
                >
                  Canceled
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
                    <div class="name break-line-1 mgb-10px">
                      ID: #{{ item.product.id }} - {{ item.product.name }}
                    </div>
                    <div>Decription</div>
                  </div>

                  <div class="total-price col-md-6 col-sm-3 text-right">
                    x {{ item.quantity }}
                    <div class="total-cash flex-row-end">
                      {{
                        format_number(item.total / item.quantity)
                      }}đ
                      <!-- {{
                    format_number(item.product.master_sales_price * item.product.quantity)
                  }}đ -->
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
  <!-- </div> -->
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const ADOR = createNamespacedHelpers("ADOR");
import mixins from "@/mixins/index"
export default {
  name: "ProductDta",
  mixins:[mixins],
  data() {
    return {
      message: "",
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
      address_order: "",
      params: {
        page: 1,
        per_page: 10,
        q: {
          status: 5,
        },
        pages: "",
      },
    };
  },
  created() {
    this.getAll(this.params);
  },
  computed: {
    // ...ORDE.mapState(['test']),
  },

  methods: {
    ...ADOR.mapActions({
      getAllADOR: "getAllList",
      cancelADOR: "cancel",
      completeADOR: "complete",
    }),
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll(this.params);
    },

    isStatus(status) {
      if (status === "wait_for_confirmation") {
        status = "Wait For Confirmation";
      }
    },

    async getAll(input) {
      const res = await this.getAllADOR(input);
      if (res.orders) {
        this.orders = res.orders;
        this.total_search = res.meta.total;
        this.params.page = res.meta.page;
        this.params.pages = res.meta.pages;
      } else {
        this.$swal.fire(res.message, "", res.status);
      }
    },
    async Search() {
      if (!this.params.q.id) {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: this.params.per_page,
          q: {
            starus: this.params.q.status,
          },
        };
        await this.getAll(input);
      } else {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: this.params.per_page,
          q: {
            id: this.params.q.id,
          },
        };
        await this.getAll(input);
      }
    },
  },
};
</script>
<style scoped>
</style>
  