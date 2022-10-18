<template >
  <div class="">
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
          <label for="inputName" class="col-form-label"></label>
          <div class="">
            <h1 class="color-primary">
              Edit species - ID: #{{ this.species.id }}
            </h1>
          </div>
        </div>
        <div class="form-group col-md-4">
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
        <div class="form-group col-md-8">
          <div class="form-group"></div>
          <label for="inputName" class="col-form-label">Name</label>
          <div class="">
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
          <label for="inputspeciesdescription" class="col-form-label"
            >Description</label
          >
          <div class="">
            <input
              type="text"
              class="form-control"
              v-model="species.description"
              @blur="validate()"
              v-bind:class="{ 'is-invalid': errors.description }"
              required
            />
            <div class="feedback-invalid" v-if="errors.description">
              {{ errors.description }}
            </div>
            <router-link
              :to="`/admin/species/edit/${species.id + 1}`"
              :href="`/admin/species/edit/${species.id + 1}`"
            >
              <b-button variant="primary" >
                <i class="fa fa-edit"></i>Next
              </b-button>
            </router-link>
            <button></button>
          </div>
        </div>

        <div class="row">
          <label for="input" class="col-form-label"></label>
          <div class="">
            <div class="panel-body flex-row-space-between-center">
              <router-link :to="{ name: 'admin.species' }">
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

  <!-- next  -->
  <div class="panel-body">
    <div class="search flex-row-center-center gap-10px">
      <form @submit.prevent="Search()" class="form-search">
        <input
          type="number"
          v-model="params.q.id"
          class="input-search-id"
          placeholder="ID"
        />
      </form>
      <form
        @submit.prevent="Search()"
        class="form-search flex-row-space-between-center flex-1"
      >
        <div class="flex-row-space-between rel">
          <i
            @click="Search()"
            type="submit"
            class="icon-search fa fa-search abs"
          ></i>

          <input
            type="text"
            v-model="params.q.name"
            class="input-search"
            placeholder="Search"
          />
        </div>
        <p>Result:{{ this.total_search }}</p>
      </form>
    </div>

    <div class="card-deck text-center scroll-x">
      <table class="table table-primary table-bdrs-5px">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in this.specieses" :key="post.id">
            <td scope="row">{{ post.id }}</td>
            <td class="img">
              <img
                class="img-card"
                ref="image"
                :src="
                  post.image_url
                    ? post.image_url
                    : require('@/assets/images/plugin/no_photo.jpeg')
                "
                alt=""
              />
            </td>
            <td>{{ post.name }}</td>
            <td>{{ post.description }}</td>

            <td class="gap-10px">
              <router-link
               
                  :to="{ path: `/admin/species/edit/${post.id}` } "
                >
              <b-button variant="primary" @click="getItem(post.id)">
                <i class="fa fa-edit"></i>
              </b-button>
              </router-link>
              <b-button variant="danger" @click="onDelete(post.id)">
                <i class="fa fa-trash"></i>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="this.params.pages > 1" class="panel-footer">
      <paginate
        v-model="params.page"
        :page-count="this.params.pages"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'<<'"
        :next-text="'>>'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </div>
  </div>

  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("ADSP");

export default {
  name: "CurrencyInput",
  data() {
    return {
      total_search: "",
      specieses: [],
      // search: "",
      page: {
        pageCount: 0,
        count: 1,
        per_page: 5,
      },
      params: {
        page: 1,
        per_page: 3,
        pages: "",
        q: {
          id: null,
          name: "",
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
    const itemId = this.$route.params.id;
    // if(this.$route.path.includes(`/admin/species/${this.$route.params.id}`))
    // {
    this.getItem(itemId);
    this.getAll(this.params);

    // }
  },
  methods: {
    ...mapActions({
      editADSP: "edit",
      getItemADSP: "getItem",
      getAllADSP: "getAllList",
      deleteADSP: "delete",
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

    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
      this.species.image_url = URL.createObjectURL(
        this.$refs.inputFile.files[0]
      );
    },

    async edit() {
      console.log(`1`);
      if (this.inputPicture === null) {
        console.log(`2`);

        const input = {
          file: null,
          species: this.species,
        };
        if (this.validate()) {
          console.log(`3`);

          const res = await this.editADSP(input);
          if (res.data) {
            this.$swal.fire("Edit species Success", "", "success");
            this.species = res.data;
          } else {
            this.$swal.fire(res.message, "", res.status);
          }
        }
      } else {
        console.log(`2-2`);

        let formData = new FormData();
        formData.append("file", this.inputPicture);
        const input = {
          file: formData,
          species: this.species,
        };
        if (this.validate()) {
          console.log(`3-2`);

          const res = await this.editADSP(input);
          if (res.data) {
            this.$swal.fire("Edit species Success", "", "success");
            this.categories = res.data;
          } else {
            this.$swal.fire(res.message, "", res.status);
          }
        }
      }
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
    // async run(event) {
    //   if (this.$route.path.includes(`/admin/species/edit/${itemId}`)) {
    //     const res = await this.getItem(itemId);
    //     // return this.species = res
    //   }
    // },
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll(this.params);
    },
    async getAll(input) {
      const res = await this.getAllADSP(input);
      if (res.species) {
        this.specieses = res.species;
        this.total_search = res.meta.total;
        this.params.page = res.meta.page;
        this.params.pages = res.meta.pages;
      } else {
        this.$swal.fire(res.message, "", res.status);
      }
    },
    async Search() {
      if (!this.params.q.id) {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: this.params.per_page,
          q: {
            name: this.params.q.name,
          },
        };
        await this.getAll(input);
      } else {
        const input = {
          page: 1,
          pages: this.params.pages,
          per_page: this.params.per_page,
          q: {
            id: this.params.q.id,
          },
        };
        await this.getAll(input);
      }
    },
    async onDelete(speciesId) {
      this.$swal
        .fire({
          title: "Delete?",
          text: "You won't be able to revert this!",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!",
          timer: 3000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await this.deleteADSP(speciesId);
            this.$swal.fire(res.message, "", res.status);
            this.Search();
          }
        });
    },
  },
  computed: {},
  mounted() {
    // this.run(event);
  },
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
  