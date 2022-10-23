<template>
    <div class="header-saler">
      <section id="tab-saler">
        <div class="container">
          <div class="panel-body flex-row tab-menu">
            <router-link :to="{name: 'saler.index'}"> Home</router-link>
            <router-link to="/saler/products"> Products</router-link>
            <router-link to="/saler/confirm">confirm</router-link>
            <router-link to="/saler/order">Order</router-link>
          </div>
        </div>
      </section>
        
      </div>
  </template>
  <script>
  import Paginate from "vuejs-paginate";
  export default {
    name: "ProductForm",
    components: {
      Paginate,
    },
    data() {
      return {
      };
    },
    props: {},
    created() {
     
    },
  
    mounted() {},
    methods: {
    },
    watch: {
    },
    computed: {
    }, 
    components: { },
  };
  </script>
  <style>
  #tab-saler {
        background: var(--primary);
  }
  .tab-menu {
    /* background: var(--dark); */
    display: flex;
    align-items: center;
    height: 36px;
    margin-bottom: 0px;
  }
  .tab-menu a {
    color: #fff;
    padding: 10px 20px;
    /* margin-right: 20px; */
    min-width: 100px;
  }
  
  .tab-menu a.router-link-exact-active,
  .tab-menu a:hover,
  .tab-menu a.router-link-active {
    /* border-bottom: 2px solid var(--dark); */
    color: var(--dark);
    font-weight: 700;
    background: url(@/assets/images/admin/tab/tab-active.png);
    background-size: cover;
    background-repeat: repeat-x;
  }
  
  table {
    border-radius: 6px;
  }
  table td,
  table th {
    border: 1px solid #f5f5f5;
  }
  table th {
    background: var(--primary) !important;
    color: var(--white);
  }
  
  .pagination li,
  .page-item {
    background: var(--white);
    height: 30px;
    width: 30px;
    font-weight: 30px;
    vertical-align: middle;
    border: 1px solid #000;
  }
  
  .page-item.active {
    background: var(--primary);
  }
  </style>
  