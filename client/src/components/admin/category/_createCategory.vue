<template>
  <div class="body-saler">
    <div class="panel-body">
      <div class="register-category bg-white">
        <h1 class="color-primary">CREATE CATEGORY</h1>
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
                v-model="category.name"
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
                v-model.number="category.description"
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
                this.category.image_url
                  ? this.category.image_url
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
                <router-link :to="{ name: 'admin.category' }">
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
const { mapActions } = createNamespacedHelpers("ADCA");
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
      category: {
        name: "",
        image_url: "",
        description: "",
      },
      inputPicture: null,
    };
  },
  created() {},
  methods: {
    ...mapActions({
      createADCA: "create",
    }),
    validate() {
      let isValid = true;
      this.errors = {
        name: "",
        description: "",
      };
      if (!this.category.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      if (!this.category.description) {
        this.errors.description = "Error: Description not Empty ";
        isValid = false;
      }
      return isValid;
    },
    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
      this.category.image_url = URL.createObjectURL(
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
            data: this.category,
          };
          const res = await this.createADCA(input);
          this.$swal.fire(res.message, "", res.status);
        }
      }
    },
  },
};
</script>
<style scoped>
.register-category {
  /* width: 500px; */
  margin: 0 auto;
  /* border: 1px solid #a4a4a4; */
}

.form-group {
  margin-bottom: 10px;
}
</style>
    