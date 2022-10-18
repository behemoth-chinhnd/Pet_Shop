<template>
  <edit-trademark></edit-trademark>
</template>
<script>
import EditTrademark from "@/components/admin/trademark/_editTrademark.vue";

export default {
name: "ViewListTrademark",
components: {
  editTrademark: EditTrademark,
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
