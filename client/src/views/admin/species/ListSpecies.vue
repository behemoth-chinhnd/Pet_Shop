<template>
  <div class="body-saler">
    <list-species></list-species>

  </div>
</template>
<script>
import ListSpecies from "@/components/admin/species/_showSpecies.vue";

export default {
name: "ListSpecies",
components: {
  listSpecies: ListSpecies,
},
data() {
  return {}
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
