<script>
// import InvoiceCard from '@/components/invoice-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'user-orders',
  data() {
    return {
      orders: [],
      user: [],
      invoices: [],
      sInvoice: false,
      review: '',
    }
  },
  async created() {
    this.user = await this.fetchSession()
    this.orders = await this.fetchUserOrders(this.user._id)
    this.invoices = await this.fetchUserInvoices(this.user._id)
  },
  methods: {
    ...mapActions(['addReview', 'fetchSession', 'fetchUserOrders', 'fetchUserInvoices']),
   
   async submitReview(prod) {
      
        await this.addReview({
          user: this.user,
          product: this.prod,
          review: this.review,
        })
        this.$router.push('/order').catch(() => {})
    
  },
},
}
</script>

<template lang="pug">
  .container
    .row
      .col(v-for="order in orders")
        h3 {{ order.product.name }}
        router-link(:to="`/order/invoice/${order.invoice._id}`") Invoice
        form
          textarea(v-model="review" name="review" placeholder="Enter your review")
          button.button(@click="submitReview(order.product)" value="Submit Review") Submit Review
</template>
