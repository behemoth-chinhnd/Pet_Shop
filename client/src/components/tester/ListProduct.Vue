<template>
  <div class="body">
    <section id="main-body">
      <div class="pricing-header px-3 py-3 pt-md-5 pd-md-4 mx-auto text-center">
        <h2 class="display-4">Product Management</h2>
        <p><router-link to="/admin/products/create">Add New</router-link></p>
      </div>
      <div class="container">
        <div class="panel-body">
          <div class="btn">
            <button @click="showFilter = !showFilter" class="btn btn-primary btn-sm">
              F
            </button>
          </div>
          <div v-if="showFilter" class="filter flex-row-space-between-center">
            <div class="filter-column">
              <div class="form-group">
                <select v-model="params.search_column">
                  <option v-for="column in filters" :value="column" :key="column">
                    {{ column }}
                  </option>
                </select>
              </div>
            </div>
            <div class="filter-operator">
              <div class="form-group">
                <select v-model="params.search_operator">
                  <option v-for="(operator, key) in operators" :value="key" :key="key">
                    {{ operator }}
                  </option>
                </select>
              </div>
            </div>
            <div class="filter-input">
              <div class="form-group">
                <input type="text" class="form-control" v-model="params.search_query_1" />
              </div>
            </div>
            <div class="filter-input" v-if="params.search_operator === 'between'">
              <div class="form-group">
                <input type="text" class="form-control" v-model="params.search_query_2" />
              </div>
            </div>
            <div class="btn">
              <button @click.prevent="getAll()" class="btn btn-primary btn-sm">
                Filter
              </button>
            </div>
          </div>
        </div>
        <div class="search-wrapper">
          <!-- <select v-for=""></select> -->
          <div class="row">
            <div class="col-md-3">
              <input
                class="form-control"
                type="text"
                v-model="search"
                placeholder="Search Name"
              />
            </div>
            <!-- <div class="col-md-9 col-lg-9">
                  
                 
                  <div class="row"> -->
            <!-- <div class="col-md-1">
                      Price:  from
        
                    </div> -->

            <div class="col-md-3">
              <input
                @click="isMinPrice = true"
                :class="{ active: isMinPrice }"
                class="form-control"
                type="text"
                v-model.number="minprice"
                placeholder="Min Price"
              />
            </div>
            <!-- <div class="col-md-1 ">to:</div> -->

            <div class="col-md-3">
              <input
                @click="isMaxPrice = true"
                :class="{ active: isMaxPrice }"
                class="form-control"
                type="text"
                v-model="maxprice"
                placeholder="Max Price.."
              />
            </div>
            <!-- </div> -->

            <!-- </div> -->
          </div>

          <!-- <div class="btn">
                    <button @click="showFilter()" class="btn btn-primary btn-sm">Filter</button>
                  </div> -->
        </div>

        <!-- <div class="wrapper">
                <div class="card" v-for="post in filteredList" :key="post">
                  <a v-bind:href="post.link" target="_blank">
                    <img v-bind:src="post.img" />
                    <small>posted by: {{ post.author }}</small>
                    {{ post.title }}
                  </a>
                </div>
              </div> -->
        <div class="card-deck mb-3 text-center scroll-x">
          <table class="table table-primary table-bdrs-5px">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product name</th>
                <th scope="col" @click="changeCurrentDir()">Price</th>
                <th scope="col">Time</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(post, index) in pageList" :key="index">
                <td scope="row">{{ index }}</td>
                <td>{{ post.name }}</td>
                <td>{{ post.price }}</td>
                <td>{{ post.time }}</td>
                <td class="gap-10px">
                  <router-link :to="{ name: 'product.edit', params: { id: post.id } }">
                    <b-button variant="primary">
                      <i class="fa fa-edit"></i>
                    </b-button>
                  </router-link>
                  <b-button variant="danger" @click="onDelete(post.id)">
                    <i class="fa fa-trash"></i>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="panel-footer">
          <paginate
            v-model="params.page"
            :page-count="Math.floor(this.getFilter.length / 5 + 0.5)"
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

        <!-- <div class="card-deck mb-3 text-center scroll-x">
                  <table class="table table-primary table-bdrs-5px">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product name</th>
                        <th scope="col" @click="changeCurrentDir()">Price</th>
                        <th scope="col">Time</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
        
                    <tbody>
                      <tr v-for="(product, index) in products" :key="index">
                        <td scope="row">{{ index }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.time }}</td>
                        <td class="gap-10px">
                          <router-link :to="{ name: 'product.edit', params: { id: product.id } }">
                            <b-button variant="primary">
                              <i class="fa fa-edit"></i>
                            </b-button>
                          </router-link>
                          <b-button variant="danger" @click="onDelete(product.id)">
                            <i class="fa fa-trash"></i>
                          </b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> -->
      </div>

      <!-- <div class="panel-footer">
                <ul class="pagination">
                  <li @click="prev()"><a > prev </a></li>
                  <li @click="changePage(page)" v-for="page in nPage" :key="page">{{page}}</li>
                  <li @click="next()"><a > next </a></li>
        
                </ul>
              </div> -->

      <!-- <div class="panel-footer">
                <paginate
                  v-model="params.page"
                  :page-count="2"
                  :page-range="3"
                  :margin-pages="2"
                  :click-handler="clickCallback"
                  :prev-text="'<<'"
                  :next-text="'>>'"
                  :container-class="'pagination'"
                  :page-class="'page-item'">
                </paginate>
              </div> -->
    </section>
  </div>
  <!-- <router-view/> -->
