<script>
import ProductCard from '@/components/product-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'ProductDetail',
  components: { ProductCard },
  data() {
    return {
      product: null,
    }
  },
  async created() {
    this.product = await this.fetchProduct(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchProduct']),
  },
}
</script>

<template lang="pug">
  .about
    ProductCard(:product="product" v-if="product")
    
</template>
