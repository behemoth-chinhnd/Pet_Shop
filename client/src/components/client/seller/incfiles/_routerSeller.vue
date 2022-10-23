<template>
  <div id="header-site">
    <div class="header-layout">
      <div class="flex">
        <ul class="flex header-site">
          <li v-if="this.$route.path.includes('/seller')">
            <router-link :to="{ path: '/seller' }"> Seller </router-link>
          </li>
          <li v-if="this.$route.path.includes('/seller/profile')">
            <router-link to="/seller/profile"> Profile </router-link>
          </li>
          <!-- product -->
          <li v-if="this.$route.path.includes('/seller/products')">
            <router-link to="/seller/products"> Products </router-link>
          </li>

          <li v-if="this.$route.path.includes('/seller/products/create')">
            <router-link to="/seller/products/create"> Create </router-link>
          </li>
          <li v-if="this.$route.path.includes('/seller/products/edit/')">
            <router-link to=""> Edit </router-link>
          </li>

          <!-- Admin -->
          <li v-if="this.$route.path.includes('/admin')">
            <router-link :to="{ path: '/admin' }"> Admin </router-link>
          </li>
          <!-- Category -->
          <li v-if="this.$route.path.includes('/admin/category')">
            <router-link to="/admin/category"> Category </router-link>
          </li>
          <li v-if="this.$route.path.includes('/admin/category/create')">
            <router-link to="/admin/category/create"> Create </router-link>
          </li>
          <li v-if="this.$route.path.includes('/admin/category/edit/')">
            <router-link to=""> Edit </router-link>
          </li>
          <!-- Spacies -->
          <li v-if="this.$route.path.includes('/admin/species')">
            <router-link to="/admin/species"> Species </router-link>
          </li>
          <li v-if="this.$route.path.includes('/admin/species/create')">
            <router-link to="/admin/species/create"> Create </router-link>
          </li>
          <li v-if="this.$route.path.includes('/admin/species/edit/')">
            <router-link to=""> Edit </router-link>
          </li>
           <!-- Trademark -->
           <li v-if="this.$route.path.includes('/admin/trademark')">
            <router-link to="/admin/trademark"> Trademark </router-link>
          </li>
          <li v-if="this.$route.path.includes('/admin/trademark/create')">
            <router-link to="/admin/trademark/create"> Create </router-link>
          </li>
          <li v-if="this.$route.path.includes('/admin/trademark/edit/')">
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
