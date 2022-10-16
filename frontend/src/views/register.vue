<script>
import { mapActions } from 'vuex'

export default {
  name: 'register',
  data() {
    return {
      name: '',
      age: null,
      email: '',
      password: '',
      isCompany: false,

      backendError: null,
    }
  },
  methods: {
    ...mapActions(['register']),
    async submitLogin(e) {
      e.preventDefault()

      try {
        await this.register({
          name: this.name,
          age: this.age,
          email: this.email,
          password: this.password,
          isCompany: this.isCompany,
        })

        this.$router.push('/login')
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
          h5.card-title.text-center.mb-5.fw-light.fs-5 Register &nbsp;
              form( @submit="submitLogin")
                .form-floating.mb-3
                  label Register as a Company   
                    input(type="checkbox" v-on:click ="isCompany=false")
                .form-floating.mb-3
                  label(for='isCompany') Register as a User   
                    input(type="checkbox" v-on:click ="isCompany=true")
                .form-floating.mb-3
                  input.form-control(v-model="name" type="text" placeholder="Your name" required)
                  label(for='name') Your Name 
                .form-floating.mb-3
                  input.form-control(v-model="email" type="email" placeholder="Your email" required)
                  label(for='email') Your Email
                .form-floating.mb-3
                  input.form-control(v-model="password" type="password" placeholder="Your password" required)
                  label(for='password') Password
                .form-floating.mb-3
                  label(for='isCompany') 
                  | Register as a company   
                  input(type="checkbox" v-on:click ="isCompany=true")
                .d-grid
                  button.btn.btn-primary.btn-login.text-uppercase.fw-bold(type='submit') 
                    | Register
              div(v-if="backendError") {{ backendError }}
              div You have an account? <router-link to="/login">Login</router-link>
      
</template>

<style lang="scss" scoped>

</style>
