<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapState(['user', 'products']),
  },
}
</script>

<template lang="pug">
  #app
    #nav
      nav#sticky-nav.navbar.navbar-expand-lg.bg-light
        .container-fluid
          a.navbar-brand(href='/') R3NTALS
          button.navbar-toggler(type='button', data-bs-toggle='collapse', data-bs-target='#navbarNav', aria-controls='navbarNav', aria-expanded='false', aria-label='Toggle navigation')
            span.navbar-toggler-icon
          #navbarNav.collapse.navbar-collapse
            ul.navbar-nav.justify-content-end
              li.nav-item
                router-link.nav-link(v-if="user && !user.isCompany" to="/order") Orders&Invoices
              li.nav-item
                router-link.nav-link(v-if="!user" to="/login") Login
              li.nav-item
                router-link.nav-link(v-if="!user" to="/register") Register
              li.nav-item
                router-link.nav-link(v-if="user && user.isCompany" to="/company-products") Products
              li.nav-item
                router-link.nav-link(v-if="user && user.isCompany" to="/add-product") Add Product
              li.nav-item
                a.nav-link(v-if="user" @click="doLogout" href="#") Logout
    

    //- ul#footer.nav.fixed-bottom.justify-content-center
    //-   li.nav-item
    //-     a.nav-link(aria-current='page', href='#') Privacy Policy
    //-   li.nav-item
    //-     a.nav-link(href='#') About Us
    //-   li.nav-item
    //-     a.nav-link(href='#') Terms of Use
    router-view
  
 </template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #01070d;
  background-color: #e6eaee;
  max-width: 100%;
  overflow-x: hidden;
}

#nav {
  padding: 3px;
   background-color: #eff3f6;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem;
    

    &.router-link-exact-active {
      color: blue;
    }
  }
}
#footer {
  background-color: #eff3f6;
  

}
</style>
