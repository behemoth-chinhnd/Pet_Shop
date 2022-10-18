<template>
  <div class="body-saler">
    <edit-species ></edit-species>

 
    <!-- <list-species></list-species> -->

  </div>
</template>
<script>
import EditSpecies from "@/components/admin/species/_editSpecies.vue"
// import ListSpecies from "@/components/admin/species/_showSpecies.vue"

export default {
  name: "ViewListSpacies",
  components: {
    editSpecies: EditSpecies,
    // listSpecies: ListSpecies
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
