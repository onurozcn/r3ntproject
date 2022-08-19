import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/homepage.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import AddProduct from '../views/add-product.vue'
import CompanyProducts from '../views/company-products.vue'
// import ShowProducts from '../components/all-products'
// import EditProduct from '../views/edit-product.vue'
// import HomePage from '../views/home-page.vue'

Vue.use(VueRouter)

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'Homepage',
        component: Homepage,
      },
      {
        path: '/users/:id',
        name: 'UserDetail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/user-detail.vue'),
      },
      {
        path: '/order',
        name: 'UserOrders',
        component: () => import( '../views/order.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/homepage')
          return next()
        },
      },
      {
        path: '/add-product',
        name: 'addProduct',
        component: AddProduct,
        beforeEnter(to, from, next) {
          if (store.state.product) return next('/')
          return next()
        },
      },
      // {
      //   path: '/all-products',
      //   name: 'showProducts',
      //   component: ShowProducts,
      // },
      {
        path: '/edit-products/:id',
        name: 'EditProduct',
        component: () => import('../views/edit-product.vue'),
      },
      {
        path: '/company-products/',
        name: 'companyProducts',
        component: CompanyProducts,
        beforeEnter(to, from, next) {
          if (store.state.product) return next('/')
          return next()
        },
      },
      {
        path: '/products/:id',
        name: 'ProductDetail',
        component: () => import('../views/product-detail.vue'),
      },
      {
        path: '/order/invoice/:id',
        name: 'Invoice',
        component: () => import('../components/invoice-card.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/homepage')
          return next()
        },
      },
      {
        path: '/homepage',
        name: 'homepage',
        component: Homepage,
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/login')
          return next()
        },
      },
    ],
  })
}
