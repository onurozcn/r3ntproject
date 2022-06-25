<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ProductCard',
  props: ['product'],
  // data(){
  //   return{
  //   reviews: [],
  //   }
  // },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['createInvoice']),
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
  },
}
</script>
<template lang="pug">
.container
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
  .row.reviews Reviews
    .col
      #product-reviews(v-for="reviews in product.revs")
        h6 User name :  {{reviews.user.name}}
        h6 Review : {{reviews.review}}
   
</template>

<style lang="scss" scoped>

.card-container {
  border: 1px solid #aea7a7;
  box-shadow:5px 5px 5px 5px rgba(0,0,0,0.2);
  padding: 12px;
  margin-bottom: 24px;
  border-radius: 8px;
  text-align: center;
}
.reviews{
  display: block;
  text-align: center;
  // margin: 12px;
  color: red;
}
#product-reviews{
  color: black;
  text-align: left;
  margin: 10px 10px;
  padding: 5px 5px;
  border: 1px solid;
  border-color: black;
}
</style>
