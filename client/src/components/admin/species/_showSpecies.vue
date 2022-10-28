<template>
  <div class="rel">
    <div class="panel-body rel flex-column">
      <div class="create">
        <b-button variant="primary right" @click="openCreate"> +Add New </b-button>
      </div>
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
              class="input-search-category"
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
            <tr v-for="post in this.species" :key="post.id">
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
                <b-button variant="primary" @click="openEdit(post.id)">
                  <i class="fa fa-edit"></i>
                </b-button>
                <!-- <router-link
                  :to="{ name: 'admin.species.edit', params: { id: post.id } }"
                >
                  <b-button variant="primary" @click="nextParams(post.id)">
                    <i class="fa fa-edit"></i>
                  </b-button>
                </router-link> -->
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
    <div v-if="is_edit" class="popup ">
      <div class="body-popup abs">
        <a @click="closed" class="cancel abs" href="#">x</a>
        <edit-props :IDProps="IDEdit" @reset="Search"></edit-props>
      </div>
      <div class="modal-backdrop in"></div>
    </div>
    <div v-if="is_create" class="popup ">
      <div class="body-popup abs">
        <a @click="closed" class="cancel abs" href="#">x</a>
        <create-species @reset="Search"></create-species>
      </div>
      <div class="modal-backdrop in"></div>
    </div>
  </div>
</template>
<script>
import EditProps from "@/components/admin/species/_editPropsSpecies.vue";
import CreateSpecies from "@/components/admin/species/_create.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("ADSP");
export default {
  name: "ShowSpecies",
  components: {
    editProps: EditProps,
    createSpecies: CreateSpecies
  },
  data() {
    return {
      is_edit: false,
      is_create:false,
      IDEdit: 1,
      total_search: "",
      species: [],
      page: {
        pageCount: 0,
        count: 1,
        per_page: 10,
      },
      params: {
        page: 1,
        per_page: 10,
        pages: "",
        q: {
          id: null,
          name: "",
        },
      },
    };
  },
  beforeCreate() {},
  created() {
    this.getAll(this.params);
  },
  mounted() {},
  props: {
    species2: [],
  },
  methods: {
    ...mapActions({
      getAllADSP: "getAllList",
      deleteADSP: "delete",
    }),
    clickCallback(pageNum) {
      this.params.page = pageNum;
      this.getAll(this.params);
    },

    openEdit(ID) {
      this.is_edit = true;
      this.IDEdit = ID;
    },
    openCreate(){
      this.is_create = true;
    },
    closed() {
      this.is_edit = false;
      this.is_create = false;
    },
    async nextParams(ID) {
      await this.$emit("next", ID);
    },
    async getAll(input) {
      const res = await this.getAllADSP(input);
      if (res.species) {
        this.species = res.species;
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
      this.is_popup = false;
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
  watch: {},
  computed: {},
};
</script>
<style>
</style>
