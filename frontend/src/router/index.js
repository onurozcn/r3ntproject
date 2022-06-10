import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/profile.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Product from '../views/product.vue'
import CompanyLogin from '../views/company-login'
import CompanyPage from '../views/company-page'
import CompanyRegister from '../views/company-register'

Vue.use(VueRouter)

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'Homepage',
        component: Profile,
      },
      {
        path: '/users/:id',
        name: 'UserDetail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/user-detail.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile')
          return next()
        },
      },
      {
        path: '/company-register',
        name: 'company-register',
        component: CompanyRegister,
        beforeEnter(to, from, next) {
          if (store.state.company) return next('/company-page')
          return next()
        },
      },
      {
        path: '/product',
        name: 'addProduct',
        component: Product,
        beforeEnter(to, from, next) {
          if (store.state.product) return next('/product')
          return next()
        },
      },
      {
        path: '/products/:id',
        name: 'ProductDetail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/product-detail.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile')
          return next()
        },
      },
      {
        path: '/company-login',
        name: 'company-login',
        component: CompanyLogin,
        beforeEnter(to, from, next) {
          if (store.state.company) return next('/company-page')
          return next()
        },
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/login')
          return next()
        },
      },
      {
        path: '/company-page',
        name: 'company-page',
        component: CompanyPage,
        beforeEnter(to, from, next) {
          if (!store.state.company) return next('/company-login')
          return next()
        },
      },
    ],
  })
}
