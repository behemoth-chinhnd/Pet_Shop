<template >
  <div class="body-saler">
    <div class="panel-body">
      <div v-if="error" class="error">
        <img src="@/assets/images/plugin/404_error.png" alt="" />
      </div>
      <div v-if="!error" class="edit-product">
        <form class="form-search col-md-3"></form>
        <form class="form-search col-md-3"></form>
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
          <div class="form-group col-md-3">
            <label for="inputEmail" class="col-form-label">Category</label>
            <div class="">
              <select
                @change="SearchTrademark()"
                v-model="params.q.category_id"
                class="form-control"
              >
                <option
                  v-bind:value="null"
                  :selected="this.params.q.category_id === null"
                  class=""
                >
                  --Category--
                </option>
                <option
                  v-for="item in categories"
                  :key="item.id"
                  v-bind:value="item.id"
                  :selected="params.q.category_id === item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group col-md-3">
            <label for="inputEmail" class="col-form-label">Species</label>
            <div class="">
              <select
                @change="SearchTrademark()"
                v-model="params.q.species_id"
                class="form-control"
              >
                <option
                  v-bind:value="null"
                  :selected="this.params.q.species_id === null"
                  class=""
                >
                  --Species--
                </option>
                <option
                  v-for="item in species"
                  :key="item.id"
                  v-bind:value="item.id"
                  :selected="params.q.species_id === item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail" class="col-form-label">Trademark</label>
            <div class="">
              <select v-model="product.trademark_id" class="form-control">
                <option
                  v-bind:value="null"
                  :selected="product.trademark_id === null"
                  class=""
                >
                  --Trademark--
                </option>
                <option
                  v-for="item in trademarks"
                  :key="item.id"
                  v-bind:value="item.id"
                  :selected="product.trademark_id === item.id"
                >
                  {{ item.name }}
                </option>
              </select>
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
              <p
                class="form-control"
                @mouseover="hiddenPrice()"
                v-if="!this.hidden.master_list_price"
              >
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
const mapActionsADTR = createNamespacedHelpers("ADTR");
const mapActionsADCA = createNamespacedHelpers("ADCA");
const mapActionsADSP = createNamespacedHelpers("ADSP");
export default {
  name: "CurrencyInput",
  data() {
    return {
      categories: [],
      species: [],
      trademarks: [],
      params: {
        page: 1,
        per_page: 10,
        pages: "",
        q: {
          id: null,
          name: "",
          trademark_id: null,
          category_id: null,
          species_id: null,
        },
      },
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
        trademark_id: null,
        category_id: "",
        species_id: "",
        trademark: "",
        number: "",
        quantity: "",
        master_sku: "",
        master_list_price: "",
        master_sales_price: "",
      },
      error: false,
      inputPicture: null,
    };
  },

  created() {
    const itemId = this.$route.params.id;
    this.getItem(itemId);
  },
  methods: {
    ...mapActionsPROD.mapActions({
      editProduct: "edit",
      getItemSaler: "getItemSaler",
    }),
    ...mapActionsADTR.mapActions({
      getAllListADTR: "getAllList",
    }),
    ...mapActionsADCA.mapActions({
      getAllADCA: "getAll",
    }),
    ...mapActionsADSP.mapActions({
      getAllADSP: "getAll",
    }),
    hiddenPrice() {
      this.hidden.master_list_price = true;
    },
    unHiddenPrice() {
      this.hidden.master_list_price = false;
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
      this.product.image_url = URL.createObjectURL(
        this.$refs.inputFile.files[0]
      );
    },
    async edit() {
      if (this.inputPicture === null) {
        var input = {
          file: null,
          product: this.product,
        };
      } else {
        let formData = new FormData();
        formData.append("file", this.inputPicture);
        var input = {
          file: formData,
          product: this.product,
        };
      }
      if (this.validate()) {
        const res = await this.editProduct(input);
        if (res.data) {
          this.$swal.fire("Edit Product Success", "", "success");
          this.product = res.data;
        } else {
          this.$swal.fire(res.message, "", res.status);
        }
      }
      await this.getItem(this.product.id);
    },
    async getItem(itemId) {
      this.error = false;
      const res = await this.getItemSaler(itemId);
      if (res.data) {
        this.product = res.data;
        if (this.product.trademark != null) {
          this.product.trademark_id = this.product.trademark.id;
          this.params.q.category_id = this.product.trademark.category.id;
          this.params.q.species_id = this.product.trademark.species.id;
        } else {
          this.product.trademark_id = null;
        }
      } else {
        this.error = true;
        this.$swal.fire(res.message, "", res.status);
      }
      await this.getCategories();
      await this.getSpecies();
      await this.SearchTrademark();
    },
    async getCategories() {
      const res = await this.getAllADCA();
      this.categories = res.categories.reverse();
    },
    async getSpecies() {
      const res = await this.getAllADSP();
      this.species = res.species.reverse();
    },
    async getAllTrademark(input) {
      const res = await this.getAllListADTR(input);
      if (res.trademarks) {
        this.trademarks = res.trademarks;
      } else {
        this.$swal.fire(res.message, "", res.status);
      }
    },
    async SearchTrademark() {
      const input = {
        page: 1,
        pages: this.params.pages,
        per_page: 1000,
        q: {
          category_id: this.params.q.category_id,
          species_id: this.params.q.species_id,
        },
      };
      await this.getAllTrademark(input);
    },
  },
  computed: {},
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
  