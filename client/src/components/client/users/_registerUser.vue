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
                  <h3 class="auth-title">REGISTER NEW ACCOUNT</h3>
                  <p>
                    If you already have an account
                    <router-link to="/login"> Login Now! </router-link>
                  </p>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                    <form
                      action=""
                      name="registerForm"
                      method="POST"
                      @submit.prevent="register()"
                      class="needs-validation text-left"
                      novalidate
                    >
                      <div class="form-group row">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Name"
                          v-model="user.name"
                          @blur="validate()"
                          v-bind:class="{ 'is-invalid': errors.name }"
                          required
                        />
                        <div class="feedback-invalid" v-if="errors.name">
                          {{ errors.name }}
                        </div>
                      </div>

                      <div class="form-group row">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email"
                          v-model="user.email"
                          @blur="validate()"
                          v-bind:class="{ 'is-invalid': errors.email }"
                          required
                        />
                        <div class="feedback-invalid" v-if="errors.email">
                          {{ errors.email }}
                        </div>
                      </div>
                      <div class="form-group row">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Birthday - Ex: 01/01/2022"
                          v-model="user.birthday"
                          @blur="validate()"
                          v-bind:class="{
                            'is-invalid': errors.birthday,
                          }"
                          required
                        />
                        <div class="feedback-invalid" v-if="errors.birthday">
                          {{ errors.birthday }}
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-md-9 flex-row-start-center gap-20px">
                          <div class="form-group flex-row-start-center gap-5px">
                            <label>Male</label>
                            <input
                              class="mgl-5px"
                              type="radio"
                              v-model="user.sex_id"
                              @blur="validate()"
                              value="1"
                            />
                          </div>

                          <div class="form-group flex-row-start-center gap-5px">
                            <label>Female</label>
                            <input
                              type="radio"
                              v-model="user.sex_id"
                              @blur="validate()"
                              value="2"
                            />
                          </div>

                          <div class="feedback-invalid" v-if="errors.sex_id">
                            {{ errors.sex_id }}
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.password"
                          placeholder="Password"
                          @blur="validate()"
                          v-bind:class="{
                            'is-invalid': errors.password,
                          }"
                          required
                        />
                        <div class="feedback-invalid" v-if="errors.password">
                          {{ errors.password }}
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="input"
                          class="col-md-3 col-form-label"
                        ></label>
                        <div class="col-md-9">
                          <div class="left group-btn">
                            <b-button type="submit" variant="primary "
                              >Register</b-button
                            >
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsAUTH = createNamespacedHelpers("AUTH");
export default {
  data() {
    return {
      namePage: "Register",
      errors: [],
      users: [],
      user:  {
        name: "",
        email: "",
        password: "",
        birthday: "",
        sex_id: 1,
      }
    };
  },
  created() {},
  methods: {
    ...mapActionsAUTH.mapActions({ registerUser: "register" }),

    validate() {
      let isValid = true;
      this.errors = {
        name: "",
        email: "",
        password: "",
        birthday: "",
        sex_id: "",
      };
      if (!this.user.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      } else if (!this.user.email) {
        this.errors.email = "Error: Email not Empty ";
        isValid = false;
      } else if (!this.user.birthday) {
        this.errors.birthday = "Error: Birthday not Empty ";
        isValid = false;
      } else if (!this.user.password) {
        this.errors.password = "Error: Password not Empty ";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },

    async register() {
      if (this.validate()) {
        const res = await this.registerUser(this.user);
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
  