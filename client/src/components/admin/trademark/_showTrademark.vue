<template>
  <!-- <div class="body-saler"> -->
    <div class="panel-body">
      <div class="search flex-row-center-center gap-10px">
        <form @submit.prevent="Search()" class="form-search">
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
              class="input-search-category"
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
              <th scope="col">Category</th>
              <th scope="col">Species</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in this.trademarks" :key="post.id">
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
              <td>{{ post.category.name }}</td>
              <td>{{ post.species.name }}</td>
              <td>{{ post.description }}</td>

             
              <td class="gap-10px">
                <router-link
                  :to="{ name: 'admin.trademark.edit', params: { id: post.id } }"
                >
                  <b-button variant="primary" @click="nextParams(post.id)">
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
  <!-- </div> -->
  <!-- <router-view/> -->
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {mapActions} = createNamespacedHelpers("ADTR");

export default {
  name: "trademarksForm",
  components: {
    // HeaderTest,
  },
  data() {
    return {
      total_search: "",
      trademarks: [],
      // search: "",
      page: {
        pageCount: 0,
        count: 1,
        per_page: 10,
      },
      params: {
        page: 1,
        per_page: 10,
        pages: "",
        q: {
          id: null,
          name: "",
          category_id:null,
          species_id:null,
        },
      },
    };
  },
  beforeCreate() {},
  created() {
    this.getAll(this.params);
  },
  mounted() {
  },
  props:{
    trademarks2:[]
  },
  methods: {
    ...mapActions({
      getAllADTR: "getAllList",
      deleteADTR: "delete",
    }),
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll(this.params);
    },
    async nextParams(ID){
      await this.$emit('next', ID )
    },
    async getAll(input) {
      const res = await this.getAllADTR(input);
      if (res.trademarks) {
        this.trademarks = res.trademarks;
        this.total_search = res.meta.total;
        this.params.page = res.meta.page;
        this.params.pages = res.meta.pages;
      } else {
        this.$swal.fire(res.message, "", res.status);
      }
    },
    async Search() {
      if (!this.params.q.id) {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: this.params.per_page,
          q: {
            name: this.params.q.name,
          },
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
    async onDelete(trademarkID) {
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
            const res = await this.deleteADTR(trademarkID);
            this.$swal.fire(res.message, "", res.status);
            this.Search();
          }
        });
    },
  },
  watch: {},
  computed: {
    
  },
};
</script>
<style>
</style>
