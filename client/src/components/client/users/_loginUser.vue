<template>
  <div class="login-client">
    <div class="container-fluid">
      <div class="row">
        <div
          class="
            authfy-container
            col-xs-12
            col-sm-10
            col-md-10
            col-lg-6
            col-sm-offset-1
            col-md-offset-2
            col-lg-offset-3
          "
        >
          <div class="col-sm-5 authfy-panel-left">
            <div class="brand-col">
              <div class="headline">
                <!-- brand-logo start -->
                <div class="brand-logo">
                  <img src="/pet2.png" width="150" alt="brand-logo" />
                </div>
                <!-- ./brand-logo -->
                <p>Login using social media to get quick access</p>
                <!-- social login buttons start -->
                <div class="row social-buttons">
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-facebook">
                      <i class="fa fa-facebook"></i>
                      <span class="hidden-xs hidden-sm"
                        >Signin with facebook</span
                      >
                    </a>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-twitter">
                      <i class="fa fa-twitter"></i>
                      <span class="hidden-xs hidden-sm"
                        >Signin with twitter</span
                      >
                    </a>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-google">
                      <i class="fa fa-google-plus"></i>
                      <span class="hidden-xs hidden-sm"
                        >Signin with google</span
                      >
                    </a>
                  </div>
                </div>
                <!-- ./social-buttons -->
              </div>
            </div>
          </div>
          <div class="col-sm-7 authfy-panel-right">
            <!-- authfy-login start -->
            <div class="authfy-login">
              <!-- panel-login start -->
              <div class="authfy-panel panel-login text-center active">
                <div class="authfy-heading">
                  <h3 class="auth-title">LOGIN TO PETSHOP</h3>
                  <p>
                    Don’t have an account?
                    <router-link to="/register"> Sign Up Free! </router-link>
                  </p>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                    <form
                      action=""
                      name="loginForm"
                      class="loginForm needs-validation"
                      method="POST"
                      @submit.prevent="login()"
                      novalidate
                    >
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control email"
                          name="email"
                          placeholder="Email address"
                          v-model="email"
                          @blur="validate()"
                          v-bind:class="{ 'is-invalid': errors.email }"
                          required
                        />
                        <div class="feedback-invalid" v-if="errors.email">
                          {{ this.errors.email }}
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="pwdMask">
                          <input
                            :type="this.type"
                            class="form-control"
                            name="password"
                            placeholder="Password"
                            v-model="password"
                            @blur="validate()"
                            v-bind:class="{ 'is-invalid': errors.password }"
                            required
                          />

                          <i
                            class="fa pwd-toggle"
                            :class="{
                              'fa-eye-slash': !isText,
                              'fa-eye': isText,
                            }"
                            @click="typeText()"
                          ></i>
                        </div>
                        <div class="feedback-invalid" v-if="errors.password">
                          {{ this.errors.password }}
                        </div>
                      </div>

                      <!-- start remember-row -->
                      <div class="remember-row flex-row-space-between">
                        <div class="">
                          <label class="checkbox text-left">
                            <input type="checkbox" value="remember-me" />
                            <span class="label-text">Remember me</span>
                          </label>
                        </div>
                        <div class="">
                          <p class="forgotPwd">
                            <a
                              class="lnk-toggler"
                              data-panel=".panel-forgot"
                              href="#"
                              >Forgot password?</a
                            >
                          </p>
                        </div>
                      </div>
                      <!-- ./remember-row -->
                      <div class="form-group">
                        <button
                          class="btn btn-lg submit btn-block text-white"
                          type="submit"
                        >
                          Login with Email
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <!-- ./panel-login -->
              <!-- panel-signup start -->
              <div class="authfy-panel panel-signup text-center">
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                    <div class="authfy-heading">
                      <h3 class="auth-title">Sign up for free!</h3>
                    </div>
                    <form
                      name="signupForm"
                      class="signupForm"
                      action="#"
                      method="POST"
                    >
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          name="username"
                          placeholder="Email address"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          name="fullname"
                          placeholder="Full name"
                        />
                      </div>
                      <div class="form-group">
                        <div class="pwdMask">
                          <input
                            :type="this.type"
                            class="form-control"
                            name="password"
                            placeholder="Password"
                          />
                          <span
                            class="fa fa-eye-slash"
                            @click="this.type = 'text'"
                            @mouseleave="this.type = 'password'"
                          ></span>
                        </div>
                      </div>
                      <div class="form-group">
                        <p class="term-policy text-muted small">
                          I agree to the <a href="#">privacy policy</a> and
                          <a href="#">terms of service</a>.
                        </p>
                      </div>
                      <div class="form-group">
                        <button
                          class="btn btn-lg btn-primary btn-block"
                          type="submit"
                        >
                          Sign up with email
                        </button>
                      </div>
                    </form>
                    <a class="lnk-toggler" data-panel=".panel-login" href="#"
                      >Already have an account?</a
                    >
                  </div>
                </div>
              </div>
              <!-- ./panel-signup -->
              <!-- panel-forget start -->
              <div class="authfy-panel panel-forgot">
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                    <div class="authfy-heading">
                      <h3 class="auth-title">Recover your password</h3>
                      <p>
                        Fill in your e-mail address below and we will send you
                        an email with further instructions.
                      </p>
                    </div>
                    <form
                      name="forgetForm"
                      class="forgetForm"
                      action="#"
                      method="POST"
                    >
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          name="username"
                          placeholder="Email address"
                        />
                      </div>
                      <div class="form-group">
                        <button
                          class="btn btn-lg btn-primary btn-block"
                          type="submit"
                        >
                          Recover your password
                        </button>
                      </div>
                      <div class="form-group">
                        <a
                          class="lnk-toggler"
                          data-panel=".panel-login"
                          href="#"
                          >Already have an account?</a
                        >
                      </div>
                      <div class="form-group">
                        <a
                          class="lnk-toggler"
                          data-panel=".panel-signup"
                          href="#"
                          >Don’t have an account?</a
                        >
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <!-- ./panel-forgot -->
            </div>
            <!-- ./authfy-login -->
          </div>
        </div>
      </div>
      <!-- ./row -->
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsAUTH = createNamespacedHelpers("AUTH");

export default {
  data() {
    return {
      // isValid: false,
      namePage: "Login",
      errors: [],
      email: "",
      password: "",
      isText: false,
      type: "password",
    };
  },
  methods: {
    ...mapActionsAUTH.mapActions({ LoginUser: "login" }),
    validate() {
      let isValid = true;
      this.errors = {
        email: "",
        password: "",
      };
      if (!this.email) {
        this.errors.email = "Error: Email not Empty ";
        isValid = false;
      } else if (!this.password) {
        this.errors.password = "Error: Password not Empty ";
        isValid = false;
      }
      return isValid;
    },
    typeText() {
      if (this.type === "password") {
        this.isText = true;
        this.type = "text";
      } else if (this.type === "text") {
        this.isText = false;
        this.type = "password";
      }
    },
    typePassword() {
      this.type = "password";
    },

    async login() {
      if (this.validate()) {
        const res = await this.LoginUser({
          email: this.email,
          password: this.password,
        });
        this.errors = res.errors;
        this.$swal.fire(
          this.namePage + " " + res.alert.message,
          "",
          res.alert.status
        );
      }
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/login-user.css";
</style>
