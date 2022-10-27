<template>
  <div id="header-purchase">
    <div class="header-layout">
      <div class="container">
        <div class="scroll-x">
          <ul class="flex-row-space-between-center purchase width-700px">
            <li
              @click="
                nextParams(1, 'wait_comfirm', 'text-warning', 'Wait Comfirm')
              "
              :class="{ active: this.$route.path.includes('wait_comfirm') }"
            >
              Wait Comfirm
            </li>
            <li
              @click="nextParams(2, 'wait_goods', 'text-warning', 'Wait Goods')"
              :class="{ active: this.$route.path.includes('wait_goods') }"
            >
              Wait Goods
            </li>
            <li
              @click="nextParams(3, 'delivering', 'text-warning', 'Delivering')"
              :class="{ active: this.$route.path.includes('delivering') }"
            >
              Delivering
            </li>
            <li
              @click="nextParams(4, 'delivered', 'text-success', 'Delivered')"
              :class="{ active: this.$route.path.includes('delivered') }"
            >
              Delivered
            </li>
            <li
              @click="nextParams(5, 'cancelled', 'text-danger', 'Cancelled')"
              :class="{ active: this.$route.path.includes('cancelled') }"
            >
              Cancelled
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      ID: "",
    };
  },
  methods: {
    nextParams(ID, link, color, titel_status) {
      this.$emit("next", ID, link, color, titel_status);
    },
  },
  computed: {},
};
</script>
<style scoped>
</style>
