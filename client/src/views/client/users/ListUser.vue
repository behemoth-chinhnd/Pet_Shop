<template>
    <div class="body">
      <section id="main-body">
        <!-- <div class="pricing-header px-3 py-3 pt-md-5 pd-md-4 mx-auto text-center">
          <h2 class="display-4">Users Management</h2>
          <p><router-link to="/admin/management/users/create">Add New</router-link></p>
        </div> -->
        <div class="container bg-white mgt--20px">
          <div class="panel-body flex-row-space-between-center">
            <div class="btn">
              <button class="btn btn-primary text-white">
                <router-link to="/admin/management/users">Users</router-link>
              </button>
            </div>
            <div class="btn">
              <button class="btn btn-primary text-white">
                <router-link :to="{ name: 'admin.management.users.create' }"
                  >Add New</router-link
                >
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
                <!-- <div class="col-md-3">
                  <input
                    class="form-control"
                    type="text"
                    v-model="search.uid"
                    placeholder="Uid"
                  />
                </div> -->
                <div class="col-md-3">
                  <input
                    class="form-control"
                    type="text"
                    v-model="search.name"
                    placeholder="Name"
                  />
                </div>
                <!-- <div class="col-md-3">
                  <input
                    class="form-control"
                    type="text"
                    v-model.number="search.username"
                    placeholder="Username"
                  />
                </div> -->
                <div class="col-md-3">
                  <input
                    class="form-control"
                    type="text"
                    v-model="search.email"
                    placeholder="Email"
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
                  <th scope="col">Name</th>
                  <!-- <th scope="col">Username</th> -->
                  <th scope="col" @click="changeCurrentDir()">Email</th>
                  <!-- <th scope="col">Password</th> -->
                  <th scope="col">Action</th>
                </tr>
              </thead>
  
              <tbody>
                <tr v-for="(post, index) in List" :key="index">
                  <td scope="row">{{ post.uid }}</td>
                  <td>{{ post.name }}</td>
                  <!-- <td>{{ post.username }}</td> -->
                  <td>{{ post.email }}</td>
                  <!-- <td>{{ post.password }}</td> -->
                  <td class="gap-10px">
                    <router-link
                      :to="{ name: 'admin.management.users.edit', params: { id: post.id } }"
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
    <!-- <router-view/> -->
  </template>
  <script>
  // import "@/assets/js/style.js";
  // import HeaderTest from "@/components/incfiles/HeaderTest.vue";
  import api from '@/plugin/axios';

  export default {
    name: "ProductForm",
    components: {
      // HeaderTest,
    },
    data() {
      return {
        showFilter: false,
        users: [],
        currentSort: "time",
        currentSortDir: 1,
        search: {
          // uid: "",
          name: "",
          // username: "",
          email: "",
        },
        page: {
          pageCount: 0,
          count: 1,
          per_page: 5,
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
    created() {
      this.getAll();
    },
    mounted() {
      // this.products = this.products.sort((a, b) => a.price - b.price)
    },
    methods: {
      clickCallback(pageNum) {
        this.page.pageCount = pageNum - 1;
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
      getAll() {
        api.get("/api/users").then((res) => {
          this.users = res.data;
         
          // this.users = this.users.reverse();
        });
      },
      onDelete(userId) {
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
              api
                .delete(`h/api/users/${userId}`)
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
        console.log(this.users);
        this.users.sort((a, b) => this.currentSortDir);
      },
    },
    computed: {
      getFilter() {
        // this.getAll()
        return this.users.filter((post) => {
          // if (this.search.uid === "") {
            return (
              post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
              // post.username.toLowerCase().includes(this.search.username.toLowerCase()) &&
              post.email.toLowerCase().includes(this.search.email.toLowerCase())
            );
          // } else {
        //     return (
        //       // post.uid == this.search.uid &&
        //       post.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
        //       // post.username.toLowerCase().includes(this.search.username.toLowerCase()) &&
        //       post.email.toLowerCase().includes(this.search.email.toLowerCase())
        //     );
        //   }
        //   // post.price >= 0
        //   // } else if (this.search.minprice != "" && this.search.maxprice === "") {
        //   // return post.username.toLowerCase().includes(this.search.name.toLowerCase());
        //   // post.author.toLowerCase().includes(this.search.author.toLowerCase()) &&
        //   // post.price >= this.search.minprice
        //   // } else if (this.search.minprice === "" && this.search.maxprice != "") {
        //   // return post.username.toLowerCase().includes(this.search.name.toLowerCase());
        //   // post.author.toLowerCase().includes(this.search.author.toLowerCase()) &&
        //   // post.price >= 0 &&
        //   // post.price <= this.search.maxprice
        //   // } else if (this.minprice != "" && this.maxprice != "") {
        //   // return post.username.toLowerCase().includes(this.search.name.toLowerCase());
        //   // post.author.toLowerCase().includes(this.search.author.toLowerCase()) &&
        //   // post.price >= this.search.minprice &&
        //   // post.price <= this.search.maxprice
        //   // }
        });
  
        // }
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
        console.log(this.page.count);
        console.log(this.page.pageCount);
  
        console.log(this.users);
  
        return this.getFilter.slice(
          this.page.per_page * this.page.pageCount,
          this.page.per_page * (this.page.pageCount + 1)
        );
      },
    },
    // components: { HeaderApp },
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
  </style>
  