<script>
import { mapActions, mapState } from 'vuex'
import SearchFilterComponent from './search-filter.vue'

export default {
  name: 'all-products',
  components: {SearchFilterComponent},
  methods: {
    ...mapActions(['createInvoice']),
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
  },
  computed: {
    ...mapState(['user', 'products']),
  },
}
</script>

<template lang="pug">
  .row
    SearchFilterComponent
    .row
      .card.col-12.col-sm-6.col-md-4.col-lg-3.mt-2(v-for="pr in this.products" v-if="pr.amount>0")
        .col 
          img.card-img-top.pt-1(:src="`${pr.photo}`" :alt="`${pr.name}`")
        .col
          .card-body
            router-link(:to="`/products/${pr._id}`")
              h6.card-title {{ pr.name }}
            h6.card-text Price : {{ pr.price }} € 
            h6.card-text Gear  : {{ pr.gear }} 
            h6.card-text Fuel  : {{ pr.fuel }} 
            button.btn.btn-primary(v-if="user && !user.isCompany" @click="rent(pr)") Rent Now
</template>
<style scoped>
.card {
  background-color: #dfe8f1;
}
.search-bar-button{
  max-width: 200px;
  padding: 10px;
}
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
label{
  text-align: center;
  padding-left: 10px;
}

</style>
