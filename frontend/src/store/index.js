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
    product: null,
    currentLiveStream: null,
    liveStreams: [],
    liveStreamMessages: [],
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    [mutations.SET_USER](state, user) {
      // console.log("USERRRRRR : " + user)
      state.user = user
    },
    [mutations.SET_PRODUCT](state, product) {
      state.product = product
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
    async filterProducts(store, fPrice) {
      const filteredProduct = await axios.get('/api/products/filter', fPrice)
      return filteredProduct.data
    },
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
    async fetchUserInvoices(store, id) {
      const userInvoices = await axios.get(`/api/invoices/user/${id}`)
      return userInvoices.data
    },
    async fetchCompanyProducts(store, id) {
      console.log('FETCH COMPANY PRODUCT PASSING A USER ID : ' + id)
      const companyProducts = await axios.get(`/api/products/company/${id}`)
      return companyProducts.data
    },
    async fetchInvoice(store, id) {
      const invoice = await axios.get(`/api/invoices/user-invoice/${id}`)
      return invoice.data
    },
    async fetchProducts() {
      const productsRequest = await axios.get('/api/products')
      return productsRequest.data
    },
    async fetchProduct(store, id) {
      const productRequest = await axios.get(`/api/products/${id}`)
      console.log(productRequest)
      return productRequest.data
    },
    // ---------------------------------------
    async editProduct(store, product) {
      console.log('PRODUCT CHANGES : ' + product + ' PRODUCT ID  : ' + product.id)
      await axios.patch(`/api/products/update/${product.id}`, product)
    },
    async deleteProduct(store, id) {
      return await axios.delete(`/api/products/${id}`)
    },
    async fetchSession({ commit }) {
      const user = await axios.get('/api/account/session')
      // console.log(user.data._id)
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
    async addProduct(store, product) {
      await axios.post('/api/products', product)
    },
    async createInvoice(store, userId, productName, productPrice) {
      await axios.post('/api/invoices', userId, productName, productPrice)
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
  return store
}
