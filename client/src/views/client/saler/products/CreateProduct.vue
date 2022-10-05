<template>
  <div class="container">
    <div class="body-saler">
      <div class="register-product bg-white">
        <h1 class="color-primary center">CREATE PRODUCT</h1>
        <form action="" @submit.prevent="create()" class="needs-validation text-left" novalidate>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Name</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="product.name" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.name }" required />
              <div class="feedback-invalid" v-if="errors.name">
                {{ errors.name }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputEmail" class="col-md-3 col-form-label">Number</label>
            <div class="col-md-9">
              <input type="number" name="number" class="form-control" v-model.number="product.number" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.number }" required />
              <div class="feedback-invalid" v-if="errors.number">
                {{ errors.number }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Master SKU</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="product.master_sku" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.master_sku }" required />
              <div class="feedback-invalid" v-if="errors.master_sku">
                {{ errors.master_sku }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Master List Price</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="product.master_list_price" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.master_list_price }" required />
              <div class="feedback-invalid" v-if="errors.master_list_price">
                {{ errors.master_list_price }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Master Sales Price</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="product.master_sales_price" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.master_sales_price }" required />
              <div class="feedback-invalid" v-if="errors.master_sales_price">
                {{ errors.master_sales_price }}
              </div>
            </div>
          </div>
          <div class="row">
            <label for="input" class="col-md-3 col-form-label"></label>
            <div class="col-md-9">
              <div class="panel-body flex-row-space-between-center">
                <router-link :to="{name: 'saler.products'}">
                  <b-button variant="danger" class="text-white">
                    <i class="fa fa-angle-double-left"></i> Back
                  </b-button>
                </router-link>
                <div class="right">
                  <b-button type="submit" variant="primary ">Create</b-button>
                  <b-button class="text-white" variant="info mgl-10px" @click="reset()">Test</b-button>
                </div>
                

              </div>

            </div>
          </div>
          
        </form>
      </div>
    </div>
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
        number: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: ""
      },
      products: [],
      product: {
        name: "",
        number: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: ""
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
        number: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: ""
      };
      if (!this.product.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      if (!this.product.number) {
        this.errors.number = "Error: Email not Empty ";
        isValid = false;
      }
      if (!this.product.master_sku) {
        this.errors.master_sku = "Error: Master SKU not Empty ";
        isValid = false;
      }
      if (!this.product.master_list_price) {
        this.errors.master_list_price = "Error: Master List Price not Empty ";
        isValid = false;
      }
      if (!this.product.master_sales_price) {
        this.errors.master_sales_price = "Error: Master Sales Price not Empty ";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async create() {
      if (this.validate()) {
        await this.$store.dispatch("PROD/create", this.product)
      };
      this.checkErrors();
    },
    reset() {
      (this.product.name = "minhmonster"),
        (this.product.number = "100"),
        (this.product.master_sku = "200"),
        (this.product.master_list_price = 10000),
        (this.product.master_sales_price = 20000)
    },
    checkErrors() {
      const err = this.$store.state.PROD.state.errors;
      const isErr = this.$store.state.PROD.state.isErr
      if (isErr) {
        if (err.name) {
          this.errors.name = err.name
        }
        if (err.number) {
          this.errors.number = err.number
        }
        if (err.master_sku) {
          this.errors.master_sku = err.master_sku
        }
        if (err.master_list_price) {
          this.errors.master_list_price = err.master_list_price
        }
        if (err.master_sales_price) {
          this.errors.master_sales_price = err.master_sales_price
        }
      }

    }
  },
};
</script>
<style scoped>
.register-product {
  /* width: 500px; */
  margin: 0 auto;
  /* border: 1px solid #a4a4a4; */
}

.form-group {
  margin-bottom: 10px;
}
</style>
    