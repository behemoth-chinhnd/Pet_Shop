// import Vue from "vue";
// import App from "@/App.vue";
// import store from '@/store/store';
// import router from "@/router/index";
// import axios from "axios";
// import VueAxios from "vue-axios";
// import VueSweetslert2 from "vue-sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";



export default {
  reply(titel,status) {

    // this.$swal.fire({
    //   title: 'Do you want to save the changes?',
    //   // showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Save',
    //   // denyButtonText: `Don't save`,
    //   }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {
    //       this.$store.dispatch("AUTH/update", this.birthday)
    //       .then((res) => {
    //         console.log(`save`);
    //         this.$swal.fire('Update Successful!', '', '');
    //       })
    //     }
    //   })

    const result = this.$swal.fire(titel, '', status);
    return result;
  },

  // reply(Titel,Text, URL, Input) {

  //    this.$swal.fire({
  //     title: Titel,
  //     showCancelButton: true,
  //     confirmButtonText: Text,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.$store.dispatch(URL, Input)
  //         .then((res) => {
  //           console.log(`save`);
  //           this.$swal.fire('Successful!', '', 'success');
  //         })
  //       }
  //     })
  //   // return result;
  // },
  integer(a, b) {
    const result = Math.floor((1 - a / b) * 100);
    return result;
  },
  cash(number){
    const result = Intl.NumberFormat().format(number)
    return result;
  }
  
}
// new Vue({
//   store,
//   router,
//   render: (h) => h(App)
// }).$mount("#app");
// Vue.use(VueSweetslert2);
// Vue.use(VueAxios, { $request: axios });

