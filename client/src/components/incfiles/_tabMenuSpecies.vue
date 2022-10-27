<template>
  <div id="header-purchase">
    <div class="header-layout">
      <div class="container">
        <div class="panel-body">
          <div v-if="species" class="scroll-x pd-lr-10px">
            <vue-glide
              @glide:slide-click="searchIndex"
              :perView="numberItem"
              :breakpoints="breakpoints"
            >
              <vue-glide-slide
                v-for="post in this.species"
                :key="post.id"
                :class="{ active: is_active == post.id, '': is_active==0 }"
              >
                {{ post.name }}
              </vue-glide-slide>
              <template slot="control" class="tab-species">
                <button class="prev-species" data-glide-dir="<">&#8249;</button>
                <button class="next-species" data-glide-dir=">">&#8250;</button>
              </template>
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
const { mapActions } = createNamespacedHelpers("ADSP");
import { Glide, GlideSlide } from "vue-glide-js";

export default {
  name: "speciesForm",
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  data() {
    return {
      windowWidth: "",
      active: "",
      numberItem: 4,
      ID: "",
      is_active: 0,
      total_search: "",
      species: false,
      params: {
        page: 1,
        per_page: 10,
        pages: "",
        q: {
          id: null,
          name: "",
        },
      },
      breakpoints: {
        1000: {
          perView: 4,
        },
        1300:{
          perView: 5,
        },
        2000:{
          perView: 6,
        }
      },
    };
  },
  beforeCreate() {},
  created() {
    if(!this.$route.path.includes('/search')){
      this.isActive(1)
    }
    this.getAll(this.params)

  },
  mounted() {},
  props: {},
  methods: {
    ...mapActions({
      getAllADSP: "getAllList",
      deleteADSP: "delete",
    }),
    async isActive(ID) {
      this.is_active = ID;
      this.$emit("next", ID);
    },
    async searchIndex(index) {
      if (index >= 0) {
        const ID = this.species[index].id;
        await this.isActive(ID);
      }
    },
    async getAll(input) {
      const res = await this.getAllADSP(input);
      if (res.species) {
        this.species = res.species.reverse();
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