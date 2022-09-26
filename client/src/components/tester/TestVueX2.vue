<template>
  <div class="home">
    <h2>count: {{ count }}</h2>
  </div>
</template>
<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    //   double() {
    //     return this.$store.getters.double;
    //   },
    // },
    // method: {
    //   increment() {
    //     this.$store.commit("increment");
    //   },
  },
};
</script>
