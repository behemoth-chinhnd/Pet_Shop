<template>
  <div class="body">
    <section id="main-body">
      <div class="add-product">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h3 class="display-5">Product Information</h3>
          <router-link to="/admin/management/products">Back</router-link>
        </div>
        <div class="container">
          <form
            action=""
            @submit.prevent="save()"
            class="needs-validation text-left"
            novalidate
          >
            <div class="form-group row">
              <label for="inputName" class="col-md-3 col-form-label">Product Name</label>
              <div class="col-md-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="product.name"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.name }"
                  required
                />
                <div class="feedback-invalid" v-if="errors.name">{{ errors.name }}</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPrice" class="col-md-3 col-form-label"
                >Product Price</label
              >
              <div class="col-md-9">
                <input
                  type="number"
                  class="form-control"
                  v-model.number="product.price"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.price }"
                  required
                />
                <div class="feedback-invalid" v-if="errors.price">{{ errors.price }}</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputDescription" class="col-md-3 col-form-label"
                >Product Description</label
              >
              <div class="col-md-9">
                <textarea
                  type="text"
                  class="form-control"
                  v-model="product.description"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.description }"
                  required
                ></textarea>
                <div class="feedback-invalid" v-if="errors.description">
                  {{ errors.description }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputDescription" class="col-md-3 col-form-label"></label>
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
  name: "ProductDta",
  data() {
    return {
      errors: {
        name: "",
        price: "",
        description: "",
      },
      products: [],
      product: {
        id: "",
        pid: "",
        author: "",
        name: "",
        price: "",
        description: "",
        time: "",
      },
    };
  },
  created() {
    const productId = this.$route.params.id;
    console.log(productId);
    if (productId) {
      this.getProduct(productId);
    }
    this.getAll();
  },
  methods: {
    ...mapActions([""]),
    validate() {
      let isValid = true;
      this.errors = {
        name: "",
        price: "",
        description: "",
      };
      if (!this.product.name) {
        this.errors.name = "Error name";
        isValid = false;
      }
      if (!this.product.price) {
        this.errors.price = "Error price";
        isValid = false;
      } else if (!this.isNumber(this.product.price)) {
        this.errors.price = "price is Number";
        isValid = false;
      }
      if (!this.product.description) {
        this.errors.description = "Loi description";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async save() {
      if (this.validate()) {
        if (this.product.id) {
          this.$request
            .put(`http://localhost:8000/api/products/${this.product.id}`, this.product)
            .then((res) => {
              if (res.data.success) {
                this.$router.push({ name: "admin.products" });
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
        for (let i = 0; i < this.products.length; i++) {
          console.log(this.products.length);
          if (this.products[i].pid > max) {
            max = this.products[i].pid;
          }
          // return this.product.id
        }
        newID = max + 1;
        this.product.pid = newID;
        console.log(newID);
        var md5 = require("md5");
        console.log(md5("message"));
        this.product.time = new Date().getTime();
        this.product.author = this.$store.state.user.email;
        this.product.pid = newID;
        this.$request
          .post("http://localhost:8000/api/products", this.product)
          .then((res) => {
            if (res.data.success) {
              this.$router.push({ name: "admin.products" });
            }
          });
      }
    },
    getProduct(productId) {
      this.$request.get(`http://localhost:8000/api/products/${productId}`).then((res) => {
        this.product = res.data;
        // console.log(this.product)
      });
    },
    reset() {
      (this.product.name = ""),
        (this.product.price = ""),
        (this.product.description = "");
    },
    async getAll() {
      console.log(this.builUrl());
      await this.$request.get(this.builUrl()).then((res) => {
        this.products = res.data;
        // sort price
        // this.products = this.products.sort((a, b) => a.price - b.price);
        // sort reverse
        this.products = this.products.reverse();
        var md5 = require("md5");
        console.log(md5("message"));
      });
    },
    builUrl() {
      // let p = this.params;
      // return `http://localhost:8000/api/products?page=${p.page}&per_page=${p.per_page}&sort_column=${p.sort_column}&direction=${p.direction}&search_column=${p.search_column}&search_operator=${p.search_operator}&search_query_1=${p.search_query_1}&search_query_2=${p.search_query_2}`;
      return `http://localhost:8000/api/products`;
    },
  },
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
