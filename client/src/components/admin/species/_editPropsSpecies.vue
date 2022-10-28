<template >
  <div class="body-reset row">
    <div class="panel-body">
      <div v-if="error" class="error">
        <img src="@/assets/images/plugin/404_error.png" alt="" />
      </div>
      <div v-if="!error" class="edit-species">
        <form
          action=""
          @submit.prevent="edit()"
          class="needs-validation text-left row"
          novalidate
        >
          <div class="form-group col-md-12">
            <h1 class="color-primary">
              Edit species - ID: #{{ this.species.id }}
            </h1>
          </div>
          <div class="form-group col-lg-6 col-md-12 col-sm-12">
            <div class="form-group">
              <label for="inputName" class="col-form-label">Name</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="species.name"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.name }"
                required
              />
              <div class="feedback-invalid" v-if="errors.name">
                {{ errors.name }}
              </div>
            </div>
          </div>
          <div class="form-group col-lg-6 col-md-12 col-sm-12">
            <div class="form-group">
              <label for="inputspeciesdescription" class="col-form-label"
                >Description</label
              >
            </div>
            <div class="form-group col-md-12">
              <input
                type="text"
                class="form-control col-md-12"
                v-model="species.description"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.description }"
                required
              />
              <div class="feedback-invalid" v-if="errors.description">
                {{ errors.description }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <img
              class="img-edit"
              ref="image"
              :src="
                this.species.image_url
                  ? this.species.image_url
                  : require('@/assets/images/plugin/no_photo.jpeg')
              "
            />
            <input
              id="inputFile"
              type="file"
              ref="inputFile"
              @change="uploadFile()"
            />
          </div>
          <div class="">
            <b-button class="right" type="submit" variant="primary"
              >Edit</b-button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("ADSP");
export default {
  components: {},
  name: "CurrencyInput",
  props: ["IDProps"],
  data() {
    return {
      namePage: "",
      ID: "",
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
      species: {
        name: "",
        image_key: "",
        description: "",
      },
      error: false,
      inputPicture: null,
    };
  },

  created() {
    const itemId = this.IDProps;
    this.getItem(itemId);
  },
  mounted() {},
  methods: {
    ...mapActions({
      editADSP: "edit",
      getItemADSP: "getItem",
    }),

    validate() {
      let isValid = true;
      this.errors = {
        name: "",
      };
      if (!this.species.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },

    async nextEdit(ID) {
      this.getItem(ID);
    },

    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
      this.species.image_url = URL.createObjectURL(
        this.$refs.inputFile.files[0]
      );
    },

    async edit() {
      if (this.inputPicture === null) {
        var input = {
          file: null,
          species: this.species,
        };
      } else {
        let formData = new FormData();
        formData.append("file", this.inputPicture);
        var input = {
          file: formData,
          species: this.species,
        };
      }
      const res = await this.editADSP(input);
      this.$swal.fire("Edit" + " " + res.alert.message, res.alert.text, res.alert.status);
      this.$emit("reset");
    },

    async getItem(itemId) {
      this.error = false;
      const res = await this.getItemADSP(itemId);
      if (res.data) {
        this.species = res.data;
      } else {
        this.error = true;
        this.$swal.fire(res.message, "", res.status, 1000);
      }
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
  