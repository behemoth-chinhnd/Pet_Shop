<template >
  <div class="body-saler">
    <div class="panel-body">
      <div class="edit-product">
        <form
          action=""
          @submit.prevent="edit()"
          class="needs-validation text-left row"
          novalidate
        >
          <div class="form-group col-md-12">
            <label for="inputName" class="col-form-label"></label>
            <div class="">
              <h1 class="color-primary">
                Edit Product - ID: #{{ this.product.id }}
              </h1>
            </div>
          </div>
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
            <label for="inputProductname" class="col-form-label"
              >Quantity</label
            >
            <div class="">
              <input
                type="text"
                class="form-control"
                v-model="product.quantity"
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
            <label for="inputProductname" class="col-form-label">Number</label>
            <div class="">
              <input
                type="text"
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
            <label for="inputmaster_sku" class="col-form-label"
              >master_sku</label
            >
            <div class="">
              <input
                type="master_sku"
                name="master_sku"
                class="form-control"
                v-model.number="product.master_sku"
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
            <label for="input" class="col-form-label">Master List Price</label>
            <div class="">
              <input
                type="text"
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
            <label for="input" class="col-form-label">Master Sales Price</label>
            <div class="">
              <input
                v-if="this.hidden.master_list_price"
                type="text"
                class="form-control"
                v-model="product.master_sales_price"
                @blur="validate(), unHiddenPrice()"
                v-bind:class="{ 'is-invalid': errors.master_sales_price }"
                required
              />
              <p class=" form-control" @mouseover="hiddenPrice()" v-if="!this.hidden.master_list_price">
                {{ Intl.NumberFormat().format(product.master_sales_price) }}
              </p>
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
import { createNamespacedHelpers } from "vuex";
const mapActionsPROD = createNamespacedHelpers("PROD");

export default {
  name: 'CurrencyInput',
  data() {
    return {
      isHover: false,
      hidden: {
        name: "",
        number: "",
        quantity: "",
        master_sku: "",
        master_list_price: false,
        master_sales_price: "",
      },
      errors: {
        name: "",
        number: "",
        quantity: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: "",
      },
      products: [],
      product: {
        name: "",
        image_key: "",
        number: "",
        quantity: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: "",
      },
      inputPicture: null,
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
    ...mapActionsPROD.mapActions({
      editProduct: "edit",
      getProduct: "getItem",
    }),
   
    hiddenPrice() {
      this.hidden.master_list_price = true;
      console.log(this.hidden.master_list_price);
    },

    unHiddenPrice() {
      this.hidden.master_list_price = false;
      console.log(this.hidden.master_list_price);
    },
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

    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
    },

    async edit() {
      if (this.inputPicture === null) {
        const input = {
          file: null,
          data: this.product,
        };
        if (this.validate()) {
          if (this.product.id) {
            await this.editProduct(input).then(() => {
              this.getItem(this.product.id).then(() => {
                this.$swal.fire("Edit Success", "", "success");
              });
            });
          }
        }
      } else {
        let formData = new FormData();
        formData.append("file", this.inputPicture);
        const input = {
          file: formData,
          data: this.product,
        };
        if (this.validate()) {
          if (this.product.id) {
            await this.editProduct(input).then(() => {
              this.getItem(this.product.id).then(() => {
                this.$swal.fire("Edit Success", "", "success");
              });
            });
          }
        }
      }
    },
    async getItem(itemId) {
      await this.getProduct(itemId).then(() => {
        this.product = this.$store.state.PROD.state.product;
      });
    },
  },
  computed: {
    
    Item() {
      this.product = this.$store.state.PROD.state.product;
      return (this.product = this.$store.state.PROD.state.product);
    },
  },
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
  