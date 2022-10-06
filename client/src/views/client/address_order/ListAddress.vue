<template>
  <div class="container">
      <div class="body-saler">
          <div class="panel-body flex-row-space-between-center">
              <div class="">
                  <button class="btn btn-primary text-white">
                      <router-link to="/saler">List Address Order</router-link>
                  </button>
              </div>
              <div class="">
                  <button class="btn btn-primary text-white">
                      <router-link :to="{ name: 'address_order.create' }">Create New</router-link>
                  </button>
              </div>
          </div>
          <div class="card-deck text-center scroll-x">
              <table class="table table-primary table-bdrs-5px">
                  <thead>
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Phone</th>
                          <th scope="col">City</th>
                          <th scope="col">County</th>
                          <th scope="col">Street</th>
                          <th scope="col">Apartment Number</th>
                          <th scope="col">Decscription</th>
                          <th scope="col">Default</th>
                          <th scope="col">Action</th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr v-for="post in List" :key="post.id">
                          <td scope="row">{{ post.id }}</td>
                          <td>{{ post.name }}</td>
                          <td>{{ post.phone }}</td>
                          <td>{{ post.city }}</td>
                          <td>{{ post.county }}</td>
                          <td>{{ post.street }}</td>
                          <td>{{ post.apartment_number }}</td>
                          <td>{{ post.description }}</td>
                          <td>{{ post.is_default }}</td>
                          <td class="gap-10px">
                              <router-link :to="{ name: 'address_order.edit', params: { id: post.id } }">
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
  <!-- <router-view/> -->
</template>
<script>
import api from '@/plugin/axios';

export default {
  name: "ProductForm",
  components: {
      // HeaderTest,
  },
  data() {
      return {
          showFilter: false,
          addresses: [],
          currentSort: "time",
          currentSortDir: 1,
          search: {
              id: "",
              name: "",
              email: "",
          },
          page: {
              pageCount: 0,
              count: 1,
              per_page: 5,
          },
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
  beforeCreate() {
  },
  created() {
      this.getAll();
  },
  mounted() {
  },
  methods: {
      clickCallback(pageNum) {
          this.params.page = pageNum
          this.getAll()
      },
      // prev() {
      //     if (this.model.prev_page_url) {
      //         this.params.page--;
      //         this.getAll();
      //     }
      // },
      // next() {
      //     if (this.model.next_page_url) {
      //         this.params.page--;
      //         this.getAll();
      //     }
      // },
      async getAll() {
          await this.$store.dispatch("ADDR/getAll", { page: this.params.page, per_page: this.params.per_page, q: {} })
      },
      onDelete(addressId) {
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
                      this.$store.dispatch("ADDR/delete", addressId)
                      this.params.page = this.$store.state.ADDR.state.params.page;
                      this.params.pages = this.$store.state.ADDR.state.params.pages;
                      this.getAll();
                  }
              });
      },
  },
  watch: {},
  computed: {
      List() {
          this.addresses = this.$store.state.ADDR.state.addresses;
          this.params.page = this.$store.state.ADDR.state.params.page;
          this.params.pages = this.$store.state.ADDR.state.params.pages;
          return this.addresses = this.$store.state.ADDR.state.addresses;
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
