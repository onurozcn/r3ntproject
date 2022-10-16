<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'company-products',
  data() {
    return {
     
      companyProducts: [],
    }
  },
    computed: {
    ...mapState([ 'user']),
  },
  async created() {
    this.companyProducts = await this.fetchCompanyProducts(this.user._id)
  },
  methods: {
    ...mapActions(['fetchCompanyProducts', 'deleteProduct']),
    async deleteProd(id) {
      await this.deleteProduct(id)
      location.reload()
      // this.$router.push(`/`).catch(() => {})
    },
  },
}
</script>

<template lang="pug">
  .container.all
    .row.prodLayout
      .col-9.container.card-container(v-for="product in companyProducts")
        .row
          .col-6 
            img(:src='`${product.photo}`' width='100%' height='100%')
          .col-6
            h3 {{ product.name }}
            h5 Product Price: 
              p {{ product.price }} €
            button.btn
             router-link(:to="`/edit-products/${product._id}`") Edit Product
            button.btn.btn-primary(@click='deleteProd(product._id)') Delete Product
     
      
</template>
<style scoped>
 .all{
    display: block;
}
.card-container{
  display: flex;
  padding: 5px 7px;
  color: rgb(98, 127, 139);
  font-size: 15px;
  font-weight: 100;
  background-color: #dfe8f1;
  border-radius: 16px;
  margin: 15px 15px;
  box-shadow: 3px 3px rgba(0.1, 0.1, 0.1, 0.1);
  text-align: center;
} 
</style>
