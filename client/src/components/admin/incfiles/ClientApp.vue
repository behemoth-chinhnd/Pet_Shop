<template>
  <div class="client">
    <section id="client" class="text-white">
      <div v-if="this.client.login == 'online'" class="flex-row-space-between-center">
        <h1>Xin chào: {{ client.username }}</h1>
        <button class="btn btn-danger mgl-20px" @click="logoutUser">Logout</button>
      </div>
      <div v-if="this.client.login == 'offline'" class="flex-row-end">
        <button herf="/login" class="btn btn-primary" @click="logoutUser">Login</button>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
import api from '@/plugin/axios';

export default {
  data() {
    return {
      id: "",
      name: "",
      username: "",
      email: "",
      password: "",
      client: {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
        username: "",
        login: localStorage.getItem("login"),
      },
    };
  },

  created() {
  },
  mounted() {
    console.log(this);
    this.checkUser();
  },
  computed: {
    // ...mapper.mapState(["product", "products"]),
  },

  methods: {
    // ...mapper.mapActions(["click", "fetchProducts"]),

    logoutUser() {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.setItem("login", "offline");
      window.location.href = "/admin/login";
    },
    async checkUser() {
      const header = {Authorization:"eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjY1NTY0ODg5fQ.-J3L-LkuGEU8kLP-uL95qmLDbmvDqqT_mB_CuNvoDMI"}
      console.log(header);
      await api
        .get("/api/checkUser", {headers:header}).then(res=> {
          console.log(res)
          if (!res.data.success) {
            localStorage.setItem("login", "offline");
            window.location.href = "/admin/login";
          }

          if (res.data.success) {
            this.client.username = res.data.user.username;
            this.client.password = res.data.user.password;
            localStorage.setItem("login", "online");
          }
        });
    },
  },
  computed: {},
};
</script>
