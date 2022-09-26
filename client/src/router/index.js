import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '@/layout/Admin.vue'
import Client from '@/layout/Client.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/admin/login', name: 'admin.login', component: () => import('@/views/admin/LoginAdmin.vue') },

  {
    path: '/', name: 'client', component: Client, children: [
      {  path: '/', name: 'home.index', component: () => import('@/components/client/IndexClient.vue') },
      {  path: 'products', name: 'home.products', component: () => import('@/views/client/products/ListProducts.vue') },

    ],
  },


  {
    path: '/admin/', name: 'admin', component: Admin, children: [
      { path: '', name: 'admin.home', component: () => import('@/components/product/ListProduct.vue') },
      {
        path: 'management/', name: 'admin.management', component: () => import('@/components/admin/TabMenu.vue'),
        children: [
          { path: 'login', name: 'admin.management.login', component: () => import('@/components/admin/LoginAdmin.vue') },
          { path: 'users', name: 'admin.management.users', component: () => import('@/components/admin/users/ListUser.vue') },
          { path: 'users/create', name: 'admin.management.users.create', component: () => import('@/components/admin/users/CreateUser.vue') },
          { path: 'users/edit/:id', name: 'admin.management.users.edit', component: () => import('@/components/admin/users/CreateUser.vue') },
          { path: 'products', name: 'admin.management.products', component: () => import('@/components/product/ListProduct.vue') },
          { path: 'products', name: 'admin.products', component: () => import('@/components/product/ListProduct.vue') },
          { path: 'products/create', name: 'admin.management.products.create', component: () => import('@/components/product/AddProduct.vue') },
          { path: 'products/edit/:id', name: 'admin.management.products.edit', component: () => import('@/components/product/AddProduct.vue') },
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

export default router
