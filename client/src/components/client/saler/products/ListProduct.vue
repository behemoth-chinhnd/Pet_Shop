<template>
  <div class="body-saler">
    <div class="panel-body">
      <form
        @submit.prevent="getAll()"
        class="form-search flex-row-space-between-center hidden"
      >
        <div class="flex-row-space-between rel">
          <i type="submit" class="icon-search fa fa-search abs"></i>
          <input
            type="text"
            v-model="params.q.name"
            class="input-search"
            placeholder="Search"
          />
        </div>
        <p>Result:{{ this.total_search }}</p>
      </form>
      <div class="card-deck text-center scroll-x">
        <table class="table table-primary table-bdrs-5px">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Number</th>
              <th scope="col">Master SKU</th>
              <th scope="col">Master List Price</th>
              <th scope="col">Master Sales Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in this.products" :key="post.id">
              <td scope="row">{{ post.id }}</td>
              <td class="img">
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
              </td>
              <td>{{ post.name }}</td>
              <td>{{ post.quantity }}</td>
              <td>{{ post.number }}</td>
              <td>{{ post.master_sku }}</td>
              <td>{{ Intl.NumberFormat().format(post.master_list_price) }}</td>
              <td>{{ Intl.NumberFormat().format(post.master_sales_price) }}</td>
              <td class="gap-10px">
                <router-link
                  :to="{ name: 'saler.products.edit', params: { id: post.id } }"
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
  <!-- <router-view/> -->
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsPROD = createNamespacedHelpers("PROD");
import func from "@/plugin/func";

export default {
  name: "ProductForm",
  components: {
    // HeaderTest,
  },
  data() {
    return {
      total_search: "",
      products: [],
      search: "",
      page: {
        pageCount: 0,
        count: 1,
        per_page: 5,
      },
      params: {
        page: 1,
        per_page: 10,
        pages: "",
        q: {
          name: "",
        },
      },
    };
  },
  beforeCreate() {},
  created() {
    this.getAll();
  },
  mounted() {},
  methods: {
    ...mapActionsPROD.mapActions({
      getAllPROD: "getAllList",
      deletePROD: "delete",
    }),
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll();
    },
    async getAll() {
      const res = await this.getAllPROD(this.params);
      this.products = res.products;
      this.total_search = res.meta.total;
      this.params.page = res.meta.page;
      this.params.pages = res.meta.pages;
    },
    async onDelete(productId) {
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
          timer: 3000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await this.deletePROD(productId);
            this.$swal.fire(res.message, "", res.status);
            await this.getAll();
          }
        });
    },
  },
  watch: {},
  computed: {},
};
</script>
<style>
</style>
