<template>
  <div class="body">
    <section id="main-body">
      <div class="add-user">
        <div class="container bg-white mgt--20px">
          <div class="panel-body flex-row-space-between-center">
            <div class="btn">
              <button class="btn btn-primary text-white">
                <router-link to="/admin/management/users">Back</router-link>
              </button>
            </div>
          </div>
          <form action="" @submit.prevent="save()" class="needs-validation text-left" novalidate>
            <div class="form-group row">
              <label for="inputName" class="col-md-3 col-form-label">Name</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="user.name" @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.name }" required />
                <div class="feedback-invalid" v-if="errors.name">
                  {{ errors.name }}
                </div>
              </div>
            </div>


            <div class="form-group row">
              <label for="inputEmail" class="col-md-3 col-form-label">Email</label>
              <div class="col-md-9">
                <input type="email" name="email" class="form-control" v-model.number="user.email" @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.email }" required />
                <div class="feedback-invalid" v-if="errors.email">
                  {{ errors.email }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputName" class="col-md-3 col-form-label">Birth Day</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="user.birthday" @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.birthday }" required />
                <div class="feedback-invalid" v-if="errors.birthday">
                  {{ errors.birthday }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputName" class="col-md-3 col-form-label">Sex</label>
              <div class="col-md-9">
                <input type="radio"  v-model="user.sex_id" @blur="validate()" value="1" />
                  <input type="radio"  v-model="user.sex_id" @blur="validate()" value="2" />
                <div class="feedback-invalid" v-if="errors.sex_id">
                  {{ errors.sex_id }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="input" class="col-md-3 col-form-label">Password</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="user.password" @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.password }" required />
                <div class="feedback-invalid" v-if="errors.password">
                  {{ errors.password }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="input" class="col-md-3 col-form-label"></label>
              <div class="col-md-9">
                <div class="left group-btn">
                  <b-button type="submit" variant="primary ">Save</b-button>
                  <b-button variant="danger mgl-10px" @click="reset()">Reset</b-button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import api from '@/plugin/axios';
export default {
  name: "CreateUser",
  data() {
    return {
      errors: {
        name: "",
        email: "",
        password: "",
        sex_id: "",
        birthday: ""
      },
      users: [],
      user: {
        name: "",
        email: "",
        password: "",
        birthday: "",
        sex_id: 1
      },
    };
  },
  created() {
  },
  methods: {
    ...mapActions([""]),
    validate() {
      let isValid = true;
      this.errors = {
        name: "",
        username: "",
        email: "",
        password: "",
        birthday:""
      };
      if (!this.user.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      if (!this.user.email) {
        this.errors.email = "Error: Email not Empty ";
        isValid = false;
      }
      if (!this.user.password) {
        this.errors.password = "Error: Password not Empty ";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async save() {
      if (this.validate()) {
        api.post("/api/users", this.user).then((res) => {
          if (res) {
            console.log(`Success`)
          }
        }).catch((res) => {
          if (res.response.data.birthday) {
            this.errors.birthday = res.response.data.birthday;
          }
          if (res.response.data.name) {
            this.errors.name = res.response.data.name;
          }
          if (res.response.data.email) {
            this.errors.email = res.response.data.email;
          }
          if (res.response.data.sex_id) {
            this.errors.sex_id = res.response.data.sex_id;
          }
          if (res.response.data.password) {
            this.errors.password = res.response.data.password;
          }
        })
      };
    },
    reset() {
      (this.user.username = ""), (this.user.email = ""), (this.user.password = "");
    },
  },
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
  