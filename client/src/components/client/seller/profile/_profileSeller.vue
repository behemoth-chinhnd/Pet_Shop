<template>
  <div class="body-saler">
    <div class="container">
      <div class="body-user">
        <div class="container user-profile">
          <div class="profile-header">
            <router-link to="/user/profile">
              <h1 class="profile-title">Seller Profile</h1>
            </router-link>
            <div class="profile-content">
              Manage profile information for account security
            </div>
          </div>
          <div class="profile-body row">
            <div class="col-md-8 user-info">
              <form
                action=""
                @submit.prevent="save()"
                class="needs-validation text-left"
                novalidate
              >
                <div class="form-group row flex-row-start-center">
                  <label for="name" class="item-name col-form-label"
                    >Name:</label
                  >
                  <div id="name" class="item-value">
                    <p>
                      {{ this.user.name }}
                    </p>
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="name" class="item-name col-form-label"
                    >Email:</label
                  >
                  <div id="name" class="item-value">
                    <p>
                      {{ this.user.email }}
                    </p>
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="point" class="item-name col-form-label"
                    >Point:</label
                  >
                  <div class="item-value flex">
                    <p id="email" class="">{{ this.user.point }}đ</p>
                    <span class="mgl-10px">
                      <router-link to="#"> Withdraw Money</router-link>
                    </span>
                  </div>
                  <div class="form-group row flex-row-start-center">
                    <label for="store_name" class="item-name col-form-label"
                      >Store Name:</label
                    >
                    <div id="store_name" class="item-value">
                      <input
                        class="input"
                        type="text"
                        placeholder="Store Name"
                        v-model="user.store_name"
                        @blur="validate()"
                        v-bind:class="{ 'is-invalid': errors.store_name }"
                        required
                      />
                      <p class="feedback-invalid" v-if="errors.store_name">
                        {{ errors.store_name }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row flex-row-start-center">
                    <label for="shipping_fee" class="item-name col-form-label"
                      >Shipping Fee:</label
                    >
                    <div id="shipping_fee" class="item-value">
                      <input
                        class="input"
                        type="number"
                        placeholder="Shipping Fee"
                        v-model.number="user.shipping_fee"
                        @blur="validate()"
                        v-bind:class="{ 'is-invalid': errors.shipping_fee }"
                        required
                      />
                      <div class="feedback-invalid" v-if="errors.shipping_fee">
                        {{ this.errors.shipping_fee }}
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
                </div>
                <div class="form-group row flex-row-start-center">
                  <label class="item-name col-md-3 col-form-label"></label>
                  <div class="item-value flex">
                    <button class="btn submit">Update</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-4 user-avatar">
              <update-avatar-user></update-avatar-user>
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
const mapActionsADDR = createNamespacedHelpers("ADDR");
const mapActionsSLPR = createNamespacedHelpers("SLPR");

import UpdateAvatarUser from "@/components/client/users/_updateAvatarUser.vue";

export default {
  components: {
    updateAvatarUser: UpdateAvatarUser,
  },
  name: "ProfileSeller",
  data() {
    return {
      namePage: "Update",
      user: "",
      update: {
        name: "",
        store_name: "",
        shipping_fee: "",
        password:"",
      },
      errors: [],
    };
  },
  created() {
    this.profile();
    this.getAddressDefault();
  },
  computed: {},
  methods: {
    ...mapActionsAUTH.mapActions({
      getProfile: "profile",
    }),
    ...mapActionsSLPR.mapActions({
      updateProfile: "update",
    }),
    ...mapActionsADDR.mapActions({ getIsDefaultADDR: "getIsDefault" }),
     validate() {
      let isValid = true;
      this.errors = {
        store_name: "",
        shipping_fee: "",
        password: "",
      };
      if (!this.user.store_name) {
        this.errors.store_name = "Store Name not Empty ";
        isValid = false;
      }else if (!this.user.password) {
        this.errors.password = "Please enter password to authenticate!!";
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

    async getAddressDefault() {
      const res = await this.getIsDefaultADDR();
      this.address_order = res;
    },

    async save() {
      if (this.validate()) {
        const input = {
          password: this.user.password,
          store_name: this.user.store_name,
          shipping_fee: this.user.shipping_fee,
        };
        this.$swal
          .fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const res = await this.updateProfile(input);
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
      