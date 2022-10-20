<template>
  <div id="header-purchase">
    <div class="header-layout">
      <div class="container">
        <div class="">
          <div class="scroll-x category">
            <vue-glide
              v-if="categories"
              @glide:slide-click="SearchIndex"
              :perView="6"
            >
              <vue-glide-slide
                v-for="post in this.categories"
                :key="post.id"
                :class="{ active: is_active == post.id }"
                @change="isActive(post.id)"
              >
              <img
                    @click="isActive(post.id)"
                    for="check-category"
                    :class="{ checked: is_active === post.id }"
                    class="img-category"
                    :src="post.image_url"
                    alt=""
                  />
                  <input
                    id="check-category"
                    class="input-radio hidden"
                    @change="isActive(post.id)"
                    v-model="CAID"
                    type="radio"
                    v-bind:value="post.id"
                    name="category"
                    v-bind:checked="CAID == post.id"
                    :class="{ checked: is_active == post.id }"
                  />
              </vue-glide-slide>
            </vue-glide>
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
    this.getAll(this.params);
    // this.isActive(1);
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
    async isActive(CAID) {
      this.is_active = CAID;
      await this.$emit("nextCategory", CAID);
    },
    async SearchIndex(index){
      const ID = this.categories[index].id 
      await this.isActive(ID)
    },
    async getAll(input) {
      const res = await this.getAllADCA(input);
      console.log(res);
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
