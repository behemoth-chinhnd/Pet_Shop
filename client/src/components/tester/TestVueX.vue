<template>
  <div class="home">
    <!-- <h2>Number of click: {{ count }}</h2> -->
    <!-- <h2>Number of double click: {{ double }}</h2> -->
    <button @click="increment">Click to increment</button>
  </div>
</template>
<script>
export default {
  methods: {
    increment() {
      this.$store.state.count++;
    },
  },
};
</script>
