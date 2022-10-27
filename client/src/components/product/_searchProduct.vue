<template >
  <div class="form-input-search mg-tb-20px">
    <input
      @change="searchKeyword"
      v-model="keyword"
      type="text"
      class="input-search"
      placeholder="Search"
    />
    <i class="icon-search fa fa-search"></i>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const PROD = createNamespacedHelpers("PROD");

export default {
  components: {},
  name: "InputSearchHeader",
  props: ["KeyWord"],
  data() {
    return {
      keyword: "",
      ID: "",
      params: {
        page: 1,
        per_page: 20,
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
  created() {
  },
  mounted() {},
  computed: {
    ...PROD.mapState({
      keywordSearch: (state) => state.state.keyword,
      ListProducts: (state) => state.state.products,
      Params: (state) => state.state.params,
    }),
  },
  methods: {
    ...PROD.mapActions({
      getAllPROD: "getAll",
      searchKeywordPROD: "searchKeyword",
    }),
    async searchKeyword() {
      if (this.$route.path.includes("/search")) {
        this.params = this.Params;
      } else {
        this.params.q.species_id = "";
        this.params.q.category_id = "";
      }
      this.params.q.name = this.keyword;
      this.$router.push({ path: "/search", query: { keywords: this.keyword } });
      await this.searchKeywordPROD(this.keyword);
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
    },
  },
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
  