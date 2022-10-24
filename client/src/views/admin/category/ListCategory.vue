<template>
  <list-category></list-category>
</template>
<script>
import ListCategory from "@/components/admin/category/_showCategory.vue";

export default {
name: "ViewListcategory",
components: {
  listCategory: ListCategory,
},
data() {
  return {

  }
},
beforeCreate() {},
created() {},
mounted() {},
methods: {},
watch: {},
computed: {},
// components: { HeaderApp },
};
</script>
<style>
table {
border-radius: 6px;
}

table td,
table th {
border: 1px solid #f5f5f5;
}

table th {
background: var(--primary) !important;
color: var(--white);
}
</style>
