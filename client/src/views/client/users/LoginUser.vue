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
                    <a class="lnk-toggler" data-panel=".panel-signup" href="#"
                      >Sign Up Free!</a
                    >
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
      errors: {
        email: "",
        password: "",
      },
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
      }
      if (!this.password) {
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
        this.$swal.fire(res.message, "", res.status);
      }
    },
  },
};
</script>
<style scoped>
* {
  margin: auto;
  padding: auto;
}

@media (min-width: 576px) and (max-width: 767px) {
  .col-sm-4 {
    max-width: 33.33%;
    flex: auto;
  }

  .hidden-sm {
    display: none;
  }
  .authfy-panel-left,
  .authfy-panel-right {
    float: left;
  }
}

@media (min-width: 320px) and (max-width: 375px) {
  body {
    background-size: cover;
  }
}

body,
html {
  background-color: #f0f2f5;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100%;
  height: 100vh;
  text-rendering: optimizeLegibility;
}

.dust-paarticle {
  position: absolute;
  width: 100%;
}

.feedback-invalid {
  margin-top: -15px;
  margin-bottom: 20px;
  text-align: left;
  color: red;
}

#snell {
  position: absolute;
  top: 0;
  width: 100%;
}

.fa-eye-slash {
  cursor: pointer;
}

#eye1 {
  animation: swing ease-in-out 0.6s infinite alternate;
  transform-origin: bottom;
  transform-box: fill-box;
  left: calc(52% - 0rem);
}

#eye2 {
  animation: swing ease-in-out 0.5s infinite alternate;
  transform-origin: bottom;
  transform-box: fill-box;
  left: calc(40% - 0rem);
}

#dust-paarticle path {
  transform-box: fill-box;
  transform-origin: center;
}

/*************swing************/
@keyframes swing {
  0% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(-8deg);
  }
}

.position-set {
  position: absolute;
  top: 5%;
}

/*--------------------*/
/* 02. Common CSS */
/*--------------------*/

body {
  font-family: "Titillium Web", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #44525f;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

a {
  text-decoration: none;
  color: #2d385e;
}

a:focus {
  outline: none;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Titillium Web", sans-serif;
  color: #2d385e;
}

a,
a:hover,
a:focus {
  color: #4f77ff;
}

.row {
  padding: 0px;
}

.btn-primary {
  background-color: #4f77ff;
  border-color: #4f77ff;
}

.btn-primary:hover,
.btn-primary:active:hover,
.btn-primary:focus,
.btn-primary:active:focus,
.btn-primary:active,
.btn-primary.active {
  background-color: #486ff2;
  border-color: #486ff2;
}

.authfy-login .btn.btn-lg {
  border-radius: 3px;
  box-shadow: 0px 2px 3px #9c9c9c;
}

.brand-logo {
  margin-top: 0px;
  margin-bottom: 35px;
  text-align: center;
}

/*--------------------*/
/* 03. Section Panel UI CSS */
/*--------------------*/

.authfy-container {
  margin-top: 70px;
  margin-bottom: 70px;
}

.authfy-panel-left {
  background: linear-gradient(-180deg, #b90000, #f63);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffffff;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  -webkit-box-shadow: 0px 3px 6px #b3b3b3;
  box-shadow: 0px 3px 6px #b3b3b3;
}

.authfy-panel-right {
  background-color: #ffffff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  -webkit-box-shadow: 0px 2px 6px 0px #b3b3b3;
  box-shadow: 0px 2px 6px 0px #b3b3b3;
}

.authfy-login,
.authfy-panel-left .brand-col {
  height: 460px;
}
.authfy-panel-left .brand-col {
  display: table;
  width: 100%;
  padding: 25px;
}

.authfy-panel-left .brand-col .headline {
  display: table-cell;
  vertical-align: middle;
}

.authfy-panel-left .brand-col .headline h1,
.authfy-panel-left .brand-col .headline h2,
.authfy-panel-left .brand-col .headline h3 {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
}

.authfy-login {
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
}

.authfy-panel {
  padding: 20px 30px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  opacity: 0;
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
}

.authfy-panel .authfy-heading {
  margin-bottom: 30px;
}

.authfy-login .auth-title {
  color: #ee4d2d;
  font-weight: 700;
}

.authfy-login .authfy-panel.active {
  opacity: 1;
  transform: translateX(0);
  -webkit-transform: translateX(0);
}

.brand-col .social-buttons a {
  color: #ffffff;
  margin-top: 15px;
}

.brand-col .social-buttons a:hover {
  color: white;
  opacity: 0.9;
}

.brand-col .social-buttons .btn-facebook {
  background: #3b5998;
}
.brand-col .social-buttons .btn-twitter {
  background: #00aced;
}
.brand-col .social-buttons .btn-google {
  background: #c32f10;
}

.brand-col .social-buttons a > span {
  padding-left: 5px;
}

.panel-login {
  margin-top: 20px;
}

.panel-login .remember-row {
  margin-bottom: 10px;
}

.panel-login .remember-row label {
  font-weight: normal;
  position: relative;
  cursor: pointer;
  color: #666;
  padding-left: 24px;
}

.authfy-login .forgotPwd {
  text-align: right;
  margin-top: 10px;
}

.panel-login .form-control,
.panel-signup .form-control,
.panel-forgot .form-control {
  background-color: #fff;
  color: #333333;
  font-size: 18px;
  height: 50px;
  margin-bottom: 20px;
  padding: 12px 22px;
  border-radius: 3px;
  border: solid 1px #bcc2ce;
  outline: none;
  -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1),
    0 0 2px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.1);
}

