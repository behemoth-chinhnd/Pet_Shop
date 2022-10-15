<template>
  <div class="body-saler">
    <div class="panel-body">
      <div class="register-product bg-white">
        <h1 class="color-primary ">CREATE PRODUCT</h1>
        <form
          action=""
          @submit.prevent="create()"
          class="needs-validation text-left row"
          novalidate
        >
          <div class="form-group col-md-6">
            <label for="inputName" class="col-form-label">Name</label>
            <div class="">
              <input
                type="text"
                class="form-control"
                v-model="product.name"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.name }"
                required
              />
              <div class="feedback-invalid" v-if="errors.name">
                {{ errors.name }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail" class="col-form-label">Quantity</label>
            <div class="">
              <input
                type="number"
                name="number"
                class="form-control"
                v-model.number="product.quantity"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.quantity }"
                required
              />
              <div class="feedback-invalid" v-if="errors.quantity">
                {{ errors.quantity }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail" class="col-form-label">Number</label>
            <div class="">
              <input
                type="text"
                name="number"
                class="form-control"
                v-model="product.number"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.number }"
                required
              />
              <div class="feedback-invalid" v-if="errors.number">
                {{ errors.number }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputName" class="col-form-label">Master SKU</label>
            <div class="">
              <input
                type="number"
                class="form-control"
                v-model="product.master_sku"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.master_sku }"
                required
              />
              <div class="feedback-invalid" v-if="errors.master_sku">
                {{ errors.master_sku }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputName" class="col-form-label"
              >Master List Price</label
            >
            <div class="">
              <input
                type="number"
                class="form-control"
                v-model="product.master_list_price"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.master_list_price }"
                required
              />
              <div class="feedback-invalid" v-if="errors.master_list_price">
                {{ errors.master_list_price }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputName" class="col-form-label"
              >Master Sales Price</label
            >
            <div class="">
              <input
                type="number"
                class="form-control"
                v-model="product.master_sales_price"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.master_sales_price }"
                required
              />
              <div class="feedback-invalid" v-if="errors.master_sales_price">
                {{ errors.master_sales_price }}
              </div>
            </div>
          </div>
          <div class="col-md-12 flex-column">
            <img
              class="img-edit-product"
              ref="image"
              :src="
                this.product.image_url
                  ? this.product.image_url
                  : require('@/assets/images/plugin/no_photo.jpeg')
              "
            />
            <label for="inputFile">Choose File</label>
            <input
              id="inputFile"
              type="file"
              ref="inputFile"
              @change="uploadFile()"
            />
          </div>
          <div class="row">
            <label for="input" class="col-form-label"></label>
            <div class="">
              <div class="panel-body flex-row-space-between-center">
                <router-link :to="{ name: 'saler.products' }">
                  <b-button variant="danger" class="text-white">
                    <i class="fa fa-angle-double-left"></i> Back
                  </b-button>
                </router-link>
                <div class="right">
                  <b-button type="submit" variant="primary ">Create</b-button>
                  <b-button
                    class="text-white"
                    variant="info mgl-10px"
                    @click="reset()"
                    >Test</b-button
                  >
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
import { createNamespacedHelpers } from "vuex";
const mapActionsPROD = createNamespacedHelpers("PROD");
import api from "@/plugin/axios";
export default {
  name: "CreateUser",
  data() {
    return {
      errors: {
        name: "",
        quantity: "",
        number: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: "",
      },
      products: [],
      product: {
        name: "",
        image_url: "",
        quantity: "",
        number: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: "",
      },
      inputPicture: null,
    };
  },
  created() {},
  methods: {
    ...mapActionsPROD.mapActions({
      createPROD: "create",
    }),
    validate() {
      let isValid = true;
      this.errors = {
        name: "",
        quantity: "",
        number: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: "",
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
    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
      this.product.image_url = URL.createObjectURL(
        this.$refs.inputFile.files[0]
      );
    },
    async create() {
      if (this.inputPicture === null) {
        this.$swal.fire("You haven't selected a photo yet!", "", "error");
      } else {
        let formData = new FormData();
        formData.append("file", this.inputPicture);
        if (this.validate()) {
          const input = {
            file: formData,
            data: this.product,
          };
          const res = await this.createPROD(input);
          this.$swal.fire(res.message, "", res.status);
        }
      }
    },
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
    