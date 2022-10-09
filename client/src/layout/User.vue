<template>
  <div id="client">
    <header-user></header-user>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderUser from "@/components/client/users/HeaderUser.vue";
export default {
  components: {
    headerUser: HeaderUser,
  },
  methods: {
    toggle() {
      document.getElementsByClassName("sold").classList.toggle("hide");
    },
  },
  computed: {},
};
</script>

<style scoped>
  
</style>
