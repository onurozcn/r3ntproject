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
        router-link(v-if="user" to="/profile") Profile
        router-link(v-if="!user" to="/login") Login
        router-link(v-if="!user" to="/register") Register
        router-link(v-if="user.isCompany" to="/product") Add Product
        a(v-if="user" @click="doLogout" href="#") Logout
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
