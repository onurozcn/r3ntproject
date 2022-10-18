<script>
import { mapActions } from 'vuex'
export default {
  name: 'InvoiceCard',
  data() {
    return {
      invoice: {},
    }
  },
  async created() {
    this.invoice = await this.fetchInvoice(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchInvoice']),
  },
}
</script>
<template lang="pug">
.card
  .card-body.mx-4
    .container
      p.my-5.mx-5(style='font-size: 30px;') Thank for your purchase
      .row
        ul.list-unstyled
          li.text-black To : {{invoice.user.name}}
          li.text-muted.mt-1
            span.text-black Invoice-ID : 
            |  {{invoice._id}}
          //- li.text-black.mt-1 September 17 2022  ======= EXPECTING A DATE
        hr
        .col-xl-10
          p {{invoice.productName}}
        .col-xl-2
          p.float-end
            | €{{ invoice.productPrice }}
        hr
      .row
        .col-xl-10
          p Taxes(%10)
        .col-xl-2
          p.float-end
            | €{{Math.floor(invoice.productPrice / 10)}}
        hr
      .row
        .col-xl-10
          p Service Fees(%5)
        .col-xl-2
          p.float-end
            | €{{Math.floor(invoice.productPrice / 20)}}
        hr(style='border: 2px solid black;')
      .row.text-black
        .col-xl-12
          p.float-end.fw-bold
            | Total: €{{invoice.productPrice + Math.floor(invoice.productPrice/10) + Math.floor(invoice.productPrice/20)}}
        hr(style='border: 2px solid black;')        
        
</template>

<style lang="scss" scoped>

.card-container {
  border: 1px solid #d0d0d0;
  padding: 12px;
  margin-bottom: 24px;
  border-radius: 8px;
}
</style>
