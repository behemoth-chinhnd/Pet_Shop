<template>
  <div class="container">
    <div class="body-saler">
      <div class="edit-product">
        <form action="" @submit.prevent="edit()" class="needs-validation text-left" novalidate>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label"></label>
            <div class="col-md-9">
              <h1 class="color-primary center">Edit Product - ID: #{{this.product.id}}</h1>
            </div>
          </div>
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
            <label for="inputProductname" class="col-md-3 col-form-label">Quantity</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="product.quantity" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.quantity }" required />
              <div class="feedback-invalid" v-if="errors.quantity">
                {{ errors.quantity }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputProductname" class="col-md-3 col-form-label">Number</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="product.number" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.number }" required />
              <div class="feedback-invalid" v-if="errors.number">
                {{ errors.number }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputmaster_sku" class="col-md-3 col-form-label">master_sku</label>
            <div class="col-md-9">
              <input type="master_sku" name="master_sku" class="form-control" v-model.number="product.master_sku"
                @blur="validate()" v-bind:class="{ 'is-invalid': errors.master_sku }" required />
              <div class="feedback-invalid" v-if="errors.master_sku">
                {{ errors.master_sku }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="input" class="col-md-3 col-form-label">Master List Price</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="product.master_list_price" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.master_list_price }" required />
              <div class="feedback-invalid" v-if="errors.master_list_price">
                {{ errors.master_list_price }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="input" class="col-md-3 col-form-label">Master Sales Price</label>
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
                <b-button type="submit" variant="primary">Edit</b-button>

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
export default {
  name: "CreateData",
  data() {
    return {
      errors: {
        name: "",
        number: "",
        quantity:"",
        master_sku: "",
        master_list_price: "",
        master_sales_price: ""
      },
      products: [],
      product: {
        name: "",
        number: "",
        quantity:"",
        master_sku: "",
        master_list_price: "",
        master_sales_price: ""
      },
    };
  },
  created() {
    const itemId = this.$route.params.id;
    console.log(itemId);
    if (itemId) {
      this.getItem(itemId);
    }
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
      };
      if (!this.product.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      if (!this.product.number) {
        this.errors.number = "Error: Productname not Empty";
        isValid = false;
      }
      if (!this.product.master_sku) {
        this.errors.master_sku = "Error: master_sku not Empty ";
        isValid = false;
      }
      if (!this.product.master_list_price) {
        this.errors.master_list_price = "Error: Master List Price not Empty ";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async edit() {
      if (this.validate()) {
        if (this.product.id) {
          await this.$store.dispatch("PROD/edit", this.product)
        }
      }
    },
    async getItem(itemId) {
      await this.$store.dispatch("PROD/getItem", itemId)
      return this.product = this.$store.state.PROD.state.product
    },
  },
  computed: {
    Item() {
      return this.product = this.$store.state.PROD.state.product
    }
  }
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
  