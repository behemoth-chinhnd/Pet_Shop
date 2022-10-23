<template>
  <div class="user">
    <div class="container">
      <div class="body-user">
        <div class="container user-profile">
          <div class="profile-header">
            <router-link to="/user/profile">
              <h1 class="profile-title">Change Email Address</h1>
            </router-link>
            <div class="profile-content">
              Manage profile information for account security
            </div>
          </div>
          <div class="profile-body row">
            <div class="col-md-12 user-info">
              <form
                action=""
                @submit.prevent="save()"
                class="needs-validation text-left"
                novalidate
              >
                <div class="form-group row flex-row-start-center">
                  <label for="email" class="item-name col-form-label"
                    >Email:</label
                  >
                  <div id="email" class="item-value">
                    <input
                      class="input"
                      type="text"
                      placeholder="Email"
                      v-model="user.email"
                      @blur="validate()"
                      v-bind:class="{ 'is-invalid': errors.email }"
                      required
                    />
                    <div class="feedback-invalid" v-if="errors.email">
                      {{ this.errors.email }}
                    </div>
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="password" class="item-name col-form-label"
                    >Your Password:</label
                  >
                  <div id="password" class="item-value">
                    <input
                      class="input"
                      type="password"
                      placeholder="Enter password to confirm"
                      v-model="user.password"
                      @blur="validate()"
                      v-bind:class="{ 'is-invalid': errors.password }"
                      required
                    />
                    <div class="feedback-invalid" v-if="errors.password">
                      {{ this.errors.password }}
                    </div>
                  </div>
                </div>

                <div class="form-group row flex-row-start-center">
                  <label class="item-name col-md-3 col-form-label"></label>
                  <div class="item-value flex">
                    <button class="btn submit">Change</button>
                  </div>
                </div>
              </form>
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
  components: {},
  name: "ChangeEamil",
  data() {
    return {
      namePage: "Change Email",
      user: "",
      update: {
        email: "",
        password: "",
      },
      confirm_password:"",
      errors: [],
    };
  },
  created() {
    this.profile();
  },
  computed: {},
  methods: {
    ...mapActionsAUTH.mapActions({
      changeEmailUser: "changeEmail",
      getProfile: "profile",
    }),
    validate() {
      let isValid = true;
      this.errors = {
        email: "",
        password: "",
      };
      if (!this.user.email) {
        this.errors.email = "Email not Empty ";
        isValid = false;
      } else if (!this.user.password) {
        this.errors.password = "Please enter password to authenticate!";
        isValid = false;
      }
      return isValid;
    },
    async profile() {
      const res = await this.getProfile();
      if (res.errors) {
        this.errors = res.errors;
        this.$swal.fire("Errors", "", res.alert.status);
      } else {
        this.user = res;
      }
    },
    async save() {
      if (this.validate()) {
        this.errors = [];
        const input = {
          email: this.user.email,
          password: this.user.password,
        };
        this.$swal
          .fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const res = await this.changeEmailUser(input);
              this.errors = res.errors;
              this.$swal.fire(
                this.namePage + " " + res.alert.message,
                "",
                res.alert.status
              );
              this.user.password = "";
            }
            await this.profile();
          });
      }
    },
  },
};
</script>
<style scoped>
</style>
      