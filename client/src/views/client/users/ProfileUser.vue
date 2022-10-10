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
            <div class="col-md-8">
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
                      placeholder="Year"
                      v-model="name"
                    />
                  </p>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="email" class="item-name col-form-label"
                    >Email:</label
                  >
                  <div class="item-value flex">
                    <p id="email" class="">
                      {{ this.$store.state.AUTH.state.user.email }}
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
                    <p id="phone">{{ this.phone }}</p>

                    <p class="mgl-10px">
                      <router-link to="/"> Change </router-link>
                    </p>
                  </div>
                </div>

                <!-- <div class="form-group row flex-row-start-center">
                  <label
                    for="birthday"
                    class="item-name col-md-3 col-form-label"
                    >Birthday:</label
                  >

                  <p id="birthday" class="item-value">
                    {{ this.birthday }}
                  </p>
                </div> -->
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
                      <router-link to="/address_order"> Change </router-link>
                    </p>
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="type_user" class="item-name col-form-label"
                    >User Type:</label
                  >
                  <p id="type_user" class="item-value">{{ this.type_user }}</p>
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
                      :class="{ checked: sex_id == 1 }"
                      type="radio"
                      name="sex"
                      value="1"
                      v-model="sex_id"
                      v-bind:checked="sex_id == 1"
                    />
                    Male
                    <input
                      class="input-radio mgl-30px rel"
                      :class="{ checked: sex_id == 2 }"
                      type="radio"
                      name="sex"
                      value="2"
                      v-model="sex_id"
                      v-bind:checked="sex_id == 2"
                    />
                    Female
                    <input
                      class="input-radio mgl-30px"
                      :class="{ checked: sex_id == 3 }"
                      type="radio"
                      name="sex"
                      value="3"
                      v-model="sex_id"
                      v-bind:checked="sex_id == 3"
                    />
                    Other
                  </div>
                </div>
                <div class="form-group row flex-row-start-center">
                  <label for="phone" class="item-name col-form-label"
                    >Birthday:</label
                  >
                  <div class="item-value birthday">
                    <!-- <input
                        class="input birthday-year"
                        type="number"
                        placeholder="Year"
                        v-model="birthday_year"
                      />
                      <input
                        class="input birthday-month mgl-10px"
                        type="number"
                        placeholder="Month"
                        v-model="birthday_month"
                      />
                      <input
                        class="input birthday-day mgl-10px"
                        type="number"
                        placeholder="Day"
                        value=""
                        v-model="this.birthday_day"
                      /> -->
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
import says from "@/plugin/says";
import UpdateAvatarUser from "@/components/client/users/UpdateAvatarUser.vue";

export default {
  components: {
    updateAvatarUser: UpdateAvatarUser,

  },
  name: "ProfileUser",
  data() {
    return {
      name: this.$store.state.AUTH.state.user.name,
      email: "",
      password: "",
      sex_id: "",
      phone: null,
      type_user: "",
      address_user: null,
      created_at: "",
      address_order: this.$store.state.ADDR.state.is_default,
      birthday: [],
      birthday_year: "",
      birthday_month: "",
      birthday_day: "",
      res: {
        is_res: null,
        status: "",
        message: "",
      },
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
    this.runStart();
  },
  computed: {
    start() {
      this.birthday_day = this.$store.state.AUTH.state.birthday.day;
      this.birthday_month = this.$store.state.AUTH.state.birthday.month;
      this.birthday_year = this.$store.state.AUTH.state.birthday.year;
    },

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
    async runStart() {
      await this.$store.dispatch("ADDR/getIsDefault").then(() => {
        this.address_order = this.$store.state.ADDR.state.is_default;
        // update
        this.res.is_res = this.$store.state.AUTH.state.res.is_res;
        this.res.status = this.$store.state.AUTH.state.res.status;
        this.res.message = this.$store.state.AUTH.state.res.message;
        //sex
        this.sex_id = this.$store.state.AUTH.state.user.sex_id;
        //birthday
        this.birthday = this.$store.state.AUTH.state.user.birthday;
        this.birthday_day = this.$store.state.AUTH.state.birthday.day;
        this.birthday_month = this.$store.state.AUTH.state.birthday.month;
        this.birthday_year = this.$store.state.AUTH.state.birthday.year;
        //create at
        this.created_at = this.$store.state.AUTH.state.user.created_at.slice(
          0,
          10
        );
        //phone
        const phone = this.$store.state.AUTH.state.user.phone;
        this.phoneUser(phone);
        //user type
        const type = this.$store.state.AUTH.state.user.user_type;
        this.typeUser(type);
      });
    },

    phoneUser(phone) {
      if (phone === null) {
        return (this.phone = "Empty");
      } else {
        return (this.phone = phone);
      }
    },
    typeUser(type) {
      if (type === 1) {
        return (this.type_user = "Member");
      } else if (type === 2) {
        return (this.type_user = "Saler");
      } else {
        return (this.type_user = "Unknow");
      }
    },
    isActive() {
      if (!this.$store.state.AUTH.state.isActive) {
        window.location.href = "/login";
      }
    },
    async getAll() {
      this.res.is_res = this.$store.state.AUTH.state.res.is_res;
      this.res.status = this.$store.state.AUTH.state.res.status;
      this.res.message = this.$store.state.AUTH.state.res.message;
    },

    async save() {
      this.$swal
        .fire({
          title: "Do you want to save the changes?",
          showCancelButton: true,
          confirmButtonText: "Save",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("AUTH/update", {
                password: "12345678",
                name: this.name,
                sex_id: this.sex_id,
                birthday:
                  this.birthday_year +
                  "-" +
                  this.birthday_month +
                  "-" +
                  this.birthday_day,
              })
              .then(() => {
                this.runStart().then(() => {
                  this.$swal.fire(this.res.message, "", this.res.status);
                });
              });
          }
        });
    },
  },
};
</script>
<style scoped>
label {
  font-weight: 800;
}
.login-user {
  width: 500px;
  margin: 0 auto;
  border: 1px solid #a4a4a4;
}

.form-group {
  margin-bottom: 15px;
}
</style>
      