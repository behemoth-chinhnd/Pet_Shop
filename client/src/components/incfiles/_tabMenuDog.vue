<template>
  <div id="header-purchase">
    <div class="header-layout">
      <div class="container">
        <div class="panel-body">
          <div v-if="species" class="scroll-x pd-lr-10px">
            <vue-glide
              v-if="perView_4"
              @glide:slide-click="SearchIndex"
              :perView="4"
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
            <vue-glide
              v-if="perView_5"
              @glide:slide-click="SearchIndex"
              :perView="5"
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
            <vue-glide
              v-if="perView_6"
              @glide:slide-click="SearchIndex"
              :perView="6"
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
      perView_4:false,
      perView_5:false,
      perView_6:false,
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
        this.perView_4 = true;
        this.perView_5 = false;
        this.perView_6 = false;
      } else if (this.windowWidth > 1000 && this.windowWidth <= 1300) {
        this.numberItem = 5;
        this.perView_4 = false;
        this.perView_5 = true;
        this.perView_6 = false;
      } else if (this.windowWidth > 1300 ) {
        this.numberItem = 6;
        this.perView_4 = false;
        this.perView_5 = false;
        this.perView_6 = true;
      } 
      this.isActive(1);
      this.getAll(this.params);

      console.log(`number`, this.numberItem);
    },

    async isActive(ID) {
      this.is_active = ID;
      console.log(ID);
      await this.$emit("next", ID);
    },

    async SearchIndex(index) {
      const ID = this.species[index].id;
      await this.isActive(ID);
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
  computed: {
  },
};
</script>
<style>
</style>
