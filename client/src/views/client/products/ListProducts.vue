<template>
  <div class="body">
    <main id="main" class="">

      <!-- <section id="main-body"> -->
      <div class="container bg-white">
        <div v-if="showFilter" class="filter flex-row-space-between-center">
          <div class="search-wrapper">
            <div class="row">
              <div class="col-md-3">
                <input class="form-control" type="text" v-model="search.name" placeholder="Search Name" />
              </div>
              <div class="col-md-3">
                <input class="form-control" type="text" v-model.number="search.minprice" placeholder="Min Price" />
              </div>

              <div class="col-md-3">
                <input class="form-control" type="text" v-model.number="search.maxprice" placeholder="Max Price.." />
              </div>
              <div class="col-md-3">
                <input class="form-control" type="text" v-model="search.author" placeholder="Author" />
              </div>
            </div>
          </div>
        </div>

        <div class="card-deck mb-3 text-center scroll-x">

          <div class="cards">

            <div class="card" v-for="post in List" :key="post.id">
              <router-link class="" :to="{ name: 'home.products.detail', params: { id: post.id }, }">

                <img class="img-card" src="@/assets/images/products/gai-xinh-1.jpg" alt="">
              </router-link>

              <div class="card-top">
                <span class="item-1">{{ post.pid }} {{ post.name }}</span>
                <span class="item-2">{{ post.price }}</span>
              </div>
              <div class="card-bottom flex-row-space-between">
                <!-- <div class=""> -->

                <div>VND: {{ post.price }}</div>
                <div>Buy: 2899</div>
                <!-- </div> -->
              </div>

            </div>


          </div>
          <div v-if="this.params.pages > 1" class="panel-footer">
            <paginate 
              v-model="params.page" 
              :page-count="this.params.pages" 
              :page-range="3" :margin-pages="2"
              :click-handler="clickCallback" 
              :prev-text="'<<'" 
              :next-text="'>>'" 
              :container-class="'pagination'"
              :page-class="'page-item'">
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
        q: { name_eq: "minh"},
        pages: "",
      },
    };
  },
  props: {},
  created() {
    this.getAll();
  },

  mounted() { },
  methods: {
    clickCallback(pageNum) {
      this.params.page = pageNum
      this.getAll()
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
    // changePage (page){
    //   this.page.pageCount = page;
    //   // this.getAll()
    // },
    async getAll() {
      await this.$store.dispatch("PROD/getAll", { page: this.params.page, per_page: this.params.per_page, q: this.params.q })
    },

  },
  computed: {
    List() {
      this.products = this.$store.state.PROD.state.products;
      this.params.page = this.$store.state.PROD.state.params.page;
      this.params.pages = this.$store.state.PROD.state.params.pages;
      return this.products = this.$store.state.PROD.state.products;
    },
  }, // components: { HeaderApp },
};
</script>
<style scoped>
@media screen and (min-width :1366px) {
  .cards {
    /* khi vào thực tế thay width bằng số khác tùy trường hợp cụ thể. */
    --width: 100%;
    width: var(--width);
    margin: 0 auto;
    --column: 4;
  }
}

@media screen and (min-width :1024px) and (max-width :1366px) {
  .cards {
    --width: 97%;
    width: var(--width);
    margin: 0 auto;
    --column: 3;
  }
}

@media screen and (min-width :800px) and (max-width :1024px) {
  .cards {
    --width: 90%;
    width: var(--width);
    margin: 0 auto;
    --column: 2;
  }
}

@media screen and (min-width :683px) and (max-width :800px) {
  .cards {
    --width: 97%;
    width: var(--width);
    margin: 0 auto;
    --column: 2;
  }
}

@media screen and (min-width :500px) and (max-width :683px) {
  .cards {
    --width: 90%;
    width: var(--width);
    margin: 0 auto;
    --column: 1;
  }
}

@media screen and (min-width :0px) and (max-width :600px) {
  .cards {
    --width: 97%;
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
  width: calc(100%/var(--column) - var(--padding-card));
  overflow: hidden;
  font-size: 13px;
  background: var(--white);
  color: var(--dark-2);
  display: flex;
  flex-direction: column;
  margin: calc(var(--padding-card)/2);
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
  background: var(--warning);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
  