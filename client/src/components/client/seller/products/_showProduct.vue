<template>
  <div class="body-saler">
    <div class="panel-body">
      <div class="search flex-row-start gap-10px row left">
        <form @submit.prevent="Search()" class="form-search col-md-3">
          <select @change="Search()" v-model="params.q.category_id"
          class="form-select">
            <option
              v-bind:value="null"
              :selected="this.params.q.category_id === null"
              class=""
            >
            --Category--
            </option>
            <option
              v-for="item in categories"
              :key="item.id"
              v-bind:value="item.id"
              :selected="params.q.category_id === item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </form>
        <form @submit.prevent="Search()" class="form-search col-md-3">
          <select @change="Search()" v-model="params.q.species_id"
          class="form-select">
            <option
              v-bind:value="null"
              :selected="this.params.q.species_id === null"
              class=""
            >
            --Species--
            </option>
            <option
              v-for="item in species"
              :key="item.id"
              v-bind:value="item.id"
              :selected="params.q.species_id === item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </form>
        <form @submit.prevent="Search()" class="form-search col-md-3">
          <select @change="Search()" v-model="params.q.trademark_id"
          class="form-select">
            <option
              v-bind:value="null"
              :selected="this.params.q.trademark_id === null"
              class=""
            >
            --Trademark--
            </option>
            <option
              v-for="item in trademarks"
              :key="item.id"
              v-bind:value="item.id"
              :selected="params.q.trademark_id === item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </form>
        <form @submit.prevent="Search()" class="form-search col-md-2">
          <input
            type="number"
            v-model="params.q.id"
            class="input-search-id"
            placeholder="ID"
          />
        </form>
        
        <form
          @submit.prevent="Search()"
          class="form-search flex-row-space-between-center flex-1"
        >
          <div class="flex-row-space-between rel">
            <i
              @click="Search()"
              type="submit"
              class="icon-search fa fa-search abs"
            ></i>

            <input
              type="text"
              v-model="params.q.name"
              class="input-search"
              placeholder="Search"
            />
          </div>
          <p>Result:{{ this.total_search }}</p>
        </form>
      </div>

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
              <td>{{ format_number(post.master_list_price) }}</td>
              <td>{{ format_number(post.master_sales_price) }}</td>
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
const mapActionsADTR = createNamespacedHelpers("ADTR");
const mapActionsADCA = createNamespacedHelpers("ADCA");
const mapActionsADSP = createNamespacedHelpers("ADSP");
import mixins from "@/mixins/index"

export default {
  name: "ProductForm",
  mixins:[mixins],
  components: {
    // HeaderTest,
  },
  data() {
    return {
      total_search: "",
      products: [],
      // search: "",
      page: {
        pageCount: 0,
        count: 1,
        per_page: 5,
      },
      categories:[],
      species:[],
      trademarks: [],
      params: {
        page: 1,
        per_page: 10,
        pages: "",
        q: {
          id: null,
          name: "",
          trademark_id: null,
          category_id: null,
          species_id: null,
        },
      },
    };
  },
  beforeCreate() {},
  created() {
    this.getAll(this.params);
    this.SearchTrademark();
  },
  mounted() {},
  methods: {
    ...mapActionsPROD.mapActions({
      getAllPROD: "getAllList",
      deletePROD: "delete",
    }),
    ...mapActionsADTR.mapActions({
      getAllListADTR: "getAllList",
    }),
    ...mapActionsADCA.mapActions({
      getAllADCA: "getAll",
    }),
    ...mapActionsADSP.mapActions({
      getAllADSP: "getAll",
    }),
    
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll(this.params);
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
      await this.getCategories();
      await this.getSpecies();
    },
    async Search() {
      await this.SearchTrademark();
      if (!this.params.q.id) {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: this.params.per_page,
          q: this.params.q
        };
        await this.getAll(input);
      } else {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: this.params.per_page,
          q: {
            id: this.params.q.id,
          },
        };
        await this.getAll(input);
      }
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
            this.Search();
          }
        });
    },
    async getCategories() {
      const res = await this.getAllADCA();
      console.log(`categories`, res);
      this.categories = res.categories.reverse();
    },
    async getSpecies() {
      const res = await this.getAllADSP();
      console.log(`species`, res);
      this.species = res.species.reverse();
    },
    // async getTrademark() {
    //   const res = await this.getAllADTR();
    //   this.trademarks = res.trademarks.reverse();
    // },
    async getAllTrademark(input) {
      const res = await this.getAllListADTR(input);
      if (res.trademarks) {
        this.trademarks = res.trademarks;
      } else {
        this.$swal.fire(res.message, "", res.status);
      }
    },
    async SearchTrademark() {
      if (!this.params.q.id) {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: 100,
          q: {
            category_id: this.params.q.category_id,
            species_id: this.params.q.species_id,

          },
        };
        await this.getAllTrademark(input);
      } else {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: 100,
          q: {
            id: this.params.q.id,
          },
        };
        await this.getAllTrademark(input);
      }
    },
  },
  watch: {},
  computed: {},
};
</script>
<style>
</style>
