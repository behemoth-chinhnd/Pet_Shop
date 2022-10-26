<template >
  <div class="body-reset row gap-15px">
    <div class="panel-body col-lg-6 col-md-12 col-sm-12 mgl--7-5px">
      <div v-if="error" class="error">
        <img src="@/assets/images/plugin/404_error.png" alt="" />
      </div>
      <div v-if="!error" class="">
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
                Edit category - ID: #{{ this.category.id }}
              </h1>
            </div>
          </div>
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
            <label for="inputcategorydescription" class="col-form-label"
              >Description</label
            >
            <div class="">
              <input
                type="text"
                class="form-control"
                v-model="category.description"
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
                <b-button type="submit" variant="primary">Edit</b-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="panel-body col-lg-6 col-md-12 col-sm-12 mgr--7-5px">
      <list-categories :ID="ID" @next="nextEdit" ref="test"></list-categories>
    </div>
  </div>
</template>
<script>
import ListCategories from "@/components/admin/category/_showCategory.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("ADCA");
export default {
  name: "CurrencyInput",
  components: {
    listCategories: ListCategories,
  },
  data() {
    return {
      ID: "",
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
      category: {
        name: "",
        image_key: "",
        description: "",
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
    ...mapActions({
      editADCA: "edit",
      getItemADCA: "getItem",
    }),
    validate() {
      let isValid = true;
      this.errors = {
        name: "",
      };
      if (!this.category.name) {
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
      this.category.image_url = URL.createObjectURL(
        this.$refs.inputFile.files[0]
      );
    },
    async nextEdit(ID) {
      this.getItem(ID);
    },
    async getToList() {
      await this.$refs.test.Search();
    },
    async edit() {
      console.log(`1`);
      if (this.inputPicture === null) {
        const input = {
          file: null,
          category: this.category,
        };
        if (this.validate()) {
          const res = await this.editADCA(input);
          if (res.data) {
            this.$swal.fire("Edit Category Success", "", "success");
            this.category = res.data;
          } else {
            this.$swal.fire(res.message, "", res.status);
          }
        }
      } else {
        let formData = new FormData();
        formData.append("file", this.inputPicture);
        const input = {
          file: formData,
          category: this.category,
        };
        if (this.validate()) {
          const res = await this.editADCA(input);
          if (res.data) {
            this.$swal.fire("Edit Category Success", "", "success");
            this.categories = res.data;
          } else {
            this.$swal.fire(res.message, "", res.status);
          }
        }
      }
      await this.getToList();
    },
    async getItem(itemId) {
      this.error = false;
      const res = await this.getItemADCA(itemId);
      if (res.data) {
        this.category = res.data;
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
  