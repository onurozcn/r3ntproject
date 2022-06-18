<script>
// import OrderCard from '@/components/order-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'user-orders',
  data() {
    return {
      orders: [],
      user: [],
      invoices: [],
    }
  },
  async created() {
    this.user = await this.fetchSession()
    this.orders = await this.fetchUserOrders(this.user._id)
    this.invoices = await this.fetchUserInvoices(this.user._id)
  },
  methods: {
    ...mapActions(['fetchSession', 'fetchUserOrders', 'fetchUserInvoices']),
  },
}
</script>

<template lang="pug">
div
  div ORDERS
    div {{orders}}  
  div INVOICES
    div {{invoices}}
    
</template>
