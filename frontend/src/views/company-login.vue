<script>
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'company-login',
  data() {
    return {
      email: '',
      password: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['companyLogin']),
    async submitCompanyLogin(e) {
      e.preventDefault()

      try {
        await this.companyLogin({
          email: this.email,
          password: this.password,
        })

        this.$router.push('/comapny-page')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
.login
    form(@submit="submitComapnyLogin")
      h1 Log in to comapny account
      label(for="email") Email:&nbsp;
        input(v-model="email" id="email" type="email" placeholder="Your email" required)
      label(for="password") Password:&nbsp;
        input(v-model="password" id="password" type="password" placeholder="Your password" required)
      input(type="submit" value="Log in")
    div(v-if="backendError") {{ backendError }}
    div Don't have an account yet? <router-link to="/company-register">Register</router-link>
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
</style>
