<template >
  <div></div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const PROD = createNamespacedHelpers("PROD");

export default {
  components: {},
  name: "CurrencyInput",
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
    this.nextKeyword(this.KeyWord);
    console.log(`searchprops`, this.KeyWord);
  },
  mounted() {},
  computed: {
    ...PROD.mapState({
      keywordSearch: (state) => state.state.keyword,
      ListProducts: (state) => state.state.products,
      ListProducts: (state) => state.state.products,
      Params: (state) => state.state.params,
    }),
  },
  methods: {
    ...PROD.mapActions({
      getAllPROD: "getAll",
      deletePROD: "delete",
    }),

    nextKeyword(KeyWord) {
      console.log(`nextSearch`, KeyWord);
      this.params= this.Params
      this.params.q.name = KeyWord;
      this.getAll(this.params);

      this.$emit("nextSearch", KeyWord);
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
  