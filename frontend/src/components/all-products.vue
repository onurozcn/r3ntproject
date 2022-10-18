<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'all-products',
  data() {
    return {
      price: null,
      fuel: '',
      gear: '',
    }
  },
  methods: {
    ...mapActions(['createInvoice', 'filterProducts']),
    ...mapMutations(['setFilteredProducts']),
    async rent(prod) {
      if (!this.user) {
        alert('You need to Log-In to rent this car!')
        this.$router.push('/login')
      }
      try {
        await this.createInvoice({
          user: this.user._id,
          product: prod,
        })
        alert('Congrats!! Rent operation successful!!')
        this.$router.push('/order').catch(() => {})
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
    async searchFilter() {
      const filteredProducts = await this.filterProducts({
        price: this.price,
        fuel: this.fuel,
        gear: this.gear,
      })
      this.setFilteredProducts(filteredProducts)
      this.$refs.anyName.reset()
    },
  },
  computed: {
    ...mapState(['user', 'products']),
  },
}
</script>

<template lang="pug">
  .row
    .col-2
      form(@submit.prevent="searchFilter")           
        .form-group.mt-1
          label(for="price") Price up to
          input.form-control(v-model="price" id="priceRange" type="number" min=0 step=1 placeholder="Max Price")
        .form-group.mt-1
          label(for="fuel") Fuel Type
          select.form-control(v-model="fuel" id="fuel" name="fuel")
              option(value="" selected) Select
              option(value="Diesel" ) Diesel
              option(value="Gasoline" ) Gas
              option(value="Electric" ) Electric
              option(value="Hybrid" ) Hybrid
        .form-group.mt-1
          label(for="gear") Gear Type
          select.form-control(v-model="gear" id="gear" name="gear")
            option(value="" selected) Select
            option(value="Automatic") Auto
            option(value="Manuel") Manuel
        button.btn.btn-primary.mt-2(type='submit') Search
    .col-10
      .row     
        .card(v-for="pr in this.products" v-if="pr.amount>0" style='width: 15rem; margin: 0.2em')
          .col 
            img.card-img-top.pt-1(:src="`${pr.photo}`" :alt="`${pr.name}`")
          .col
            .card-body
              router-link(:to="`/products/${pr._id}`")
                h6.card-title {{ pr.name }}
              h6.card-text Price : {{ pr.price }} € 
              h6.card-text Gear  : {{ pr.gear }} 
              h6.card-text Fuel  : {{ pr.fuel }} 
              button.btn.btn-primary(v-if="!user.isCompany" @click="rent(pr)") Rent Now
</template>
<style scoped>
.card {
  background-color: #dfe8f1;
}
</style>
