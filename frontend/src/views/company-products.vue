<script>
// import OrderCard from '@/components/order-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'company-products',
  data() {
    return {
      user: [],
      companyProducts: [],
    }
  },
  async created() {
    this.user = await this.fetchSession()
    this.companyProducts = await this.fetchCompanyProducts(this.user._id)
  },
  methods: {
    ...mapActions(['fetchSession', 'fetchCompanyProducts', 'deleteProduct']),
    async deleteProd(id) {
      console.log(id)
      await this.deleteProduct(id)
      location.reload()
      // this.$router.push(`/`).catch(() => {})
    },
  },
}
</script>

<template lang="pug">
  .container
    .row.prodLayout
      .col-5.container.card-container(v-for="product in companyProducts")
        .row
          .col-6 
            img(src='https://th.bing.com/th/id/R.481249181a9952b4f26e84ac8ca731d5?rik=LADSC%2buUfrk8bQ&riu=http%3a%2f%2feskipaper.com%2fimages%2fbatmobile-1.jpg&ehk=PVKsAAGBELoHEOa4190yuzhh02F%2fMXEvg6pG%2bV1GS18%3d&risl=&pid=ImgRaw&r=0' width='100%' height='100%')
          .col-6
            h3 {{ product.name }}
            h5 Product Price: 
              p {{ product.price }} €
            router-link(:to="`/edit-products/${product._id}`") Edit Product
            //- button.btn.btn-primary(href=`/edit-products/${product._id}`) Edit Product
            button.btn.btn-primary(@click='deleteProd(product._id)') Delete Product
     
      
</template>
