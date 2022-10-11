<template>
  <div class="address mgb-10px">
    <div class="address-header"></div>
    <div class="address-body">
      <div class="address-titel gap-10px">
        <svg
          height="16"
          viewBox="0 0 12 16"
          width="12"
          class="shop-pet-svg-icon icon-location-marker"
        >
          <path
            d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
            fill-rule="evenodd"
          ></path>
        </svg>

        <p>Địa Chỉ Nhận Hàng</p>
      </div>
      <div class="address-info flex-row-start-center fz-15 gap-10px">
        <b style="font-size: 15px">{{
          address_order.name + " " + address_order.phone + " "
        }}</b>
        <span>{{
          " " +
          address_order.description +
          "," +
          address_order.apartment_number +
          "," +
          address_order.street +
          ", " +
          address_order.county +
          ", " +
          address_order.city
        }}</span>

        <div class="is-default">Default</div>
        <div class="change">
          <router-link to="/address_order"> Change </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsADDR = createNamespacedHelpers("ADDR");
export default {
  name: "DefaultAdressOrder",
  components: {
  },
  data() {
    return {
      address_order: this.$store.state.ADDR.state.is_default,
    };
  },
  created() {
    this.getAddress();
  },
  computed: {
  },
  methods: {
    ...mapActionsADDR.mapActions({
      getIsDefaultADDR: "getIsDefault"
    }),
    async getAddress() {
      await this.getIsDefaultADDR()
      .then(()=>{
        this.address_order = this.$store.state.ADDR.state.is_default;
      })
    },
  },
};
</script>