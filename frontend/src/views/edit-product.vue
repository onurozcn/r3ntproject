<script>
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'edit-product',
  data() {
    return {
      name: '',
      // type: '',
      // classy: '',
      gear: '',
      seat: 0,
      fuel: '',
      amount: 0.0,
      price: 0.0,
      // isAvailable: false,
      pickUpPoint: '',
      product: null,
      backendError: null,
      id: '',
    }
  },
  async created() {
    const product = await this.fetchProduct(this.$route.params.id)
    this.name = product.name
    // this.type = product.type
    // this.classy = product.classy
    this.gear = product.gear
    this.amount = product.amount
    this.seat = product.seat
    this.fuel= product.fuel
    this.price = product.price
    // this.isAvailable = product.isAvailable
    this.pickUpPoint = product.pickUpPoint
  },
  methods: {
    ...mapActions(['editProduct', 'fetchProduct']),
    async eProduct(e) {
      e.preventDefault()

      try {
        await this.editProduct({
          name: this.name,
          // type: this.type,
          // classy: this.classy,
          gear: this.gear,
          seat: this.seat,
          fuel: this.fuel,
          amount: this.amount,
          price: this.price,
          // isAvailable: this.isAvailable,
          photo: this.photo,
          pickUpPoint: this.pickUpPoint,
          id: this.$route.params.id,
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
.product
    form( @submit="eProduct")
      h1 Edit Product
      label(for="name") Product Name:&nbsp;
        input(v-model="name" id="name" type="text" placeholder="Product name" required)
      //- label(for="type") Product Type:&nbsp;
      //-   input(v-model="type" id="type" type="text" placeholder="Product type" required)
      //- label(for="classy") Product Class:&nbsp;
      //-   input(v-model="classy" id="classy" type="text" placeholder="Product class" required)
      label(for="gear") Gear Type:&nbsp;
        input(v-model="gear" id="gear" type="text" placeholder="Gear type" required)
      label(for="seat") Number of Seats:&nbsp;
        input(v-model="seat" id="seat" type="number" placeholder="Number of seats" required)
      label(for="fuel") Fuel Type:&nbsp;
        input(v-model="fuel" id="fuel" type="text" placeholder="Fuel type" required)
      label(for="amount") Amount:&nbsp;
        input(v-model="amount" id="amount" type="number" placeholder="Amount" required)
      label(for="price") Price per Day:&nbsp;
        input(v-model="price" id="price" type="number" placeholder="Price per day" required)
      //- label(for="isAvailable") Availability:&nbsp;
      //-   input(v-model="isAvailable" id="isAvailable" type="text" placeholder="Is available?" required)
      label(for="photo") Photo:&nbsp;
        input(v-model="photo" id="photo" type="text" placeholder="Photo URL" required)
      label(for="pickUpPoint") Pick up Point:&nbsp;
        input(v-model="pickUpPoint" id="pickUpPoint" type="text" placeholder="Pick up point" required)
      input.button(type="submit" value="Edit Product")
    div(v-if="backendError") {{ backendError }}
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
.button {
  margin-bottom: 50px;
}
.product {
  padding: 20px;
}
</style>
