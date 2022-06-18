<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      user: [],
    }
  },
  async created() {
    this.user = await this.fetchSession()
  },
  methods: {
    ...mapActions(['logout', 'fetchSession']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<template lang="pug">
  #app
    #nav
      nav#sticky-nav.navbar.navbar-expand-lg.bg-light
        .container-fluid
          a.navbar-brand(href='#') R3NTALS
          button.navbar-toggler(type='button', data-bs-toggle='collapse', data-bs-target='#navbarNav', aria-controls='navbarNav', aria-expanded='false', aria-label='Toggle navigation')
            span.navbar-toggler-icon
          #navbarNav.collapse.navbar-collapse
            ul.navbar-nav.justify-content-end
              li.nav-item
                router-link.nav-link(v-if="user" to="/profile") Profile
              li.nav-item
                router-link.nav-link(v-if="user" to="/order") Orders&Invoices
              li.nav-item
                router-link.nav-link(v-if="!user" to="/login") Login
              li.nav-item
                router-link.nav-link(v-if="!user" to="/register") Register
              li.nav-item
                router-link.nav-link(v-if="user.isCompany" to="/product") Add Product
              li.nav-item
                a.nav-link(v-if="user" @click="doLogout" href="#") Logout
                
    ul#footer.nav.fixed-bottom.justify-content-center
      li.nav-item
        a.nav-link(aria-current='page', href='#') Privacy Policy
      li.nav-item
        a.nav-link(href='#') About Us
      li.nav-item
        a.nav-link(href='#') Terms of Use
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
  padding: 3px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#footer {
  background: white;
}
</style>
