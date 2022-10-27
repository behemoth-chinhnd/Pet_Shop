<template >
  <div></div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("ADSP");
export default {
  components: {},
  name: "CurrencyInput",
  props: ["KeyWord"],
  data() {
    return {
      keyword:"",
      ID: "",
    };
  },
  created() {
    this.nextKeyword(this.KeyWord)
    console.log(`searchprops`,this.KeyWord );
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      editADSP: "edit",
      getItemADSP: "getItem",
    }),
    nextKeyword(KeyWord){
      console.log(`nextSearch`,KeyWord );

      this.$emit('nextSearch',KeyWord)
    }
  },
  computed: {

  },
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
  