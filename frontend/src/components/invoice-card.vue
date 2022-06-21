<script>
import { mapActions } from 'vuex'
export default {
  name: 'InvoiceCard',
  data() {
    return {
      invoice: null,
    }
  },
  async created() {
    this.invoice = await this.fetchInvoice(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchInvoice']),
  },
  // prod.amount = prod.amount - 1
  // console.log(prod.amount)
  // edit product amount axios call
  // create invoice axios call
  // add to orders product, user and invoice
}
</script>
<template lang="pug">
.card-container
  .row
    .col-7
      h3 {{ invoice }}
    //-   h5 Product Price: {{ product.price }} €
    //-   h5 Gear Type: {{ product.gear }}
    //-   h5 Fuel Type: {{ product.fuel }}
    //-   h5 Pick-up Point: {{ product.pickUpPoint }}
    //-   h5 Seats: {{ product.seat}}
     
//- .box
//-     h2 {{product.name}} {{product.price}}
//-     button(@click="rent(product)") RENT
   
</template>

<style lang="scss" scoped>
// .box {
//   padding: 2rem;
//   border: 1px solid black;
//   border-radius: 0.3rem;
// }
.card-container {
  border: 1px solid #d0d0d0;
  padding: 12px;
  margin-bottom: 24px;
  border-radius: 8px;
}
</style>
