<template>
  <div class="login-admin">
    <header class="top-header"></header>
    <div id="mainCoantiner">
      <div class="main-header">
        <div class="header-social">
          <ul>
            <li><a id="nmberone">1</a></li>
            <li><a id="nmbertwo">2</a></li>
            <li><a id="numberthree">3</a></li>
            <li><a>4</a></li>
          </ul>
        </div>
        <div class="folio-btn">
          <a class="folio-btn-item ajax" href="#"
            ><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
          ></a>
        </div>
      </div>

      <!--dust particel-->
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
      <!--Dust particle end--->

      <div class="container text-center text-dark mt-5">
        <div class="row">
          <div class="col-lg-4 d-block mx-auto mt-5">
            <div class="row">
              <div class="col-xl-12 col-md-12 col-md-12">
                <div class="card">
                  <div class="card-body wow-bg" id="formBg">
                    <h3 class="colorboard">ADMIN PANEL</h3>

                    <p class="text-muted">Sign In to your account</p>

                    <div class="input-group mb-3">
                      <input
                        type="email"
                        name="email"
                        class="form-control textbox-dg"
                        placeholder="Email"
                        v-model="email"
                      />
                    </div>
                    <div class="input-group mb-4">
                      <input
                        type="password"
                        class="form-control textbox-dg"
                        placeholder="Password"
                        v-model="password"
                      />
                    </div>

                    <div class="row">
                      <div class="col-12">
                        <button
                          type="button"
                          class="btn btn-primary btn-block logn-btn"
                          @click="login"
                        >
                          Login
                        </button>
                      </div>
                      <div class="col-12">
                        <a href="#" class="btn btn-link box-shadow-0 px-0"
                          >Forgot password?</a
                        >
                      </div>
                    </div>

                    <div class="mt-6 btn-list">
                      <button
                        type="button"
                        class="socila-btn btn btn-icon btn-facebook fb-color"
                      >
                        <i class="fab fa-facebook-f faa-ring animated"></i>
                      </button>
                      <button
                        type="button"
                        class="socila-btn btn btn-icon btn-google incolor"
                      >
                        <i class="fab fa-linkedin-in faa-flash animated"></i>
                      </button>
                      <button
                        type="button"
                        class="socila-btn btn btn-icon btn-twitter tweetcolor"
                      >
                        <i class="fab fa-twitter faa-shake animated"></i>
                      </button>
                      <button
                        type="button"
                        class="socila-btn btn btn-icon btn-dribbble driblecolor"
                      >
                        <i class="fab fa-dribbble faa-pulse animated"></i>
                      </button>
                    </div>
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
const { mapActions } = createNamespacedHelpers("ADAU");
export default {
  data() {
    return {
      namePage: "Login",
      headers: "",
      errors: "",
      email: "",
      password: "",
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    ...mapActions({
      loginAdmin: "login",
    }),
    async login() {
     const res = await this.loginAdmin( {
          email: this.email,
          password: this.password,
        });
        this.errors = res.errors;
        this.$swal.fire(
          this.namePage + " " + res.alert.message,
          "",
          res.alert.status
        );
    },
  },
  computed: {},
};
</script>
<style scoped>
@import "@/assets/css/login-admin.css";
</style>
