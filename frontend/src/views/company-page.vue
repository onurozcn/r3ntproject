<script>
import { mapActions } from 'vuex'

export default {
  name: 'company-page',
  methods: {
    ...mapActions(['companyLogout']),
    async doLogout() {
      await this.companyLogout()
      this.$router.push('/company-login')
    },
  },
}
</script>

<template lang="pug">
   #app
     #nav
       router-link(to="/product") Add Product
       a(@click="doLogout" href="#") Logout
     router-view
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
</style>
