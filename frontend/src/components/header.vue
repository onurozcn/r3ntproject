 <script>
 import { mapActions } from 'vuex'
export default {
  name: 'HeaderComponent',
    methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
}
</script>
<template lang="pug">
    
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
</template>