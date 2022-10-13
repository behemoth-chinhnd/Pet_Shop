<template>
  <div class="body">
    <main id="main" class="">
      <!-- <section id="main-body"> -->
      <div class="container bg-white">
        <div v-if="showFilter" class="filter flex-row-space-between-center">
          <div class="search-wrapper">
            <div class="row">
              <div class="col-md-3">
                <input
                  class="form-control"
                  type="text"
                  v-model="search.name"
                  placeholder="Search Name"
                />
              </div>
              <div class="col-md-3">
                <input
                  class="form-control"
                  type="text"
                  v-model.number="search.minprice"
                  placeholder="Min Price"
                />
              </div>

              <div class="col-md-3">
                <input
                  class="form-control"
                  type="text"
                  v-model.number="search.maxprice"
                  placeholder="Max Price.."
                />
              </div>
              <div class="col-md-3">
                <input
                  class="form-control"
                  type="text"
                  v-model="search.author"
                  placeholder="Author"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card-deck mb-3 text-center scroll-x">
          <div class="cards">
            <div class="card" v-for="post in List" :key="post.id">
              <router-link
                class=""
                :to="{ name: 'home.products.detail', params: { id: post.id } }"
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
              </router-link>

              <div class="card-top">
                <span class="item-1">ID: #{{ post.id }} - {{ post.name }}</span>
                <span class="item-2"></span>
              </div>
              <div class="card-bottom flex-row-space-between details-price">
                <div class=" flex-row-space-between">
                  <div class="flex-cloumn text-left">
                    <div class="price-sale mgb-10px">
                      {{ Intl.NumberFormat().format(post.master_sales_price) }} VND
                    </div>
                    <div class="sale">
                      {{ saleoff(post.master_sales_price,post.master_list_price, 0) }}%
                      <span class="saleoff"
                        >{{ Intl.NumberFormat().format(post.master_list_price) }} VND</span
                      >
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
import Paginate from "vuejs-paginate";
export default {
  name: "ProductForm",
  components: {
    Paginate,
  },
  data() {
    return {
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
      currentSort: "time",
      currentSortDir: 1,
      title: "product",
      showFilter: false,
      filters: ["id", "name", "price", "time"],
      nPage: [],
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
        per_page: 4,
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
  props: {},
  created() {
    this.getAll();
  },

  mounted() {},
  methods: {
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll();
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
    saleoff(a, b, c) {
    const result = ((1 - a / b) * 100).toFixed(c);
    return result;
  },
    // changePage (page){
    //   this.page.pageCount = page;
    //   // this.getAll()
    // },
    async getAll() {
      await this.$store.dispatch("PROD/getAll", {
        page: this.params.page,
        per_page: this.params.per_page,
        q: {},
      });
    },
  },
  computed: {
    List() {
      this.products = this.$store.state.PROD.state.products;
      this.params.page = this.$store.state.PROD.state.params.page;
      this.params.pages = this.$store.state.PROD.state.params.pages;
      return (this.products = this.$store.state.PROD.state.products);
    },
  }, // components: { HeaderApp },
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
    --column: 2;
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
    --column: 1;
  }
}

@media screen and (min-width: 0px) and (max-width: 600px) {
  .cards {
    --width: 99%;
    width: var(--width);
    margin: 0 auto;
    --column: 1;
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
  background: linear-gradient(100deg, #ff424e, #fd820a);
color: #fff;
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
  