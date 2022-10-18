<template >
  <div class="body-saler">
    <div class="panel-body">
      <div v-if="error" class="error">
        <img src="@/assets/images/plugin/404_error.png" alt="" />
      </div>
      <div v-if="!error" class="edit-trademark">
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
                Edit trademark - ID: #{{ this.trademark.id }}
              </h1>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail" class="col-form-label">Category</label>
            <div class="">
              <select v-model="trademark.category.id">

                <option
                  v-for="item in categories"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail" class="col-form-label">Species</label>
            <div class="">
              <select v-model="trademark.species.id">
                <option
                  v-for="item in species"
                  :key="item.id"
                  v-bind:value="item.id"
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
                v-model="trademark.name"
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
            <label for="inputtrademarkdescription" class="col-form-label">Description</label>
            <div class="">
              <input
                type="text"
                class="form-control"
                v-model="trademark.description"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.description }"
                required
              />
              <div class="feedback-invalid" v-if="errors.description">
                {{ errors.description }}
              </div>
            </div>
          </div>
          
          
          
          <div class="col-md-12 flex-column">
            <img
              class="img-edit"
              ref="image"
              :src="
                this.trademark.image_url
                  ? this.trademark.image_url
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
                <router-link :to="{ name: 'admin.trademark' }">
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
const mapActionsADTR = createNamespacedHelpers("ADTR");
const mapActionsADCA = createNamespacedHelpers("ADCA");
const mapActionsADSP = createNamespacedHelpers("ADSP");

export default {
  name: "CurrencyInput",
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
        description: "",
      },
      categories: [],
      species: [],
      trademark: {
        name: "",
        image_url: "",
        description: "",
        species_id: null,
        species:{
          name:null
        },
        category_id: null,
        category:{
          id: null,
        },
      },
      error: false,
      inputPicture: null,
    };
  },

  created() {
    const itemId = this.$route.params.id;
    this.getItem(itemId);
    this.getCategories();
    this.getSpecies();
  },
  methods: {
    ...mapActionsADTR.mapActions({
      editADTR: "edit",
      getItemADTR: "getItem",
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

      };
      if (!this.trademark.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },

    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
      this.trademark.image_url = URL.createObjectURL(
        this.$refs.inputFile.files[0]
      );
    },

    async edit() {
      this.trademark.category_id = this.trademark.category.id
      this.trademark.species_id = this.trademark.species.id

      console.log(`1`)
      if (this.inputPicture === null) {
        console.log(`2`)

        const input = {
          file: null,
          trademark: this.trademark,
        };
        if (this.validate()) {
          console.log(`3`)

          const res = await this.editADTR(input);
          if (res.data) {
            this.$swal.fire("Edit trademark Success", "", "success");
            this.trademark = res.data;
          } else {
            this.$swal.fire(res.message, "", res.status);
          }
        }
      } else {
        console.log(`2-2`)

        let formData = new FormData();
        formData.append("file", this.inputPicture);
        const input = {
          file: formData,
          trademark: this.trademark,
        };
        if (this.validate()) {
          console.log(`3-2`)

          const res = await this.editADTR(input);
          if (res.data) {
            this.$swal.fire("Edit trademark Success", "", "success");
            this.categories = res.data;
          } else {
            this.$swal.fire(res.message, "", res.status);
          }
        }
      }
    },
    async getItem(itemId) {
      this.error = false;
      const res = await this.getItemADTR(itemId);
      console.log(`data`,res)
      if (res.data) {
        this.trademark = res.data;
        this.trademark.category.name = res.data.category.name
      } else {
        this.error = true;
        this.$swal.fire(res.message, "", res.status, 1000);
      }
    },
    async getCategories() {
      const res = await this.getAllADCA();
      console.log(`categories`, res);
      this.categories = res.categories;
    },
    async getSpecies() {
      const res = await this.getAllADSP();
      console.log(`species`, res);
      this.species = res.species;
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
  