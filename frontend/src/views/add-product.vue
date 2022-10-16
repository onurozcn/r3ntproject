<script>
import { mapActions } from 'vuex'

export default {
  name: 'add-product',
  data() {
    return {
      name: '',
      gear: '',
      fuel: '',
      amount: 0,
      price: 0.0,
      photo: '',
      pickUpPoint: '',
      owner: '',
      backendError: null,
    }
  },
  async created() {
    this.user = await this.fetchSession()
  },
  methods: {
    ...mapActions(['addProduct', 'fetchSession']),
    async submitProduct(e) {
      e.preventDefault()

      try {
        await this.addProduct({
          name: this.name,
          classy: this.classy,
          gear: this.gear,
          fuel: this.fuel,
          amount: this.amount,
          price: this.price,
          photo: this.photo,
          pickUpPoint: this.pickUpPoint,
          owner: this.user,
        })
        
        this.$router.push('/company-products').catch(() => {})
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
.card-body.p-4.p-sm-5
  form( @submit="submitProduct")
    h3 Create a new product
    .row
      .col
        label(for="name") Product name
        input.form-control(v-model="name" type='text' placeholder='e.g Tesla Model S' required)
      .col
        .form-group
          label(for="fuel") Fuel type
          select.form-control(v-model="fuel" id="fuel" name="fuel")
              option(value="" selected disabled hidden) Select Fuel Type
              option(value="Diesel" ) Diesel
              option(value="Gasoline" ) Gas
              option(value="Electric" ) Electric
              option(value="Hybrid" ) Hybrid
    .row
      .col
        .form-group
          label(for="gear") Gear type
          select.form-control(v-model="gear" id="gear" name="gear")
            option(value="" selected disabled hidden) Select Gear Type
            option(value="Automatic") Automatic
            option(value="Manuel") Manuel
      .col
        label(for="amount") Product amount
        input.form-control(v-model="amount" type="number" placeholder="e.g 5" required)
    .row
      .col
        label(for="price") Price per day in €
        input.form-control(v-model="price" type="number" placeholder="e.g 185" required)
      .col
        label(for="pickUpPoint") Pick-up point
        input.form-control(v-model="pickUpPoint" type="text" placeholder="e.g Berlin" required)
    .row
      .col
        label(for="photo") Photo URL
        input.form-control(v-model="photo" type="string" placeholder="URL here" required)
    .d-grid
      button.btn.btn-primary.btn-login.text-uppercase.fw-bold(type='submit')
        | Add Product
  div(v-if="backendError") {{ backendError }}

</template>

<style lang="scss" scoped>
h3{
  color: blue;
  text-align: center;
}
.row{
  padding-bottom: 0.5em;
}

</style>
