<script>
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'company-register',
  data() {
    return {
      companyName: '',
      email: '',
      password: '',

      backendError: null,
    }
  },
  methods: {
    ...mapActions(['companyRegister']),
    async submitLogin(e) {
      e.preventDefault()

      try {
        await this.companyRegister({
          companyName: this.companyName,
          email: this.email,
          password: this.password,
        })

        this.$router.push('/company-page')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
.register
    form( @submit="submitLogin")
      h1 Create a new COMPANY account
      label(for="companyName") Name:&nbsp;
        input(v-model="companyName" id="name" type="text" placeholder="Your name" required)
      label(for="email") Email:&nbsp;
        input(v-model="email" id="email" type="email" placeholder="Your email" required)
      label(for="password") Password:&nbsp;
        input(v-model="password" id="password" type="password" placeholder="Your password" required)
      input(type="submit" value="Register")
    div(v-if="backendError") {{ backendError }}
    div Already have an account? <router-link to="/company-login">Log in</router-link>
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
</style>
