"use strict";(self["webpackChunkvue_router"]=self["webpackChunkvue_router"]||[]).push([[644],{7644:function(t,r,e){e.r(r),e.d(r,{default:function(){return d}});var s=function(){var t=this,r=t._self._c;return r("div",{staticClass:"add-product"},[r("div",{staticClass:"pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"},[r("h3",{staticClass:"display-5"},[t._v("Product Information")]),r("router-link",{attrs:{to:"/product"}},[t._v("Back")])],1),r("div",{staticClass:"container"},[r("form",{staticClass:"needs-validation text-left",attrs:{action:"",novalidate:""},on:{submit:function(r){return r.preventDefault(),t.save()}}},[r("div",{staticClass:"form-group row"},[r("label",{staticClass:"col-md-3 col-form-label",attrs:{for:"inputName"}},[t._v("Product Name")]),r("div",{staticClass:"col-md-9"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.product.name,expression:"product.name"}],staticClass:"form-control",class:{"is-invalid":t.errors.name},attrs:{type:"text",required:""},domProps:{value:t.product.name},on:{blur:function(r){return t.validate()},input:function(r){r.target.composing||t.$set(t.product,"name",r.target.value)}}}),t.errors.name?r("div",{staticClass:"feedback-invalid"},[t._v(t._s(t.errors.name))]):t._e()])]),r("div",{staticClass:"form-group row"},[r("label",{staticClass:"col-md-3 col-form-label",attrs:{for:"inputPrice"}},[t._v("Product Price")]),r("div",{staticClass:"col-md-9"},[r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.product.price,expression:"product.price",modifiers:{number:!0}}],staticClass:"form-control",class:{"is-invalid":t.errors.price},attrs:{type:"number",required:""},domProps:{value:t.product.price},on:{blur:[function(r){return t.validate()},function(r){return t.$forceUpdate()}],input:function(r){r.target.composing||t.$set(t.product,"price",t._n(r.target.value))}}}),t.errors.price?r("div",{staticClass:"feedback-invalid"},[t._v(t._s(t.errors.price))]):t._e()])]),r("div",{staticClass:"form-group row"},[r("label",{staticClass:"col-md-3 col-form-label",attrs:{for:"inputDescription"}},[t._v("Product Description")]),r("div",{staticClass:"col-md-9"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.product.description,expression:"product.description"}],staticClass:"form-control",class:{"is-invalid":t.errors.description},attrs:{type:"text",required:""},domProps:{value:t.product.description},on:{blur:function(r){return t.validate()},input:function(r){r.target.composing||t.$set(t.product,"description",r.target.value)}}}),t.errors.description?r("div",{staticClass:"feedback-invalid"},[t._v(" "+t._s(t.errors.description)+" ")]):t._e()])]),r("div",{staticClass:"form-group row"},[r("label",{staticClass:"col-md-3 col-form-label",attrs:{for:"inputDescription"}}),r("div",{staticClass:"col-md-9"},[r("div",{staticClass:"left group-btn"},[r("b-button",{attrs:{type:"submit",variant:"primary "}},[t._v("Save")]),r("b-button",{attrs:{variant:"danger mgl-10px"}},[t._v("Cancel")])],1)])])])])])},i=[],o={name:"ProductDta",data(){return{errors:{name:"loi name"},product:{id:"",name:"",price:"",description:"",time:""}}},created(){const t=this.$route.params.id;console.log(t),t&&this.getProduct(t)},methods:{validate(){let t=!0;return this.errors={id:"",name:"",price:"",description:""},this.product.name||(this.errors.name="Loi name",t=!1),this.product.price?this.isNumber(this.product.price)||(this.errors.price="price is Number",t=!1):(this.errors.price="Error price",t=!1),this.product.description||(this.errors.description="Loi description",t=!1),t},isNumber(t){return/^\d*$/.test(t)},save(){if(this.validate()){if(this.product.id)return void this.$request.put(`http://localhost:8000/api/products/${this.product.id}`,this.product).then((t=>{t.data.success?this.$router.push({name:"product.list"}):alert("Errors")}));this.product.time=(new Date).toLocaleString(),this.$request.post("http://localhost:8000/api/products",this.product).then((t=>{t.data.success&&this.$router.push({name:"product.list"})}))}},getProduct(t){this.$request.get(`http://localhost:8000/api/products/${t}`).then((t=>{this.product=t.data}))}}},a=o,c=e(1001),n=(0,c.Z)(a,s,i,!1,null,null,null),d=n.exports}}]);
//# sourceMappingURL=644.0fce29cd.js.map