<template>
  <edit-category></edit-category>
</template>
<script>
import EditCategory from "@/components/admin/category/_edit.vue";

export default {
name: "ViewListcategory",
components: {
  editCategory: EditCategory,
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
