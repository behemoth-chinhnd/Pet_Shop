<template>
  <div id="header-site">
    <div class="header-layout">
      <div class="flex">
        <ul class="flex header-site">
          <li v-if="this.$route.path.includes('/saler')">
            <router-link :to="{ path: '/saler' }"> Saler </router-link>
          </li>
          <!-- product -->
          <li v-if="this.$route.path.includes('/saler/products')">
            <router-link to="/saler/products"> Products </router-link>
          </li>
          <li v-if="this.$route.path.includes('/saler/products/create')">
            <router-link to="/saler/products/create"> Create </router-link>
          </li>
          <li v-if="this.$route.path.includes('/saler/products/edit/')">
            <router-link to=""> Edit </router-link>
          </li>

          <!-- Admin -->
          <li v-if="this.$route.path.includes('/admin')">
            <router-link :to="{ path: '/admin' }"> Admin </router-link>
          </li>
          <!-- product -->
          <li v-if="this.$route.path.includes('/admin/category')">
            <router-link to="/admin/category"> Category </router-link>
          </li>
          <li v-if="this.$route.path.includes('/admin/category/create')">
            <router-link to="/admin/category/create"> Create </router-link>
          </li>
          <li v-if="this.$route.path.includes('/admin/category/edit/')">
            <router-link to=""> Edit </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {},
  computed: {},
};
</script>

<style scoped>
</style>