</template>
<script>
// import "@/assets/js/style.js";
// import HeaderTest from "@/components/incfiles/HeaderTest.vue";
import Paginate from "vuejs-paginate";
export default {
  name: "ProductForm",
  components: {
    Paginate,
  },
  data() {
    return {
      search: "",
      isMinPrice: false,
      isMaxPrice: false,
      minprice: "",
      maxprice: "",
      pricesearch: "",
      list: [],
      products: [],
      // pageList: [],
      page: {
        pageCount: 0,
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
        per_page: 1,
        sort_column: "id",
        direction: "desc",
        search_column: "id",
        search_operator: "equal_to",
        search_query_1: "",
        search_query_2: "",
      },
    };
  },
  props: {},
  created() {
    this.getAll();
    // this.pageList()
    // this.showFilter()
    // this.nPageCount();
  },

  mounted() {
    // this.nPageCount();
  },
  methods: {
    clickCallback(pageNum) {
      this.page.pageCount = pageNum - 1;

      // this.params.page = pageNum;
      // this.getAll();
      // console.log(pageNum)
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
    getAll() {
      console.log(this.builUrl());
      this.$request.get(this.builUrl()).then((res) => {
        this.products = res.data;
        // sort price
        // this.products = this.products.sort((a, b) => a.price - b.price);
        // sort reverse
        this.products = this.products.reverse();
        //   return this.products.filter((product) => {
        //   return product.name.toLowerCase().includes(this.search.toLowerCase());

        // });
      });
    },

    builUrl() {
      // let p = this.params;
      // return `http://localhost:8000/api/products?page=${p.page}&per_page=${p.per_page}&sort_column=${p.sort_column}&direction=${p.direction}&search_column=${p.search_column}&search_operator=${p.search_operator}&search_query_1=${p.search_query_1}&search_query_2=${p.search_query_2}`;
      return `http://localhost:8000/api/products`;
    },
    onDelete(productId) {
      this.$swal
        .fire({
          title: "Delete?",
          text: "You won't be able to revert this!",
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
        .then((result) => {
          if (result.isConfirmed) {
            this.$request
              .delete(`http://localhost:8000/api/products/${productId}`)
              .then((res) => {
                if (res.data.success) {
                  this.$swal.fire("Đã Xóa", "", "success");
                  this.getAll();
                }
              });
          }
        });
    },
    sort: function (s) {
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    changeCurrentDir() {
      this.currentSortDir = -this.currentSortDir;
    },
    // setTimeout(changeCurrentDir, 1000)
  },
  watch: {
    currentSortDir(value) {
      console.log(this.products);
      this.products.sort((a, b) => this.currentSortDir);
    },
  },
  computed: {
    //   nPageCount () {
    //  for (let i = 0; i < this.products.length; i ++) {
    //       console.log([i])
    //       if ( i % 5 == 0) {
    //       this.nPage.push(([i]/5)+1)

    //     }
    //     console.log(this.nPage  )

    //     }
    // },
    getFilter() {
      return this.products.filter((post) => {
        if (this.minprice === "" && this.maxprice === "") {
          return (
            post.name.toLowerCase().includes(this.search.toLowerCase()) && post.price >= 0
          );
        } else if (this.minprice != "" && this.maxprice === "") {
          return (
            post.name.toLowerCase().includes(this.search.toLowerCase()) &&
            post.price >= this.minprice
          );
        } else if (this.minprice === "" && this.maxprice != "") {
          return (
            post.name.toLowerCase().includes(this.search.toLowerCase()) &&
            post.price >= 0 &&
            post.price <= this.maxprice
          );
        } else if (this.minprice != "" && this.maxprice != "") {
          return (
            post.name.toLowerCase().includes(this.search.toLowerCase()) &&
            post.price >= this.minprice &&
            post.price <= this.maxprice
          );
        }
      });

      // },
    },

    pageList() {
      console.log(this.products);
      return this.getFilter.slice(5 * this.page.pageCount, 5 + 5 * this.page.pageCount);
    },
  }, // components: { HeaderApp },
};
</script>
<style>
table {
  border-radius: 6px;
}
table td,
table th {
  border: 1px solid #f5f5f5;
}
table th {
  background: var(--primary) !important;
  color: var(--white);
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
