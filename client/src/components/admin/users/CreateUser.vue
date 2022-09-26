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
          <form
            action=""
            @submit.prevent="save()"
            class="needs-validation text-left"
            novalidate
          >
            <div class="form-group row">
              <label for="inputName" class="col-md-3 col-form-label">Name</label>
              <div class="col-md-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="user.name"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.name }"
                  required
                />
                <div class="feedback-invalid" v-if="errors.name">
                  {{ errors.name }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputUsername" class="col-md-3 col-form-label">Username</label>
              <div class="col-md-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="user.username"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.username }"
                  required
                />
                <div class="feedback-invalid" v-if="errors.username">
                  {{ errors.username }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail" class="col-md-3 col-form-label">Email</label>
              <div class="col-md-9">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  v-model.number="user.email"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.email }"
                  required
                />
                <div class="feedback-invalid" v-if="errors.email">
                  {{ errors.email }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="input" class="col-md-3 col-form-label">Password</label>
              <div class="col-md-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="user.password"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.password }"
                  required
                />
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
export default {
  name: "CreateData",
  data() {
    return {
      errors: {
        username: "",
        email: "",
        password: "",
      },
      users: [],
      user: {
        id: "",
        uid: "",
        username: "",
        email: "",
        password: "",
        create_at: "",
      },
    };
  },
  created() {
    const userId = this.$route.params.id;
    console.log(userId);
    if (userId) {
      this.getUser(userId);
    }
    this.getAll();
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
      };
      if (!this.user.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      if (!this.user.username) {
        this.errors.username = "Error: Username not Empty";
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
        if (this.user.id) {
          this.$request
            .put(`http://localhost:8000/api/users/${this.user.id}`, this.user)
            .then((res) => {
              if (res.data.success) {
                this.$router.push({ name: "admin.management.users" });
                return;
              }
              alert("Errors");
            });
          return;
        }
        await this.getAll();
        let max = 0;
        let newID = 0;
        // console.log(newID)
        for (let i = 0; i < this.users.length; i++) {
          console.log(this.users.length);
          if (this.users[i].uid > max) {
            max = this.users[i].uid;
          }
          // return this.user.id
        }
        newID = max + 1;
        this.user.uid = newID;
        console.log(newID);
        this.user.create_at = new Date().toLocaleString();
        this.user.uid = newID;
        var md5 = require("md5");
        this.user.password = md5(this.user.password);
        this.$request.post("http://localhost:8000/api/users", this.user).then((res) => {
          console.log(res);
          if (res.data.success) {
            this.reset();
            this.$router.push({ name: "admin.managements.users" });
          } else if (!res.data.success) {
            alert("Đã Tồn Tại");
          }
        });
      }
    },
    getUser(userId) {
      this.$request.get(`http://localhost:8000/api/users/${userId}`).then((res) => {
        this.user = res.data;
        // console.log(this.user)
      });
    },
    reset() {
      (this.user.username = ""), (this.user.email = ""), (this.user.password = "");
    },
    async getAll() {
      console.log(this.builUrl());
      await this.$request.get(this.builUrl()).then((res) => {
        this.users = res.data;
        // sort price
        // this.users = this.users.sort((a, b) => a.price - b.price);
        // sort reverse
        this.users = this.users.reverse();
        var md5 = require("md5");
        console.log(md5("message"));
      });
    },
    builUrl() {
      // let p = this.params;
      // return `http://localhost:8000/api/users?page=${p.page}&per_page=${p.per_page}&sort_column=${p.sort_column}&direction=${p.direction}&search_column=${p.search_column}&search_operator=${p.search_operator}&search_query_1=${p.search_query_1}&search_query_2=${p.search_query_2}`;
      return `http://localhost:8000/api/users`;
    },
  },
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
