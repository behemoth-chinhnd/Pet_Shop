<template>
  <div class="body-saler">
    <div class="panel-body">
      <div class="register-trademark bg-white">
        <h1 class="color-primary">CREATE trademark</h1>
        <form
          action=""
          @submit.prevent="create()"
          class="needs-validation text-left row"
          novalidate
        >
          <div class="form-group col-md-6">
            <label for="inputEmail" class="col-form-label">Species</label>
            <div class="">
              <select v-model="trademark.species_id">
                <option
                  v-for="item in species"
                  :key="item.id"
                  v-bind:value="item.id"
                  :selected="trademark.species_id === item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail" class="col-form-label">Category</label>
            <div class="">
              <select v-model="trademark.category_id">
                <option
                  v-for="item in categories"
                  :key="item.id"
                  v-bind:value="item.id"
                  :selected="trademark.category_id === item.id"
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
            <label for="inputEmail" class="col-form-label">Description</label>
            <div class="">
              <input
                type="text"
                class="form-control"
                v-model.number="trademark.description"
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
const mapActionsADTR = createNamespacedHelpers("ADTR");
const mapActionsADCA = createNamespacedHelpers("ADCA");
const mapActionsADSP = createNamespacedHelpers("ADSP");

import api from "@/plugin/axios";
export default {
  name: "CreateUser",
  data() {
    return {
      errors: {
        name: "",
        image_url: "",
        description: "",
      },
      categories: [],
      species: [],
      trademark: {
        name: "",
        image_url: "",
        description: "",
        species_id: "",
        category_id: "",
      },
      inputPicture: null,
    };
  },
  created() {
    this.getCategories();
    this.getSpecies();
  },
  methods: {
    ...mapActionsADTR.mapActions({
      createADTR: "create",
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
        description: "",
      };
      if (!this.trademark.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      if (!this.trademark.description) {
        this.errors.description = "Error: Description not Empty ";
        isValid = false;
      }
      return isValid;
    },
    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
      this.trademark.image_url = URL.createObjectURL(
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
            data: this.trademark,
          };
          console.log(`input`, input);
          const res = await this.createADTR(input);
          this.$swal.fire(res.message, "", res.status);
        }
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
};
</script>
<style scoped>
</style>
    