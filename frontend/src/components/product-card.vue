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
        alert('Congrats!! Rent operation successful!!')
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
.card-container
  .row
    .col-5
      img(src='https://th.bing.com/th/id/R.481249181a9952b4f26e84ac8ca731d5?rik=LADSC%2buUfrk8bQ&riu=http%3a%2f%2feskipaper.com%2fimages%2fbatmobile-1.jpg&ehk=PVKsAAGBELoHEOa4190yuzhh02F%2fMXEvg6pG%2bV1GS18%3d&risl=&pid=ImgRaw&r=0' width='100%' height='100%')
    .col-7
      h3 {{ product.name }}
      h5 Product Price: {{ product.price }} €
      h5 Gear Type: {{ product.gear }}
      h5 Fuel Type: {{ product.fuel }}
      h5 Pick-up Point: {{ product.pickUpPoint }}
      h5 Seats: {{ product.seat}}
      button.btn.btn-primary(@click="rent(product)") Rent
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
