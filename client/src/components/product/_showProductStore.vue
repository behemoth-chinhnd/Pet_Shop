<template>
  <div class="show-product">
    <tab-menu-species :ID="ID" @next="searchProduct"></tab-menu-species>
    <tab-menu-pet
      v-if="this.params.q.species_id === 1"
      :CAID="CAID"
      @nextCategory="searchCategory"
    ></tab-menu-pet>
    <main id="main" class="">
      <div class="container">
        <div class="card-deck mb-3 text-center scroll-x">
          <div class="cards">
            <div
              class="card"
              v-for="post in this.products"
              :key="post.id"
              @click="nextDetail(post.id)"
            >
              <img
                class="img-card"
                ref="image"
                :src="
                  post.image_url
                    ? post.image_url
                    : require('@/assets/images/plugin/no_photo.jpeg')
                "
                alt=""
              />
              <div class="card-top">
                <span class="item-1">ID: #{{ post.id }} - {{ post.name }}</span>
                <span class="item-2"></span>
              </div>
              <div class="card-bottom flex-row-space-between">
                <div class="flex-row-space-between">
                  <div class="flex-cloumn text-left">
                    <div class="price-sale mgb-10px">
                      {{ format_number(post.master_sales_price) }}đ
                    </div>
                    <div class="sale flex-row-space-between-center gap-10px">
                      <div class="percent">
                        {{ saleoff(post) }}%
                      </div>
                      <span class="saleoff"
                        >{{
                          format_number(post.master_list_price)
                        }}đ
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex-cloumn text-right">
                  <div class="mgb-10px">Quantity: {{ post.quantity }}</div>
                  <div>Sold: 999 {{ post.sold }}</div>
                </div>

                <!-- </div> -->
              </div>
            </div>
          </div>

          <div
            v-if="products.length <= 0"
            class="empty-cart bg-white height-400px mg-lr-10px"
          >
            <empty-product></empty-product>
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
      <!-- </section> -->
    </main>
  </div>
</template>
<script>
import TabMenuSpecies from "@/components/incfiles/_tabMenuSpecies.vue";
import TabMenuPet from "@/components/incfiles/_tabMenuPet.vue";
import EmptyProduct from "@/components/incfiles/_emptyProduct.vue";

import { createNamespacedHelpers } from "vuex";
const mapActionsPROD = createNamespacedHelpers("PROD");
import Paginate from "vuejs-paginate";
import { Glide } from "vue-glide-js";

import mixins from "@/mixins/index"
export default {
  name: "ProductForm",
  mixins: [mixins],
  components: {
    Paginate,
    tabMenuSpecies: TabMenuSpecies,
    tabMenuPet: TabMenuPet,
    vueGlide: Glide,
    emptyProduct:EmptyProduct
  },
  data() {
    return {
      active: 1,
      ID: "",
      CAID: "",
      total_search: null,
      search: {
        author: "",
        name: "",
        minprice: "",
        maxprice: "",
      },
      products: [],
      // List: [],
      page: {
        pageCount: 0,
        count: 1,
        per_page: 5,
      },
      operators: {
        equal_to: "=",
        less_than: "<",
        greater_than: ">",
        like: "LIKE",
        in: "IN",
        not_in: "NOT_IN",
        between: "BETWEEN",
      },
      params: {
        page: 1,
        per_page: 12,
        pages: "",
        q: {
          id: null,
          name: "",
          trademark_id: null,
          category_id: null,
          species_id: null,
          store_name:null,
        },
      },
    };
  },
  props: {},
  created() {
    const storeName = this.$route.params.id;
    this.params.q.store_name = storeName
    // this.getAll(this.params);
  },

  mounted() {},
  methods: {
    ...mapActionsPROD.mapActions({
      getAllPROD: "getAll",
      deletePROD: "delete",
    }),

    nextDetail(productId) {
      this.$router.push({
        name: "home.products.detail",
        params: { id: productId },
      });
    },
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll(this.params);
    },

    prev() {
      if (this.model.prev_page_url) {
        this.params.page--;
        this.getAll();
      }
    },
    next() {
      if (this.model.next_page_url) {
        this.params.page--;
        this.getAll();
      }
    },
    async getAll(input) {
      const res = await this.getAllPROD(input);
      if (res.products) {
        this.products = res.products;
        this.total_search = res.meta.total;
        this.params.page = res.meta.page;
        this.params.pages = res.meta.pages;
      } else {
        this.$swal.fire(res.message, "", res.status);
      }
    },
    async searchProduct(ID) {
      this.params.q.species_id = ID;
      if (this.params.q.species_id !== 1) {
        this.params.q.category_id = "";
      }
      const input = {
        page: 1,
        pages: this.params.pages,
        per_page: this.params.per_page,
        q: this.params.q,
      };
      await this.getAll(input);
    },
    async searchCategory(CAID) {
      this.params.q.category_id = CAID;
      const input = {
        page: 1,
        pages: this.params.pages,
        per_page: this.params.per_page,
        q: this.params.q,
      };
      await this.getAll(input);
    },
  },
  computed: {},
};
</script>
<style scoped>
@media screen and (min-width: 1366px) {
  .cards {
    --width: 100%;
    width: var(--width);
    margin: 0 auto;
    --column: 4;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1366px) {
  .cards {
    --width: 99%;
    width: var(--width);
    margin: 0 auto;
    --column: 3;
  }
}

@media screen and (min-width: 800px) and (max-width: 1024px) {
  .cards {
    --width: 99%;
    width: var(--width);
    margin: 0 auto;
    --column: 3;
  }
}

@media screen and (min-width: 683px) and (max-width: 800px) {
  .cards {
    --width: 99%;
    width: var(--width);
    margin: 0 auto;
    --column: 2;
  }
}

@media screen and (min-width: 500px) and (max-width: 683px) {
  .cards {
    --width: 99%;
    width: var(--width);
    margin: 0 auto;
    --column: 2;
  }
}

@media screen and (min-width: 0px) and (max-width: 600px) {
  .cards {
    --width: 99%;
    width: var(--width);
    margin: 0 auto;
    --column: 2;
  }
}

.cards a {
  color: #333;
}

.cards {
  --padding-card: 15px;
  display: flex;
  flex-wrap: wrap;
}

.card {
  cursor: pointer;
  width: calc(100% / var(--column) - var(--padding-card));
  overflow: hidden;
  font-size: 13px;
  background: var(--white);
  color: var(--dark-2);
  display: flex;
  flex-direction: column;
  margin: calc(var(--padding-card) / 2);
}

.img-card {
  height: 200px;
  width: 100%;
}

.card-top {
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
}

.item-1 {
  flex: 1;
  display: flex;
  /* margin-bottom: 20px; */
  /* word-break: break-all; */

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-2,
.card-bottom {
  flex-shrink: 0;
  margin-top: auto;
}

.card-bottom {
  padding: 10px;
  /* background: var(--warning); */
  /* background: linear-gradient(100deg, #ff424e, #fd820a); */
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination li,
.page-item {
  background: var(--white);
  height: 30px;
  width: 30px;
  font-weight: 30px;
  vertical-align: middle;
  border: 1px solid #000;
}

.page-item.active {
  background: var(--primary);
}
</style>
  