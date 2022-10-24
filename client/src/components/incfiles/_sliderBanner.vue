<template>
   
  <agile>
    <div class="slide slider-banner">
      <img
        class="width-100 height-100"
        src="@/assets/images/plugin/banner-desktop-1.jpg"
        alt=""
      />
    </div>
    <div class="slide">
      <img
        class="width-100 height-100"
        src="@/assets/images/plugin/banner-desktop-2.jpg"
        alt=""
      />
    </div>
    <div class="slide">
      <img
        class="width-100 height-100"
        src="@/assets/images/plugin/banner-desktop-3.jpg"
        alt=""
      />
    </div>
  </agile>
</template>
<script>
import { VueAgile } from "vue-agile";
export default {
  name: "SliderBanner",
  components: {
    agile: VueAgile,
  },
  data() {
    return {
      
    };
  },
  beforeCreate() {},
  created() {
  },
  mounted() {},
  props: {
  },
  methods: {
  },
  watch: {},
  computed: {},
};
</script>
<style>
</style>
