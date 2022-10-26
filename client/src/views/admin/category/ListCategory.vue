<template>
  <div class="body-saler">
    <list-category></list-category>
  </div>
</template>
<script>
import ListCategory from "@/components/admin/category/_showCategory.vue";
export default {
  name: "ViewListCategory",
  components: {
    listCategory: ListCategory,
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {},
};
</script>
<style>
</style>
