<template>
  <div class="body-saler">
    <div class="panel-body">
      <div class="register-product bg-white">
        <h1 class="color-primary">CREATE PRODUCT</h1>
        <form @submit.prevent="SearchTrademark()" class="form-search col-md-3">
          <select
            @change="SearchTrademark()"
            v-model="params.q.category_id"
            class="form-select"
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
        </form>
        <form @submit.prevent="SearchTrademark()" class="form-search col-md-3">
          <select
            @change="SearchTrademark()"
            v-model="params.q.species_id"
            class="form-select"
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
        </form>

        <form  class="form-search col-md-3">
          <select
           
            v-model="product.trademark_id"
            class="form-select"
          >
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
        </form>
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
const mapActionsADTR = createNamespacedHelpers("ADTR");
const mapActionsADCA = createNamespacedHelpers("ADCA");
const mapActionsADSP = createNamespacedHelpers("ADSP");
import api from "@/plugin/axios";
export default {
  name: "CreateUser",
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
        trademark_id:null,
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
  created() {
    this.getCategories();
    this.getSpecies();
    this.SearchTrademark();
  },
  methods: {
    ...mapActionsPROD.mapActions({
      createPROD: "create",
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
      await this.SearchTrademark();
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
          console.log(input)
          const res = await this.createPROD(input);
          this.$swal.fire(res.message, "", res.status);
        }
      }
    },
    async getCategories() {
      const res = await this.getAllADCA();
      console.log(`categories`, res);
      this.categories = res.categories.reverse();
    },
    async getSpecies() {
      const res = await this.getAllADSP();
      console.log(`species`, res);
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
      if (!this.params.q.id) {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: 100,
          q: {
            category_id: this.params.q.category_id,
            species_id: this.params.q.species_id,
          },
        };
        await this.getAllTrademark(input);
      } else {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: 100,
          q: {
            id: this.params.q.id,
          },
        };
        await this.getAllTrademark(input);
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
    