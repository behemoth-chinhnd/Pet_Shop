<template>
  <div id="header-purchase">
    <div class="header-layout">
      <div class="container">
        <div class="">
          <div
            v-if="categories"
            class="scroll-x flex-row-center-center tab-category"
          >
            <div class="" v-for="post in this.categories" :key="post.id">
              <img
                @click="isActive(post.id)"
                for="check-category"
                :class="{ checked: is_active === post.id }"
                class="img-category"
                :src="post.image_url"
                alt=""
              />
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
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("ADCA");
import { Glide, GlideSlide } from "vue-glide-js";
export default {
  name: "categoriesForm",
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  data() {
    return {
      CAID: "",
      is_active: "",
      total_search: "",
      categories: false,
      page: {
        pageCount: 0,
        count: 1,
        per_page: 10,
      },
      params: {
        page: 1,
        per_page: 15,
        pages: "",
        q: {
          id: null,
          name: "",
        },
      },
    };
  },
  beforeCreate() {},
  created() {
    this.getAll(this.params)
  },
  mounted() {},
  props: {
    categories2: [],
  },
  methods: {
    ...mapActions({
      getAllADCA: "getAllList",
      deleteADCA: "delete",
    }),
    isActive(CAID) {
      this.is_active = CAID;
      this.$emit("nextCategory", CAID);
    },
    searchIndex(index) {
      if (index >= 0) {
        const CAID = this.categories[index].id;
        this.isActive(CAID);
      }
    },
    async getAll(input) {
      const res = await this.getAllADCA(input)
      if (res.categories) {
        this.categories = res.categories.reverse();
        this.total_search = res.meta.total;
        this.params.page = res.meta.page;
        this.params.pages = res.meta.pages;
      } else {
        this.$swal.fire(res.message, "", res.status);
      }
    },
  },
  watch: {},
  computed: {},
};
</script>
<style>
</style>
