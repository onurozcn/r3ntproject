<script>
import { mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'home-page',
  components: {
    Datepicker,
  },
  data() {
    return {
      prods: [],
    }
  },
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
    async fetchAvailableProducts() {
      this.prods = await this.fetchProducts()
    },
  },
}
</script>

<template lang="pug">
  #app
    #nav
      // if logged in show
      // user info details, implement edit functionality 
      router-link(to="/personel-info") Personal Info
      // if logged in dont display
      router-link(to="/login") Login
      // if logged in dont display
      router-link(to="/register") Register
      //if not logged in dont show
      a(@click="doLogout" href="#") Logout
    router-view
    .center
      .datePicker
        h1 Select a date
        Datepicker(:v-model="date") Start Date 
        Datepicker(:v-model="date") End Date
        button(@click="fetchAvailableProducts") Search Available Vehicles
    
    div(v-for="product in prods")
      router-link(:to="`/products/${product._id}`") {{ product.name }}



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
