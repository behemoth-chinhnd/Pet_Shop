<template>
  <div
    v-if="this.$store.state.CART.state.total_items <= 0"
    class="empty-cart bg-white height-400px"
  >
    <img class="img-empty" src="@/assets/images/icons/cart.png" alt="" />
    <p class="mgb-20px">Cart Empty!</p>
    <router-link to="/products">
      <button class="btn submit right">Buy Now</button>
    </router-link>
  </div>
</template>
<script>
</script>