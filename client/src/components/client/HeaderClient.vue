<template>
  <div id="header-client">
    <header id="header" class="">
      <section id="header-top" class="fixed">
        <div class="container">
          <div class="list-menu-header height-110px">
            <div class="flex-row-space-between-center">
              <div class="left-item-header flex-row">
                <div class="logo">
                  <img src="images/Logo-M-3.png" alt="" />
                </div>
                <h1 class="text-white">SHOPPET.VN</h1>

                <!-- <select
                  class="select dark color-default"
                  name="select-header"
                  id="select-header"
                >
                  <option value="1"><a href="#">SAAS Users</a></option>
                  <option value="2">SAAS Users</option>
                  <option value="3">SAAS Users</option>
                  <option value="4">SAAS Users</option>
                </select> -->
              </div>

              <button class="menu-toggle">
                <i class="fa fa-bars"></i>
              </button>
            </div>

            <div class="flex-row-wrap gap-10px">
              <!-- <a class="icon warning" href="">
                <img src="images/Cart3.png" alt="" />
              </a>
              <a class="icon primary" href="">
                <img src="images/Compiling.png" alt="" />
              </a>
              <a class="icon warning" href="">
                <img src="images/Equalizer.png" alt="" />
              </a>
              <a class="icon warning" href="">
                <img src="images/Layout-4-blocks.png" alt="" />
              </a> -->
              <b-button  v-if="!this.$store.state.AUTH.state.isActive" variant="primary">
                <router-link  class="text-white" to="/login" >Login User</router-link>
              </b-button>
              <b-button v-if="!this.$store.state.AUTH.state.isActive" variant="primary">
                <router-link  class="text-white"  to="/register">Register</router-link>
              </b-button>
              <b-button v-if="this.$store.state.AUTH.state.isActive" variant="warning">
                <router-link  class="text-danger"  to="/profile">Hi, {{this.$store.state.AUTH.state.user.name}}</router-link>
              </b-button>
              <b-button v-if="this.$store.state.AUTH.state.isActive" variant="danger" @click="logout()">
                <i class="fa fa-sign-out"></i> Logout
              </b-button>
            </div>
          </div>
        </div>
      </section>
      <section id="header-bottom" class="top-110px">
        <div class="container">
          <div class="list-menu-header-bottom scroll-x">
            <ul id="menu-row" class="btn-list-dark">
              <li class="active">
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <router-link to="/products">Products</router-link>
              </li>
              <li>
                <router-link to="/carts">Carts</router-link>
              </li>
              <li>
                <router-link to="/orders">Order</router-link>
              </li>
              <li>
                <router-link to="/address_order">Address Order</router-link>
              </li>
              
            </ul>
            <div class="form-input-search">
              <!-- <i class="icon-search fa fa-search"></i>
              <input type="text" class="input-search" placeholder="Search" />
              <button class="icon-text button-search bg-danger-bland">Search</button> -->
            </div>
          </div>
        </div>
      </section>
    </header>
  </div>
</template>

<script>
// import ClientApp from "@/components/incfiles/ClientApp.vue";

export default {
  components: {
    // clientApp: ClientApp,
  },
  data() {
    return {
      // isOn: false,
      // isOff: true,
    };
  },
  created() {
    this.profile();
  },
  mounted() {
  },
  methods: {
    async logout() {
      await this.$store.dispatch("AUTH/logout") 
    },
    async profile() {
      await this.$store.dispatch("AUTH/profile") 
    },
  },
};
</script>

<style scoped>
#header-client #header-top {
  background: #b90000;
}

#header-client #header-bottom {
  background: #ffe2e5;
}

#header-client .warning {
  background: #ffc220;
}

#header-client .primary {
  background: #3699ff;
}

#header-client .gap-10px {
  gap: 10px;
}
</style>
