<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProductCard',
  props: ['product'],
 
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['createInvoice','deleteReview']),
    async rent(prod) {
      if(!this.user){
        alert("You need to Log-In to rent this car!")
        this.$router.push('/login')
      }
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
    async deleteRev(rev) {
      this. product.revs = this.product.revs.filter(review => review._id !== rev._id)
      await this.deleteReview(rev._id)
      alert("Your review has been deleted")
    },
    
  },
}
</script>
<template lang="pug">
.container
  .card-container
    .row
      .col-5
        img(:src="`${product.photo}`" width='100%' height='100%')
      .col-7
        h3 {{ product.name }}
        h5 Product Price: {{ product.price }} €
        h5 Gear Type: {{ product.gear }}
        h5 Fuel Type: {{ product.fuel }}
        h5 Pick-up Point: {{ product.pickUpPoint }}
        button.btn.btn-primary(v-if="!user.isCompany" @click="rent(product)") Rent
  .row.reviews Reviews
    .col
      #product-reviews(v-for="review in product.revs")
        h6 User name :  {{review.user.name}}
        h6 Review : {{review.review}}
        button.btn.btn-primary(v-if="review.user.email === user.email" @click="deleteRev(review)")  Delete review
   
</template>

<style lang="scss" scoped>

.card-container {
  border: 1px solid #aea7a7;
  box-shadow:5px 5px 5px 5px rgba(0,0,0,0.2);
  padding: 12px;
  margin-bottom: 24px;
  border-radius: 8px;
  text-align: center;
  background-color: #dfe8f1
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
