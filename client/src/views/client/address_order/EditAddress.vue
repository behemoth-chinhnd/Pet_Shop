<template>
  <div class="container">
    <div class="body-saler">
      <div class="edit-address">
        <form action="" @submit.prevent="edit()" class="needs-validation text-left" novalidate>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Name</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address.name" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.name }" required />
              <div class="feedback-invalid" v-if="errors.name">
                {{ errors.name }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputEmail" class="col-md-3 col-form-label">Phone</label>
            <div class="col-md-9">
              <input type="phone" name="phone" class="form-control" v-model="address.phone" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.phone }" required />
              <div class="feedback-invalid" v-if="errors.phone">
                {{ errors.phone }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">City</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address.city" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.city }" required />
              <div class="feedback-invalid" v-if="errors.city">
                {{ errors.city }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">County</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address.county" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.county }" required />
              <div class="feedback-invalid" v-if="errors.county">
                {{ errors.county }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Street</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address.street" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.street }" required />
              <div class="feedback-invalid" v-if="errors.street">
                {{ errors.street }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Apartment Number</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address.apartment_number" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.apartment_number }" required />
              <div class="feedback-invalid" v-if="errors.apartment_number">
                {{ errors.apartment_number }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Description</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address.description" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.description }" required />
              <div class="feedback-invalid" v-if="errors.description">
                {{ errors.description }}
              </div>
            </div>
          </div>
          <div class="row">
            <label for="input" class="col-md-3 col-form-label"></label>
            <div class="col-md-9">
              <div class="panel-body flex-row-space-between-center">
                <router-link :to="{name: 'address_order.list'}">
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
import { mapActions } from "vuex";
export default {
  name: "CreateData",
  data() {
    return {
      errors: {
        name: "",
        phone: "",
        city: "",
        county: "",
        street: "",
        street: "",
        apartment_number:"",
        description:""
      },
      addresss: [],
      address: {
        name: "",
        phone: "",
        city: "",
        county: "",
        street: "",
        street: "",
        apartment_number:"",
        description:""
      },
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
    ...mapActions([""]),
    validate() {
      let isValid = true;
      this.errors = {
        name: "",
        phone: "",
        city: "",
        county: "",
        street: ""
      };
      if (!this.address.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      if (!this.address.phone) {
        this.errors.phone = "Error: Email not Empty ";
        isValid = false;
      }
      if (!this.address.city) {
        this.errors.city = "Error: City not Empty ";
        isValid = false;
      }
      if (!this.address.county) {
        this.errors.county = "Error: County not Empty ";
        isValid = false;
      }
      if (!this.address.street) {
        this.errors.street = "Error: Street not Empty ";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async edit() {
      if (this.validate()) {
          await this.$store.dispatch("ADDR/edit", this.address)
          this.$router.push({path: '/address_order'})
      }
    },
    async getItem(itemId) {
      await this.$store.dispatch("ADDR/getItem", itemId)
      return this.address = this.$store.state.ADDR.state.address
    },
  },
  computed: {
    Item() {
      return this.address = this.$store.state.ADDR.state.address
    }
  }
};
</script>
<style>
.form-group {
  margin-bottom: 10px;
}
</style>
  