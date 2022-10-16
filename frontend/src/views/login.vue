<script>
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitLogin(e) {
      e.preventDefault()

      try {
        await this.login({
          email: this.email,
          password: this.password,
        })

        this.$router.push('/')
        // location.reload()
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">

.container
  .row
    .col-sm-9.col-md-7.col-lg-5.mx-auto
      .card.border-0.shadow.rounded-3.my-5
        .card-body.p-4.p-sm-5
          h5.card-title.text-center.mb-5.fw-light.fs-5 Sign In
          form(@submit="submitLogin")
            .form-floating.mb-3
              input.form-control(v-model="email" type='email' placeholder='name@example.com' required)
              label(for='email') Email address
            .form-floating.mb-3
              input.form-control(v-model="password" type='password' placeholder='Password' required)
              label(for='password') Password
            .d-grid
              button.btn.btn-primary.btn-login.text-uppercase.fw-bold(type='submit')
                | Sign
                | in
          div(v-if="backendError") {{ backendError }}
          div Don't have an account yet? <router-link to="/register">Register</router-link>

</template>

<style lang="scss" scoped>
.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}
</style>
