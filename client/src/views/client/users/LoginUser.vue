<template>
  <div class="body">
    <section id="main-body">
      <div class="login-user">
        <div class="container bg-white mgt--20px">
          <div class="panel-body flex-row-space-between-center">
            <div class="btn">
              <button class="btn btn-primary text-white">
                <router-link to="/register">Register</router-link>
              </button>
            </div>
          </div>
          <h1>Token: {{this.$store.state.AUTH.state.userToken}}</h1>
          <form action="" @submit.prevent="login()" class="needs-validation text-left" novalidate>
            <div class="form-group row">
              <label for="email" class="col-md-3 col-form-label">Email</label>
              <div class="col-md-9">
                <input id="email" type="email" class="form-control" v-model="email" @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.email }" required />
                <div class="feedback-invalid" v-if="errors.email">
                  {{ errors.email }}
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label for="password" class="col-md-3 col-form-label">Password</label>
              <div class="col-md-9">
                <input id="password" type="password" class="form-control" v-model="password" @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.password }" required />
                <div class="feedback-invalid" v-if="errors.password">
                  {{ errors.password }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="input" class="col-md-3 col-form-label"></label>
              <div class="col-md-9">
                <div class="left group-btn">
                  <b-button type="submit" variant="primary ">Save</b-button>
                  <b-button variant="danger mgl-10px" @click="reset()">Test</b-button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// import { mapGetters } from "@/store/modules/auth";
// import api from '@/plugin/axios';
export default {
  // name: "LoginUser",
  data() {
    return {
      errors: {
        email: "",
        password: ""
      },
      email: '',
      password: ''
    };
  },
  // computed:mapGetters(['token']),
  created() {
  },


  methods: {
    // ...mapActions([""]),
    validate() {
      let isValid = true;
      this.errors = {
        email: "",
        password: ""
      };
      if (!this.email) {
        this.errors.email = "Error: Email not Empty ";
        isValid = false;
      }
      if (!this.password) {
        this.errors.password = "Error: Password not Empty ";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async login() {
      if (this.validate()) {
        console.log("login func...");
        this.$store.dispatch("AUTH/login", { email: this.email, password: this.password }) //conect Store

      };
    },
    reset() {
      (this.email = "dominh020195@gmail.com"), (this.password = "12345678");
    },
  },
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
    