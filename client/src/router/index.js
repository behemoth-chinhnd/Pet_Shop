import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '@/layout/Admin.vue'
import Client from '@/layout/Client.vue'
import User from '@/layout/User.vue'
import Saler from '@/layout/Saler.vue'
import Cart from '@/layout/Cart.vue'
import Order from '@/layout/Order.vue'
import Purchase from '@/layout/Purchase.vue'

import store from '@/store/store'


Vue.use(VueRouter)

const routes = [
  { path: '/input', name: 'input', component: () => import('@/components/tester/InputCash/ViewInput.vue') },
  { path: '/admin/login', name: 'admin.login', component: () => import('@/views/admin/LoginAdmin.vue') },

  {
    path: '/', name: 'client', component: Client, children: [
      { path: '/', name: 'home.index', component: () => import('@/views/client/IndexHome.vue') },
      { path: 'products', name: 'home.products', component: () => import('@/views/client/products/ListProducts.vue') },
      { path: 'products/detail/:id', name: 'home.products.detail', component: () => import('@/views/client/products/DetailProducts.vue') },
      { path: 'register', name: 'home.users.register', component: () => import('@/views/client/users/RegisterUser.vue') },
      { path: 'login', name: 'home.users.login', component: () => import('@/views/client/users/LoginUser.vue') },
      { path: 'users', name: 'home.users', component: () => import('@/views/client/users/ListUser.vue') },
      { path: 'test_login', name: 'test.login', component: () => import('@/components/tester/TestLogin.vue') },

      {
        path: 'carts', name: 'home.carts', component: Cart, children: [
          { path: '/', name: 'home.carts', component: () => import('@/views/client/carts/ListCarts.vue') },
          { path: 'buynow', name: 'home.carts.buynow', component: () => import('@/views/client/carts/ProductCart.vue') },
        ]
      },
      {
        path: 'user', name: 'user', component: User, children: [
          { path: '/', name: 'user.index', component: () => import('@/views/client/users/ProfileUser.vue') },
          {
            path: 'account', name: 'user.account', component: User, children: [
              { path: '/', name: 'user.index', component: () => import('@/views/client/users/ProfileUser.vue') },
              { path: 'profile', name: 'account.profile', component: () => import('@/views/client/users/ProfileUser.vue') },

              {
                path: 'address_order', name: 'address_order', component: User, children: [
                  { path: '', name: 'address_order.list', component: () => import('@/views/client/address_order/ListAddress.vue') },
                  { path: 'create', name: 'address_order.create', component: () => import('@/views/client/address_order/CreateAddress.vue') },
                  { path: 'edit/:id', name: 'address_order.edit', component: () => import('@/views/client/address_order/EditAddress.vue') },
                ]
              },
            ]
          },
          {
            path: 'purchase', name: 'user.purchase', component: Purchase, children: [
              { path: '/', name: 'purchase.index', component: () => import('@/views/client/orders/ListOrders.vue') },
            ]
          },

        ]
      },
      {
        path: 'orders', name: 'orders', component: Order, children: [
          { path: '/', name: 'orders.list', component: () => import('@/views/client/orders/ListOrders.vue') },

        ]
      },


    ],
  },
  {
    path: '/saler', name: 'saler', component: Saler, children: [
      { path: 'index', name: 'saler.index', component: () => import('@/views/client/saler/products/ListProduct.vue') },
      { path: 'products', name: 'saler.products', component: () => import('@/views/client/saler/products/ListProduct.vue') },
      { path: 'products/create', name: 'saler.products.create', component: () => import('@/views/client/saler/products/CreateProduct.vue') },
      { path: 'products/edit/:id', name: 'saler.products.edit', component: () => import('@/views/client/saler/products/EditProduct.vue') },
      { path: 'order', name: 'saler.order', component: () => import('@/views/client/saler/order/IndexOrder.vue') },
      { path: 'confirm', name: 'saler.confirm', component: () => import('@/views/client/saler/confirm/IndexConfirm.vue') },




    ]
  },


  {
    path: '/admin/', name: 'admin', component: Admin, children: [
      { path: '', name: 'admin.home', component: () => import('@/components/product/_showProduct.vue') },
      {
        path: 'management/', name: 'admin.management', component: () => import('@/components/admin/TabMenu.vue'),
        children: [
          { path: 'login', name: 'admin.management.login', component: () => import('@/components/admin/LoginAdmin.vue') },
          { path: 'users', name: 'admin.management.users', component: () => import('@/components/admin/users/ListUser.vue') },
          { path: 'users/create', name: 'admin.management.users.create', component: () => import('@/components/admin/users/CreateUser.vue') },
          { path: 'users/edit/:id', name: 'admin.management.users.edit', component: () => import('@/components/admin/users/CreateUser.vue') },
        ]
      },
      { path: 'category', name: 'admin.category', component: () => import('@/views/admin/category/ListCategory.vue') },
      { path: 'category/create', name: 'admin.category.create', component: () => import('@/views/admin/category/CreateCategory.vue') },
      { path: 'category/edit/:id', name: 'admin.category.edit', component: () => import('@/views/admin/category/EditCategory.vue') },

      { path: 'species', name: 'admin.species', component: () => import('@/views/admin/species/ListSpecies.vue') },
      { path: 'species/create', name: 'admin.species.create', component: () => import('@/views/admin/species/CreateSpecies.vue') },
      { path: 'species/edit/:id', name: 'admin.species.edit', component: () => import('@/views/admin/species/EditSpecies.vue') },

      { path: 'trademark', name: 'admin.trademark', component: () => import('@/views/admin/trademark/ListTrademark.vue') },
      { path: 'trademark/create', name: 'admin.trademark.create', component: () => import('@/views/admin/trademark/CreateTrademark.vue') },
      { path: 'trademark/edit/:id', name: 'admin.trademark.edit', component: () => import('@/views/admin/trademark/EditTrademark.vue') },

      { path: 'order', name: 'admin.order', component: () => import('@/views/admin/order/ListOrderAdmin.vue') },



    ],
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (((to.path === '/login') || (to.path === '/register')) && (store.state.AUTH.state.isActive === true)) {
    next({ path: '/user/account/profile' })
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if ((to.path.includes('/user') || to.path.includes('/saler') ) && (store.state.AUTH.state.isActive === false)) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