.authfy-panel.panel-forgot {
  padding-top: 40px;
}

.panel-login .form-control:focus,
.panel-signup .form-control:focus,
.panel-forgot .form-control:focus {
  border-color: #ee4d2d;
  z-index: 2;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #ee4d2d;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #ee4d2d;
}

.pwdMask {
  position: relative;
}

.pwdMask .pwd-toggle {
  color: #cccccc;
  position: absolute;
  z-index: 2;
}

.panel-login .pwdMask .pwd-toggle,
.panel-signup .pwdMask .pwd-toggle {
  top: 15px;
  right: 15px;
}

.pwdMask .pwd-toggle:hover,
.pwdMask .pwd-toggle:focus {
  cursor: pointer;
}

.pwdMask .pwd-toggle:hover,
.pwdMask .pwd-toggle:focus,
.pwdMask .pwd-toggle.fa-eye {
  color: #4f77ff;
}

.panel-signup .term-policy a {
  text-decoration: underline;
}

/*--------------------*/
/* 04. Check box UI CSS */
/*--------------------*/

.checkbox input[type="checkbox"] {
  position: absolute;
  right: 9000px;
}

.checkbox input[type="checkbox"] + .label-text:before,
.checkbox input[type="checkbox"] + .label-text:after {
  font-size: 11px;
  display: inline-block;
  width: 17px;
  height: 17px;
  padding: 2px;
  margin-left: 0;
  position: absolute;
  top: 2px;
  left: 0;
}

.checkbox input[type="checkbox"] + .label-text:before {
  content: "";
  background-color: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 3px;
  cursor: pointer;
  -webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
  transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
}

.checkbox input[type="checkbox"] + .label-text:after {
  background-color: #ee4d2d;
  color: #ffffff;
  border-radius: 2px;
  border-color: #ee4d2d;
  line-height: 1.4;
}

.checkbox input[type="checkbox"] {
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}
.checkbox input[type="checkbox"]:focus + .label-text:before {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.checkbox input[type="checkbox"]:checked + .label-text:after {
  font-family: "FontAwesome";
  content: "\f00c";
}

/*--------------------*/
/* 05. Responsive CSS */
/*--------------------*/

@media (min-width: 768px) {
  .authfy-panel {
    padding: 20px;
  }
}

@media (max-width: 767px) {
  .authfy-panel-left,
  .authfy-panel-right {
    box-shadow: none;
  }

  .authfy-panel-left {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .authfy-panel-right {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .authfy-panel-left .brand-col {
    /* height: 300px; */
    text-align: center;
  }

  .term-policy {
    font-size: 75%;
  }
}

@media (max-width: 650px) {
  .authfy-panel-left {
    display: none;
  }

  .authfy-panel-right {
    width: 100%;
  }

  .authfy-container {
    margin: 20px auto;
  }
}

@media (min-width: 320px) and (max-width: 375px) {
  body {
    background-size: cover;
  }
  .authfy-login .authfy-panel {
    padding: 20px;
  }

  .panel-login .remember-row {
    margin-bottom: 10px;
    font-size: 14px;
  }
}

@media (max-width: 320px) {
  .authfy-login {
    height: 480px;
  }
  .authfy-heading p {
    font-size: 14px;
  }

  .remember-row .col-sm-6 {
    width: 100%;
  }

  .authfy-login .forgotPwd {
    text-align: left;
    margin-top: 0px;
  }
}

@media (min-width: 1200px) {
  .col-lg-offset-3 {
    margin-left: 25%;
  }
  .col-lg-6 {
    width: 50%;
  }
  .col-lg-1,
  .col-lg-10,
  .col-lg-11,
  .col-lg-12,
  .col-lg-2,
  .col-lg-3,
  .col-lg-4,
  .col-lg-5,
  .col-lg-6,
  .col-lg-7,
  .col-lg-8,
  .col-lg-9 {
    float: left;
  }
}

@media (min-width: 768px) {
  .col-sm-1,
  .col-sm-10,
  .col-sm-11,
  .col-sm-12,
  .col-sm-2,
  .col-sm-3,
  .col-sm-4,
  .col-sm-5,
  .col-sm-6,
  .col-sm-7,
  .col-sm-8,
  .col-sm-9 {
    float: left;
  }
}
</style>
