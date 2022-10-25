import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '@/layout/Admin.vue'
import Client from '@/layout/Client.vue'
import User from '@/layout/User.vue'
import Seller from '@/layout/Seller.vue'
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
      { path: 'store/:id', name: 'home.products', component: () => import('@/views/client/store/ListProductsStore.vue') },

      {
        path: 'carts', name: 'home.carts', component: Cart, children: [
          { path: '/', name: 'home.carts', component: () => import('@/views/client/carts/ListCarts.vue') },
          { path: 'buynow', name: 'home.carts.buynow', component: () => import('@/views/client/carts/BuyNow.vue') },
        ]
      },
      {
        path: 'user', name: 'user', component: User, children: [
          { path: '/', name: 'user.index', component: () => import('@/views/client/users/ProfileUser.vue') },
          {
            path: 'account', name: 'user.account', component: User, children: [
              { path: '/', name: 'user.index', component: () => import('@/views/client/users/ProfileUser.vue') },
              { path: 'profile', name: 'account.profile', component: () => import('@/views/client/users/ProfileUser.vue') },
              { path: 'change_phone', name: 'account.change_phone', component: () => import('@/views/client/users/ChangePhone.vue') },
              { path: 'change_email', name: 'account.change_email', component: () => import('@/views/client/users/ChangeEmail.vue') },
              { path: 'change_password', name: 'account.change_password', component: () => import('@/views/client/users/ChangePassword.vue') },

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
            path: 'purchase', name: 'user.purchase', component: Cart, children: [
              { path: ':id', name: 'purchase.index', component: () => import('@/views/client/orders/ListOrders.vue') },
              { path: '/', name: 'purchase.status', component: () => import('@/views/client/orders/ListOrders.vue') },

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
    path: '/seller', name: 'seller', component: Seller, children: [
      { path: 'index', name: 'seller.index', component: () => import('@/views/client/seller/products/ListProduct.vue') },
      { path: 'products', name: 'seller.products', component: () => import('@/views/client/seller/products/ListProduct.vue') },
      { path: 'products/create', name: 'seller.products.create', component: () => import('@/views/client/seller/products/CreateProduct.vue') },
      { path: 'products/edit/:id', name: 'seller.products.edit', component: () => import('@/views/client/seller/products/EditProduct.vue') },
      { path: 'order', name: 'seller.order', component: () => import('@/views/client/seller/order/IndexOrder.vue') },
      { path: 'confirm', name: 'seller.confirm', component: () => import('@/views/client/seller/confirm/IndexConfirm.vue') },

      { path: 'profile', name: 'seller.profile', component: () => import('@/views/client/seller/profile/Index.vue') },





    ]
  },


  {
    path: '/admin/', name: 'admin', component: Admin, children: [
      { path: '', name: 'admin.home', component: () => import('@/components/product/_showProduct.vue') },
      // {
      //   path: 'management/', name: 'admin.management', component: () => import('@/components/admin/TabMenu.vue'),
      //   children: [
      //     { path: 'users', name: 'admin.management.users', component: () => import('@/components/admin/users/ListUser.vue') },
      //     { path: 'users/create', name: 'admin.management.users.create', component: () => import('@/components/admin/users/CreateUser.vue') },
      //     { path: 'users/edit/:id', name: 'admin.management.users.edit', component: () => import('@/components/admin/users/CreateUser.vue') },
      //   ]
      // },
      { path: 'category', name: 'admin.category', component: () => import('@/views/admin/category/ListCategory.vue') },
      { path: 'category/create', name: 'admin.category.create', component: () => import('@/views/admin/category/CreateCategory.vue') },
      { path: 'category/edit/:id', name: 'admin.category.edit', component: () => import('@/views/admin/category/EditCategory.vue') },

      { path: 'species', name: 'admin.species', component: () => import('@/views/admin/species/ListSpecies.vue') },
      { path: 'species/create', name: 'admin.species.create', component: () => import('@/views/admin/species/CreateSpecies.vue') },
      { path: 'species/edit/:id', name: 'admin.species.edit', component: () => import('@/views/admin/species/EditSpecies.vue') },

      { path: 'trademark', name: 'admin.trademark', component: () => import('@/views/admin/trademark/ListTrademark.vue') },
      { path: 'trademark/create', name: 'admin.trademark.create', component: () => import('@/views/admin/trademark/CreateTrademark.vue') },
      { path: 'trademark/edit/:id', name: 'admin.trademark.edit', component: () => import('@/views/admin/trademark/EditTrademark.vue') },

      { path: 'order/', name: 'admin.order', component: () => import('@/layout/admin/OrderAdmin.vue'),
     
        children: [
          { path: '', name: 'admin.order', component: () => import('@/views/admin/order/ListOrderAdmin.vue')},
          { path: 'wait-goods', name: 'admin.order.wait-goods', component: () => import('@/views/admin/order/ListOrderComfirmedAdmin.vue') },
          { path: 'delivering', name: 'admin.order.delivering', component: () => import('@/views/admin/order/ListOrderDeliveringAdmin.vue') },
          { path: 'cancelled', name: 'admin.order.cancelled', component: () => import('@/views/admin/order/ListOrderCancelledAdmin.vue') },
          { path: 'delivered', name: 'admin.order.delivered', component: () => import('@/views/admin/order/ListOrderDeliveredAdmin.vue') },
        ]
      },




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
  if ((to.path.includes('/user') || to.path.includes('/seller') || to.path.includes('/admin')) && (store.state.AUTH.state.isActive === false)) {
    next({ path: '/login' })
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if ((to.path.includes('/admin/login')) && (store.state.ADAU.state.isActive === true)) {
    next({ path: '/admin' })
  } else {
    next()
  }
})

export default router
