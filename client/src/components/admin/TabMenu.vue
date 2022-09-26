<template>
  <div class="body">
    <section id="main-body">
      <div class="container">
        <div class="panel-body flex-row tab-menu">
          <router-link to="/admin/management/products"> Products</router-link>
          <router-link to="/admin/management/users">Users</router-link>
          <router-link to="/admin/management/login">Login</router-link>
        </div>
      </div>
    </section>
    <router-view />
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
      list: [],
      products: [],
      // pageList: [],
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
    getAll() {
      // console.log(this.builUrl());
      this.$request.get(this.builUrl()).then((res) => {
        this.products = res.data;
        // sort price
        // this.products = this.products.sort((a, b) => a.price - b.price);
        // sort reverse
        this.products = this.products.reverse();
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
            // post.author.toLowerCase().includes(this.search.author.toLowerCase()) &&
            post.price >= 0
          );
        } else if (this.search.minprice != "" && this.search.maxprice === "") {
          return (
            post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
            post.price >= this.search.minprice
          );
        } else if (this.search.minprice === "" && this.search.maxprice != "") {
          return (
            post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
            post.price >= 0 &&
            post.price <= this.search.maxprice
          );
        } else if (this.minprice != "" && this.maxprice != "") {
          return (
            post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
            post.price >= this.search.minprice &&
            post.price <= this.search.maxprice
          );
        }
      });

      // },
    },

    pageList() {
      if (this.getFilter.length % this.page.per_page === 0) {
        this.page.count = Math.floor(this.getFilter.length / this.page.per_page);
      } else {
        this.page.count = Math.floor(this.getFilter.length / this.page.per_page + 1);
      }
      console.log(this.products);
      return this.getFilter.slice(5 * this.page.pageCount, 5 * (this.page.pageCount + 1));
    },
  }, // components: { HeaderApp },
};
</script>
<style>
#main-body {
  /* background: var(--dark-2) !important; */
}
.tab-menu {
  /* background: #333; */
  display: flex;
  align-items: center;
  height: 36px;
  margin-bottom: -20px;
}
.tab-menu a {
  color: #000;
  padding: 10px 20px;
  /* margin-right: 20px; */
  min-width: 100px;
}

.tab-menu a.router-link-exact-active,
.tab-menu a:hover,
.tab-menu a.router-link-active {
  /* border-bottom: 2px solid var(--dark); */
  color: var(--dark);
  font-weight: 700;
  background: url(@/assets/images/admin/tab/tab-active.png);
  background-size: cover;
  background-repeat: repeat-x;
}

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
