<script>
import { mapState } from 'vuex'
import FooterComponent from './components/footer.vue'
import HeaderComponent from './components/header.vue'

export default {
  name: 'App',
  components: {FooterComponent, HeaderComponent},
  computed: {
    ...mapState(['user', 'products']),
  },
}
</script>

<template lang="pug">
  #app
    #nav
      HeaderComponent
    router-view
    FooterComponent
  
 </template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #01070d;
  background-color: #e6eaee;
  max-width: 100%;
  min-width: 300px;
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
</style>
