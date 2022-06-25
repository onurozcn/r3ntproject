import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import io from 'socket.io-client'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = true

Vue.use(Vuex)

const socket = io(process.env.VUE_APP_BASE_URL)

const mutations = {
  INCREMENT_COUNT: 'increment count',
  SET_USER: 'set user',
  SET_COMPANY: 'set company',
  SET_PRODUCT: 'set product',
  SET_LIVE_STREAM: 'set live stream',
  ADD_LIVE_STREAM: 'add live stream',
  ADD_MESSAGE_TO_LIVE_STREAM: 'add message to live stream',
}

const store = new Vuex.Store({
  state: {
    count: 0,
    user: null,
    products: null,
    currentLiveStream: null,
    liveStreams: [],
    liveStreamMessages: [],
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    [mutations.SET_USER](state, user) {
      state.user = user
    },
    [mutations.SET_PRODUCT](state, products) {
      state.products = products
    },
    [mutations.SET_LIVE_STREAM](state, live) {
      state.currentLiveStream = live
    },
    [mutations.ADD_LIVE_STREAM](state, stream) {
      state.liveStreams.push(stream)
    },
    [mutations.ADD_MESSAGE_TO_LIVE_STREAM](state, message) {
      state.liveStreamMessages.push(message)
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT)
    },
    // USER
    async fetchUser(store, id) {
      const userRequest = await axios.get(`/api/users/${id}/json`)
      return userRequest.data
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/users')
      return usersRequest.data
    },
    async fetchUserOrders(store, id) {
      const userOrders = await axios.get(`/api/orders/user/${id}`)
      return userOrders.data
    },

    // INVOICE
    async createInvoice(store, userId, productName, productPrice) {
      await axios.post('/api/invoices', userId, productName, productPrice)
    },
    async fetchUserInvoices(store, id) {
      const userInvoices = await axios.get(`/api/invoices/user/${id}`)
      return userInvoices.data
    },
    async fetchInvoice(store, id) {
      const invoice = await axios.get(`/api/invoices/user-invoice/${id}`)
      return invoice.data
    },

    // REVIEW

    async fetchUserReviews(store, id) {
      const userRevs = await axios.get(`/api/reviews/user/${id}`)
      return userRevs.data
    },
    async fetchProductReview(store, id) {
      const productRevs = await axios.get(`/api/reviews/product/${id}`)
      return productRevs.data
    },
    async fetchReviews() {
      await axios.get(`/api/reviews`)
    },
    async addReview(store, product, user, review) {
      axios.post('/api/reviews', product, user, review)
    },
    async deleteAllReviews() {
      await axios.delete('/api/reviews')
    },
    async deleteReview(store, id) {
      await axios.delete(`/api/reviews/${id}`)
    },
    // PRODUCT
    //   ?????????????????????????????
    async filterProducts(store, fPrice) {
      const filteredProduct = await axios.get('/api/products/filter', fPrice)
      return filteredProduct.data
    // -----------------------------
      
    },
    async fetchCompanyProducts(store, id) {
      const companyProducts = await axios.get(`/api/products/company/${id}`)
      return companyProducts.data
    },
    async fetchProducts({commit}) {
      const productsRequest = await axios.get('/api/products')
      commit(mutations.SET_PRODUCT, productsRequest.data)
      return productsRequest.data
    },
    async fetchProduct(store, id) {
      const productRequest = await axios.get(`/api/products/${id}`)
      return productRequest.data
    },
    async addProduct(store, product) {
      await axios.post('/api/products', product)
    },
    async editProduct(store, product) {
      await axios.patch(`/api/products/update/${product.id}`, product)
    },
    async deleteProduct(store, id) {
      return await axios.delete(`/api/products/${id}`)
    },

    async fetchSession({ commit }) {
      const user = await axios.get('/api/account/session')
      commit(mutations.SET_USER, user.data || null)
      return user.data
    },
    async login({ commit }, credentials) {
      // eslint-disable-next-line no-useless-catch
      try {
        const user = await axios.post('/api/account/session', credentials)
        commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },
    async register(store, user) {
      return axios.post('/api/account', user)
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session')
      commit(mutations.SET_USER, null)
    },
    async goLive({ state, commit }) {
      socket.emit('go live', state.user._id, () => {
        commit(mutations.SET_LIVE_STREAM, state.user._id)
      })
    },
    async addLiveStream({ commit }, stream) {
      commit(mutations.ADD_LIVE_STREAM, stream)
    },
    async sendMessageToLiveStream({ state, commit }, body) {
      const message = {
        body,
        author: state.user.name,
      }
      commit(mutations.ADD_MESSAGE_TO_LIVE_STREAM, message)
      socket.emit('new message', state.currentLiveStream, message)
    },
    async joinStream({ commit }, stream) {
      socket.emit('join stream', stream)
      commit(mutations.SET_LIVE_STREAM, stream)
    },
  },
  modules: {},
})

socket.on('new live stream', user => {
  store.dispatch('addLiveStream', user)
})

socket.on('new live stream message', message => {
  store.commit(mutations.ADD_MESSAGE_TO_LIVE_STREAM, message)
})

export default async function init() {
  await store.dispatch('fetchSession')
  await store.dispatch('fetchProducts')
  return store
}
