<template>
  <div class="body">
    <div class="detail-product">
      <div class="container">
        <div
          class="card-order mgb-10px pd-10px"
          v-for="(post, index) in List"
          :key="index"
        >
          <div class="flex-row-space-between gap-10px">
            <div class="flex-1">
              <div class="flex-row-space-between">
                <div class="flex-cloumn text-left">
                  <!-- <div class="price-sale mgb-10px">
                    ID: #{{ post.id }}
                    Number Code: {{ post.number }}
                    <div
          class="card mgb-10px pd-10px"
          v-for="(item, index) in getDetail(post.number)"
          :key="index"
        >
        <div>{{item.order_items}}</div>
        </div>
                  </div> -->
                </div>
                <div class="flex-cloumn text-left"></div>
              </div>

              <div class="number-product flex-row-space-between text-left mgt-10px">
                <div class="">

                  <p class=""><i class="fa-solid fa-store pdr-5px"></i>{{ post.number }}</p>
                </div>
                <div class="status-order">
                    Đã Giao Hàng
                  </div>
              </div>
              <div
                class="order-items mgb-10px pd-10px flex-row-space-between"
                v-for="(item, index) in post.order_items"
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
                <div class="detail-item  flex-1 flex-row-space-between">
                  <div class=" col-md-6 col-sm-9 mgb-5px">
                    <div class="name break-line-1 mgb-10px">
                      ID: #{{ item.product.id }} - {{ item.product.name }} 
                    </div>
                    <div>Decription</div>
                  </div>
                  
                  <div class="total-price col-md-6 col-sm-3 text-right">
                    x {{ item.quantity }}
                  <div class="total-cash flex-row-end">
                    <div class="sale-off mgr-10px">
                      {{ Intl.NumberFormat().format(item.product.master_list_price) }}đ 
                    </div>
                     {{ Intl.NumberFormat().format(item.product.master_sales_price) }}đ
                    <!-- {{
                    Intl.NumberFormat().format(item.product.master_sales_price * item.product.quantity)
                  }}đ -->
                  </div>
                  
                  </div>
                </div>
                
                  
                  
                   
                </div>
                <div class="total flex-row-space-between pd-lr-10px">
                  <div class="content"> {{ post.total_quantity }} product </div>
                  <div class="all text-right">Into Money: <span class="sub-total">{{ Intl.NumberFormat().format(post.subtotal) }}đ</span></div>
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
                :page-class="'page-item'">
                </paginate>
            </div>
      </div>
      
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const ORDE = createNamespacedHelpers("ORDE");
// const {mapState: ORDE} = createNamespacedHelpers("ORDE");

import func from "@/plugin/func";
export default {
  name: "ProductDta",
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
      address_order: this.$store.state.ADDR.state.is_default,
      params: {
        page: 1,
        per_page: 3,
        q: {},
        pages: "",
      },
    };
  },
  created() {
    this.getAll();
  },
  computed: {
    // ...ORDE.mapState(['test']),
    List() {
      this.orders = this.$store.state.ORDE.state.orders;
      this.params.page = this.$store.state.ORDE.state.params.page;
      this.params.pages = this.$store.state.ORDE.state.params.pages;
      this.orders = this.$store.state.ORDE.state.orders
      console.log(`Show Order `,this.orders)
      return this.orders;
    },
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
      await this.getAllORDE({
        page: this.params.page,
        per_page: this.params.per_page,
        q: this.params.q,
      });
      this.orders = this.$store.state.ORDE.state.orders;
    },
  },
};
</script>
<style scoped>

</style>
  