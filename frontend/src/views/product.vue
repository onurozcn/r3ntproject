<script>
// @ is an alias to /src
/* eslint-disable */
import axios from 'axios'
import ProductCard from '@/components/product-card.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Product',
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const productsRequest = await axios.get('/api/products')
    this.products = productsRequest.data
  },
}
</script>

<template lang="pug">
  .home
    h1 Rent Project 
    h2 PRODUCTS
    product-card(v-for="product in products" :product="product")
</template>
