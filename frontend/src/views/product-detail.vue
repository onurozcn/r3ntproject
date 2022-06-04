<script>
import Counter from '@/components/counter.vue'
import ProductCard from '@/components/product-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'ProductDetail',
  components: { ProductCard, Counter },
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
    h1 This is a Product detail
    ProductCard(:product="product" v-if="product")
    Counter
</template>
