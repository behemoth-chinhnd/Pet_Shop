<template>
  <div class="body">
    <section id="main-body">
      <div class="container bg-white mgt--20px">
        <div class="panel-body flex-row-space-between-center">
          <div class="btn">
            <button class="btn btn-primary text-white">
              <router-link to="/admin/management/products">Product</router-link>
            </button>
          </div>
          <div class="btn">
            <button class="btn btn-primary text-white">
              <router-link to="/admin/management/products/create">Add New</router-link>
            </button>

            <button
              @click="showFilter = !showFilter"
              class="btn btn-info btn-sm mgl-10px text-white"
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
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
          <table class="table table-primary table-bdrs-5px">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product name</th>
                <th scope="col" @click="changeCurrentDir()">Price</th>
                <th scope="col">Author</th>
                <th scope="col">Time</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(post, index) in List" :key="index">
                <td scope="row">{{ post.pid }}</td>
                <td>{{ post.name }}</td>
                <td>{{ post.price }}</td>
                <td>{{ post.author }}</td>
                <td>{{ post.time }}</td>
                <td class="gap-10px">
                  <router-link
                    :to="{
                      name: 'admin.management.products.edit',
                      params: { id: post.id },
                    }"
                  >
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
        <div v-if="this.page.count > 1" class="panel-footer">
          <paginate
            v-model="params.page"
            :page-count="this.page.count"
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
    </section>
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
  },

  mounted() {},
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
    async getAll() {
      // console.log(this.builUrl());
      await this.$request.get(this.builUrl()).then((res) => {
        this.products = res.data;
        // sort price
        // this.products = this.products.sort((a, b) => a.price - b.price);
        // sort reverse
        this.products = this.products.reverse();
        // this.products.time = this.products.time.getUTCMilliseconds();
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
      // });
      // let test ;
      // const url = `http://localhost:8000/api/products/${productId}`
      // fetch(url , { method: 'DELETE'}).then(res =>test = res.ok)
      // if (test){
      //   this.p
      // }
    },
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    changeCurrentDir() {
      this.currentSortDir = -this.currentSortDir;
    },
  },
  watch: {
    currentSortDir(value) {
      console.log(this.products);
      this.products.sort((a, b) => this.currentSortDir);
    },
  },
  computed: {
    getFilter() {
      // this.getAll()
      return this.products.filter((post) => {
        if (this.search.minprice === "" && this.search.maxprice === "") {
          return (
            post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
            post.author.toLowerCase().includes(this.search.author.toLowerCase()) &&
            post.price >= 0
          );
        } else if (this.search.minprice != "" && this.search.maxprice === "") {
          return (
            post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
            post.author.toLowerCase().includes(this.search.author.toLowerCase()) &&
            post.price >= this.search.minprice
          );
        } else if (this.search.minprice === "" && this.search.maxprice != "") {
          return (
            post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
            post.author.toLowerCase().includes(this.search.author.toLowerCase()) &&
            post.price >= 0 &&
            post.price <= this.search.maxprice
          );
        } else if (this.minprice != "" && this.maxprice != "") {
          return (
            post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
            post.author.toLowerCase().includes(this.search.author.toLowerCase()) &&
            post.price >= this.search.minprice &&
            post.price <= this.search.maxprice
          );
        }
      });

      // },
    },

    List() {
      if (this.getFilter.length % this.page.per_page === 0) {
        this.page.count = Math.floor(this.getFilter.length / this.page.per_page);
      } else if (this.getFilter.length <= this.page.per_page) {
        this.page.count = Math.floor(this.getFilter.length / this.page.per_page + 1);
        this.page.pageCount = 0;
      } else if (this.page.pageCount > this.page.count - 1) {
        this.page.count = Math.floor(this.getFilter.length / this.page.per_page) + 1;
        this.page.pageCount = 0;
      } else {
        this.page.count = Math.floor(this.getFilter.length / this.page.per_page + 1);
      }
      return this.getFilter.slice(
        this.page.per_page * this.page.pageCount,
        this.page.per_page * (this.page.pageCount + 1)
      );
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
