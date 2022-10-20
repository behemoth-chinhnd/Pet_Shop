<template>
   
  <agile>
    <div class="slide slider-banner">
      <img
        class="width-100 height-100"
        src="@/assets/images/plugin/banner-desktop-1.jpg"
        alt=""
      />
    </div>
    <div class="slide">
      <img
        class="width-100 height-100"
        src="@/assets/images/plugin/banner-desktop-2.jpg"
        alt=""
      />
    </div>
    <div class="slide">
      <img
        class="width-100 height-100"
        src="@/assets/images/plugin/banner-desktop-3.jpg"
        alt=""
      />
    </div>
  </agile>
</template>
<script>
import { VueAgile } from "vue-agile";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("ADSP");

export default {
  name: "speciesForm",
  components: {
    agile: VueAgile,
  },
  data() {
    return {
      ID: "",
      is_active: 1,
      total_search: "",
      species: [],
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
  },
  mounted() {},
  props: {
    species2: [],
  },
  methods: {
    ...mapActions({
      getAllADSP: "getAllList",
      deleteADSP: "delete",
    }),
    async isActive(ID) {
      this.is_active = ID;
      await this.$emit("next", ID);
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
