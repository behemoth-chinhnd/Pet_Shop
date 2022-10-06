<template>
  <div class="container">
    <div class="body-saler">
      <div class="register-address_order bg-white">
        <h1 class="color-primary center">CREATE Address Order</h1>
        <form action="" @submit.prevent="create()" class="needs-validation text-left" novalidate>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Name</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address_order.name" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.name }" required />
              <div class="feedback-invalid" v-if="errors.name">
                {{ errors.name }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputEmail" class="col-md-3 col-form-label">Phone</label>
            <div class="col-md-9">
              <input type="phone" name="phone" class="form-control" v-model="address_order.phone" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.phone }" required />
              <div class="feedback-invalid" v-if="errors.phone">
                {{ errors.phone }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">City</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address_order.city" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.city }" required />
              <div class="feedback-invalid" v-if="errors.city">
                {{ errors.city }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">County</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address_order.county" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.county }" required />
              <div class="feedback-invalid" v-if="errors.county">
                {{ errors.county }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Street</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address_order.street" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.street }" required />
              <div class="feedback-invalid" v-if="errors.street">
                {{ errors.street }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Apartment Number</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address_order.apartment_number" @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.apartment_number }" required />
              <div class="feedback-invalid" v-if="errors.apartment_number">
                {{ errors.apartment_number }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-md-3 col-form-label">Description</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="address_order.description" @blur="validate()"
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
                <div class="right">
                  <b-button type="submit" variant="primary ">Create</b-button>
                  <b-button class="text-white" variant="info mgl-10px" @click="reset()">Test</b-button>
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
import { mapActions } from "vuex";
import api from '@/plugin/axios';
export default {
  name: "CreateUser",
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
      address_order: [],
      address_order: {
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
      if (!this.address_order.name) {
        this.errors.name = "Error: Name not Empty";
        isValid = false;
      }
      if (!this.address_order.phone) {
        this.errors.phone = "Error: Email not Empty ";
        isValid = false;
      }
      if (!this.address_order.city) {
        this.errors.city = "Error: City not Empty ";
        isValid = false;
      }
      if (!this.address_order.county) {
        this.errors.county = "Error: County not Empty ";
        isValid = false;
      }
      if (!this.address_order.street) {
        this.errors.street = "Error: Street not Empty ";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async create() {
      if (this.validate()) {
        await this.$store.dispatch("ADDR/create", this.address_order)
      };
      this.checkErrors();
    },
    reset() {
      (this.address_order.name = "DC.Minh"),
        (this.address_order.phone = "0961646828"),
        (this.address_order.city = "Thái Bình"),
        (this.address_order.county = "Thái Thụy"),
        (this.address_order.street = "Thụy Ninh"),
        (this.address_order.apartment_number = "Đoán xem :v"),
        (this.address_order.description = "No Comment")


    },
    checkErrors() {
      const err = this.$store.state.PROD.state.errors;
      const isErr = this.$store.state.PROD.state.isErr
      if (isErr) {
        if (err.name) {
          this.errors.name = err.name
        }
        if (err.phone) {
          this.errors.phone = err.phone
        }
        if (err.city) {
          this.errors.city = err.city
        }
        if (err.county) {
          this.errors.county = err.county
        }
        if (err.street) {
          this.errors.street = err.street
        }
      }

    }
  },
};
</script>
<style scoped>
.register-address_order {
  /* width: 500px; */
  margin: 0 auto;
  /* border: 1px solid #a4a4a4; */
}

.form-group {
  margin-bottom: 10px;
}
</style>
    