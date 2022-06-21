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
    }
  },
  async created() {
    this.user = await this.fetchSession()
    this.orders = await this.fetchUserOrders(this.user._id)
    this.invoices = await this.fetchUserInvoices(this.user._id)
  },
  methods: {
    ...mapActions(['fetchSession', 'fetchUserOrders', 'fetchUserInvoices']),
    showInvoice() {
      this.sInvoice = !this.sInvoice
    },
  },
}
</script>

<template lang="pug">
div
  //- h3 ORDERS
  //-   div {{orders}}  
  //- h3 INVOICES
  //-   div {{invoices}}


  .container
     .row
      .col(v-for="order in orders")
        h3 {{ order.product.name }}
        //- button(@click="showInvoice") Show Invoice
        router-link(:to="`/order/invoice/${order.invoice._id}`") Invoice
        //- h3(v-if="sInvoice") {{order.invoice}}
        button Leave A Review
        //- h5 Product Price: 
        //-   p {{ product.price }} €
        //- router-link(:to="`/edit-products/${product._id}`") Edit Product
        //- //- button.btn.btn-primary(href=`/edit-products/${product._id}`) Edit Product
        //- button.btn.btn-primary(@click='deleteProd(product._id)') Delete Product
    
</template>
