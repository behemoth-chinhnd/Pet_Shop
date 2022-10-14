<template>
  <div class="user">
    <div class="container">
      <div class="body-user">
        <div class="container user-profile">
          <div class="profile-header">
            <router-link to="/user/profile">
              <h1 class="profile-title">My Profile</h1>
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
                  <p id="name" class="item-value">
                    <input
                      class="input"
                      type="text"
                      placeholder="Name"
                      v-model="user.name"
                    />
                  </p>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="email" class="item-name col-form-label"
                    >Email:</label
                  >
                  <div class="item-value flex">
                    <p id="email" class="">
                      {{ this.user.email }}
                    </p>
                    <p class="mgl-10px">
                      <router-link to="/"> Change </router-link>
                    </p>
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="phone" class="item-name col-form-label"
                    >Phone:</label
                  >
                  <div class="item-value flex">
                    <p id="phone">{{ this.user.phone }}</p>

                    <p class="mgl-10px">
                      <router-link to="/"> Change </router-link>
                    </p>
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="address" class="item-name col-md-3 col-form-label"
                    >Address:</label
                  >
                  <div class="item-value flex">
                    <p id="address">
                      {{
                        " " +
                        address_order.description +
                        "," +
                        address_order.apartment_number +
                        "," +
                        address_order.street +
                        ", " +
                        address_order.county +
                        ", " +
                        address_order.city
                      }}
                    </p>
                    <p class="mgl-10px">
                      <router-link to="/user/account/address_order">
                        Change
                      </router-link>
                    </p>
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="user_type" class="item-name col-form-label"
                    >User Type:</label
                  >
                  <p id="user_type" class="item-value">{{ this.user.user_type }}</p>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="created" class="item-name col-form-label"
                    >Created:</label
                  >
                  <p id="created" class="item-value">{{ this.created_at }}</p>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="sex" class="item-name col-form-label">Sex:</label>
                  <div class="item-value flex">
                    <input
                      class="input-radio"
                      :class="{ checked: user.sex_id == 1 }"
                      type="radio"
                      name="sex"
                      value="1"
                      v-model="user.sex_id"
                      v-bind:checked="user.sex_id == 1"
                    />
                    Male
                    <input
                      class="input-radio mgl-30px rel"
                      :class="{ checked: user.sex_id == 2 }"
                      type="radio"
                      name="sex"
                      value="2"
                      v-model="user.sex_id"
                      v-bind:checked="user.sex_id == 2"
                    />
                    Female
                    <input
                      class="input-radio mgl-30px"
                      :class="{ checked: user.sex_id == 3 }"
                      type="radio"
                      name="sex"
                      value="3"
                      v-model="user.sex_id"
                      v-bind:checked="user.sex_id == 3"
                    />
                    Other
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="phone" class="item-name col-form-label"
                    >Birthday:</label
                  >
                  <div class="item-value birthday">
                    <select v-model="birthday_year">
                      <option :selected="birthday_year === ''">Year</option>
                      <option
                        v-for="year in years"
                        :key="year"
                        v-bind:value="year"
                        :selected="birthday_year === year"
                      >
                        {{ year }}
                      </option>
                    </select>
                    <select class="mgl-10px" v-model="birthday_month">
                      <option :selected="birthday_month === ''">Month</option>
                      <option
                        v-for="month in months"
                        :key="month"
                        v-bind:value="month"
                        :selected="birthday_month === month"
                      >
                        Month {{ month }}
                      </option>
                    </select>
                    <select class="mgl-10px" v-model="birthday_day">
                      <option :selected="birthday_day === ''">Day</option>
                      <option
                        v-for="day in days"
                        :key="day"
                        v-bind:value="day"
                        :selected="birthday_day === day"
                      >
                        {{ day }}
                      </option>
                    </select>
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

import says from "@/plugin/says";
import UpdateAvatarUser from "@/components/client/users/UpdateAvatarUser.vue";

export default {
  components: {
    updateAvatarUser: UpdateAvatarUser,
  },
  name: "ProfileUser",
  data() {
    return {
      user: "",
      address_user: null,
      created_at: "",
      address_order: "",
      birthday: [],
      birthday_year: "",
      birthday_month: "",
      birthday_day: "",
      update: {
        name: "",
        sex_id: "",
        birthday: "",
      },
      days: Array.from({ length: 32 }, (v, i) => i).slice(1),
      months: Array.from({ length: 13 }, (v, i) => i).slice(1),
      currentYear: new Date().getFullYear(),
    };
  },
  created() {
    this.profile();
    this.getAddressDefault();
  },
  computed: {
    years() {
      var List = [];
      for (let i = 1900; i <= this.currentYear; i++) {
        if (i > 0) {
          List.push(i);
        }
      }
      return List.reverse();
    },
  },
  methods: {
    ...mapActionsAUTH.mapActions({ 
      updateProfile: "update",
      getProfile: "profile",
    }),
    ...mapActionsADDR.mapActions({ getIsDefaultADDR: "getIsDefault" }),

    async profile() {
      const res = await this.getProfile();
      this.user = res;
      this.birthday_day = Number(this.user.birthday.slice(8, 10));
      this.birthday_month = Number(this.user.birthday.slice(5, 7));
      this.birthday_year = Number(this.user.birthday.slice(0, 4));
      this.created_at = this.user.created_at.slice(0, 10);
      this.phoneUser(this.user.phone);
      this.typeUser(this.user.user_type);
    },

    async getAddressDefault() {
      const res = await this.getIsDefaultADDR();
         this.address_order = res;
    },

    phoneUser(phone) {
      if (phone === null) {
        return (this.user.phone = "Empty");
      } else {
        return (this.user.phone = this.user.phone);
      }
    },
    typeUser(type) {
      if (type === 1) {
        return (this.user.user_type = "Member");
      } else if (type === 2) {
        return (this.user.user_type = "Saler");
      } else {
        return (this.user.user_type = "Unknow");
      }
    },


    async save() {
      const input = {
        password: "12345678",
        name: this.user.name,
        sex_id: this.user.sex_id,
        birthday:
          this.birthday_year +
          "-" +
          this.birthday_month +
          "-" +
          this.birthday_day,
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
            this.$swal.fire(res.message, "", res.status);
            this.profile()
          }
        });
    },
  },
};
</script>
<style scoped>

</style>
      