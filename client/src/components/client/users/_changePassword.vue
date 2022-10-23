<template>
  <div class="user">
    <div class="container">
      <div class="body-user">
        <div class="container user-profile">
          <div class="profile-header">
            <router-link to="/user/profile">
              <h1 class="profile-title">Change Password</h1>
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
                  <label for="password" class="item-name col-form-label"
                    >Password:</label
                  >
                  <div id="password" class="item-value">
                    <input
                      class="input"
                      type="password"
                      placeholder="Password"
                      v-model="update.password"
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
                  <label for="new_password" class="item-name col-form-label"
                    >New Password:</label
                  >
                  <div id="new_password" class="item-value">
                    <input
                      class="input"
                      type="password"
                      placeholder="New Password"
                      v-model="update.new_password"
                      @blur="validate()"
                      v-bind:class="{ 'is-invalid': errors.new_password }"
                      required
                    />
                    <div class="feedback-invalid" v-if="errors.new_password">
                      {{ this.errors.new_password }}
                    </div>
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="new_password_confirmation" class="item-name col-form-label"
                    >New Password:</label
                  >
                  <div id="new_password_confirmation" class="item-value">
                    <input
                      class="input"
                      type="password"
                      placeholder=" New Password Comfirmation"
                      v-model="update.new_password_confirmation"
                      @blur="validate()"
                      v-bind:class="{ 'is-invalid': errors.new_password_confirmation }"
                      required
                    />
                    <div class="feedback-invalid" v-if="errors.new_password_confirmation">
                      {{ this.errors.new_password_confirmation }}
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
  name: "ChangePassword",
  data() {
    return {
      namePage: "Change Password",
      update: {
        password: "",
        new_password: "",
        new_password_confirmation:""
      },
      errors: [],
    };
  },
  created() {
    this.profile();
  },
  computed: {},
  methods: {
    ...mapActionsAUTH.mapActions({
      changePasswordUser: "changePassword",
      getProfile: "profile",
    }),
    validate() {
      let isValid = true;
      this.errors = [];
      if (!this.update.password) {
        this.errors.password = "Password not Empty ";
        isValid = false;
      } else if (!this.update.new_password) {
        this.errors.new_password = "New Password not Empty";
        isValid = false;
      }else if (!this.update.new_password_confirmation) {
        this.errors.new_password_confirmation = "New Password Comfirmation not Empty";
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
        // const input = {
        //   password: this.password,
        //   new_password: this.new_password,
        //   new_password_confirmation: this.new_password_confirmation,
        // };
        this.$swal
          .fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const res = await this.changePasswordUser(this.update);
              this.errors = res.errors;
              this.$swal.fire(
                this.namePage + " " + res.alert.message,
                "",
                res.alert.status
              );
              // this.update.password = "";
              // this.update.new_password = "";
              // this.update.new_password_confirmation = "";
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
      