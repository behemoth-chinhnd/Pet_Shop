<template>
  <div v-if="this.$store.state.CART.state.total_items <= 0" class="empty-cart">
    <img class="img-empty" src="@/assets/images/icons/cart.png" alt="" />
    <p>Cart Empty!</p>
  </div>
</template>
<script>
</script>
<style>
</style>