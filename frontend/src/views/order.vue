<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'user-orders',
  data() {
    return {
      orders: [],
      invoices: [],
      rev: '',
      product: {},
    }
  },
  async created() {
   
    this.orders = await this.fetchUserOrders(this.user._id)
    this.invoices = await this.fetchUserInvoices(this.user._id)
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['addReview', 'fetchUserOrders', 'fetchUserInvoices']),
    ...mapMutations(['setFilteredProducts']),
    async submitRev(prod){
      
      this.product= prod
      const updated = await this.addReview({
        product: this.product,
        user : this.user,
        review: this.rev,
      })
      this.setFilteredProducts(updated)
      this.$router.push(`/products/${this.product._id}`).catch((e) => {
        console.log(e)
      })
    },
    userInput(event){
      this.rev = event.target.value
    }
}
}
</script>

<template lang="pug">
.card
  .card-body.m-4(v-for="order in orders")
    .container.mb-5.mt-3
      .row.d-flex.align-items-baseline
        .col-xl-9.mx-auto
          p(style='color: #7e8d9f;font-size: 20px;')
            | Invoice ID:  
            router-link(:to="`/order/invoice/${order.invoice._id}`") 
              strong {{order.invoice._id}}
        .col-xl-9
          .row
            .row
              .col-xl-8
                ul.list-unstyled
                  li.text-muted
                  span.fw-bold Order-ID:
                  | {{order._id}}
                  li.text-muted
                    | To: 
                    span(style='color:#8f8061 ;') {{order.user.name}}
                  li.text-muted {{order.user.email}}
            .row.m-2
              textarea.form-control.txtarea(type="text" v-on:input="userInput($event)" :placeholder="`Enter your review for ${order.product.name}, with order number ${order._id}`")
              button.btn.btn-primary(@click="submitRev(order.product)") Submit Review

              .col-md-2.mb-1.mb-md-0.mx-auto
                .bg-image.ripple.rounded-5.mb-4.overflow-hidden.d-block(data-ripple-color='light')
                  img.w-100(:src="`${order.product.photo}`" height='100px' :alt="`${order.product.name}`")
                  p.fw-bold {{order.product.name}}
                  p.text-black.float-start
                    span.text-black.me-3 Total Amount:
                    span(style='font-size: 25px;') €{{Math.floor(order.product.price*1.15)}}
          

</template>
<style scoped>

.card-body{
  border: solid 3px blue;
}
.txtarea{
  position: relative;
  width: 50%;
  height: 50%;
}
.btn{
  width : auto;
  height: 50%;
}
</style>
