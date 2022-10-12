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
                <div class="width-50px">
                  <img
                    class="img-detail-product width-80px height-40px"
                    src="@/assets/images/products/gai-xinh-1.jpg"
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
                    x {{ item.product.quantity }}
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
                  <div class="content"> {{ post.total_quantity }} product</div>
                  <!-- <div class="col-md-4 cash-order">Total Cash Product: {{ post.total }}đ</div>
                  <div class="col-md-4 ship-order" >Total Shipping Free: {{ post.shipping_fee }}đ</div> -->
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
      orders: [],
      total: "",
      total_items: "",
      totalCash: "",
      address_order: this.$store.state.ADDR.state.is_default,
      params: {
        page: 1,
        per_page: 3,
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
      this.orders = this.$store.state.ORDE.state.orders;
      this.params.page = this.$store.state.ORDE.state.params.page;
      this.params.pages = this.$store.state.ORDE.state.params.pages;
      return (this.orders = this.$store.state.ORDE.state.orders);
    },
  },
  methods: {
    ...mapActions([""]),

    isNumber(value) {
      return /^\d*$/.test(value);
    },

    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll();
    },
    async getAll() {
      await this.$store.dispatch("ORDE/getAll", {
        page: this.params.page,
        per_page: this.params.per_page,
        q: this.params.q,
      });
      this.orders = this.$store.state.ORDE.state.orders;
      // this.total = this.$store.state.ORDE.state.total;
      // this.total_items = this.$store.state.ORDE.state.total_items;
      // this.address_order = this.$store.state.ADDR.state.is_default;
      // this.sumQuantity();
      // this.sumCash();
      // this.getAddress();
    },

    async getDetail(number) {
      await this.$store.dispatch("ORDE/getDetail", number);
      // return this.$store.state.ORDE.state.orders;
    },

    // async getAddress() {
    //   await this.$store.dispatch("ADDR/getIsDefault");
    // },

    // async createOrder() {
    //   console.log(this.address_order)
    //   await this.$store.dispatch("ORDE/create", this.address_order );
    // },

    // async addCart() {},
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
  