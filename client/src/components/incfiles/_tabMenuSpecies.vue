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
                :class="{ active: is_active == post.id }"
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
      active: 1,
      numberItem: 4,
      ID: "",
      is_active: 1,
      total_search: "",
      species: false,
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
    this.getAll(this.params);
    this.isActive(1);
    this.getWindowWidth();
  },
  mounted() {
    window.addEventListener("resize", this.getWindowWidth);
  },
  props: {
    species2: [],
  },
  methods: {
    ...mapActions({
      getAllADSP: "getAllList",
      deleteADSP: "delete",
    }),

    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
      if (this.windowWidth <= 1000) {
        this.numberItem = 4;
      } else if (this.windowWidth > 1000 && this.windowWidth <= 1300) {
        this.numberItem = 5;
      } else if (this.windowWidth > 1300) {
        this.numberItem = 6;
      }
      console.log(`number`, this.numberItem);
    },

    isActive(ID) {
      this.is_active = ID;
      this.$emit("next", ID);
    },

    searchIndex(index) {
      if (index >= 0) {
        const ID = this.species[index].id;
        this.isActive(ID);
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