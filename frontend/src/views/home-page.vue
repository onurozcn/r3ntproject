<script>
import { mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import ProductDetail from '@/components/product-card.vue'

export default {
  name: 'home-page',
  components: {
    Datepicker,
    ProductDetail,
  },
  data() {
    return {
      product: [],
      show: false,
    }
  },
  methods: {
    ...mapActions(['logout', 'fetchProducts']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
    async fetchAvailableProducts() {
      this.product = await this.fetchProducts()
      this.show = !this.show
    },
  },
}
</script>

<template lang="pug">
  #app
    .center
      .datePicker
        h1 Select a date
        .container
         .row
          .col
            Datepicker() Start Date 
          .col
            Datepicker() End Date
          .col
            button(@click="fetchAvailableProducts") Search Available Vehicles
    //- div(v-if="prods" v-for="product in prods")
    //-   router-link(:to="`/products/${product._id}`") {{ product.name }}
    ProductDetail

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.center {
  width: 50%;
  margin: 0 auto;
}
</style>
