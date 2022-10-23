<template>
  <div class="user">
    <div class="container">
      <div class="body-user">
        <div class="container user-profile">
          <div class="profile-header">
            <router-link to="/user/profile">
              <h1 class="profile-title">Change Phone Number</h1>
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
                  <label for="phone" class="item-name col-form-label"
                    >Phone:</label
                  >
                  <div id="phone" class="item-value">
                    <input
                      class="input"
                      type="text"
                      placeholder="Phone Number"
                      v-model="user.phone"
                      @blur="validate()"
                      v-bind:class="{ 'is-invalid': errors.phone }"
                      required
                    />
                    <div class="feedback-invalid" v-if="errors.phone">
                      {{ this.errors.phone }}
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
  name: "ChangePhone",
  data() {
    return {
      namePage: "Change Phone",
      user: "",
      update: {
        phone: "",
        password: "",
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
      changePhoneUser: "changePhone",
      getProfile: "profile",
    }),
    validate() {
      let isValid = true;
      this.errors = {
        phone: "",
        password: "",
      };
      if (!this.user.phone) {
        this.errors.phone = "Phone Number not Empty ";
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
        this.phoneUser(this.user.phone);
      }
    },
    phoneUser(phone) {
      if (phone === null) {
        return (this.user.phone = "Empty");
      } else {
        return (this.user.phone = this.user.phone);
      }
    },
    async save() {
      if (this.validate()) {
        this.errors = [];
        const input = {
          phone: this.user.phone,
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
              const res = await this.changePhoneUser(input);
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
      