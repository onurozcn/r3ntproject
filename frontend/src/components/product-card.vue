<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProductCard',
  props: ['product'],
  async created() {
    this.user = await this.fetchSession()
  },
  methods: {
    ...mapActions(['createInvoice', 'fetchSession']),
    async rent(prod) {
      try {
        await this.createInvoice({
          user: this.user._id,
          product: prod,
        })
        this.$router.push('/').catch(() => {})
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
    // prod.amount = prod.amount - 1
    // console.log(prod.amount)
    // edit product amount axios call
    // create invoice axios call
    // add to orders product, user and invoice
  },
}
</script>
<template lang="pug">
.box
    h2 {{product.name}} {{product.price}}
    button(@click="rent(product)") RENT
   
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid black;
  border-radius: 0.3rem;
}
</style>
