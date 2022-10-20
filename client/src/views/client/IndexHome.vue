<template>
  <div id="index">
    <div class="container box banner-mobile width-100">
              <div class="box-12">
                <slider-banner></slider-banner>
              </div>
            </div>
    <div class="container box banner width-100">
      <div class="box-3">
        <img
          class="width-100 height-100"
          src="@/assets/images/plugin/banner-desktop-3.jpg"
          alt=""
        />
      </div>
      <div class="box-6">
        <img
          class="width-100 height-100"
          src="@/assets/images/plugin/banner-desktop-1.jpg"
          alt=""
        />
      </div>
      <div class="box-3 box-item">
        <div class="box-item-12">
          <img
            class="width-100 height-100"
            src="@/assets/images/plugin/banner-desktop-2.jpg"
            alt=""
          />
        </div>
        <div class="box-item-12">
          <img
            class="width-100 height-100"
            src="@/assets/images/plugin/banner-desktop-3.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- <tab-menu-dog :ID="ID" @next="nextEdit"></tab-menu-dog> -->
    <ListProduct></ListProduct>
    <main id="main" class=""></main>
  </div>
</template>

<script>
import SliderBanner from "@/components/incfiles/_sliderBanner.vue";
import ListProduct from "@/components/product/_showProduct.vue";

export default {
  components: {
    ListProduct,
    sliderBanner: SliderBanner,
  },
  data() {
    return {
      isOn: false,
      isOff: true,
    };
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style></style>
