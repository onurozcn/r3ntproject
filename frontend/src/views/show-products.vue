<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'show-products',
//   data() {
//     return {
//         products: null,
//     }
//   },
//   async created() {
//     this.products = await this.fetchProducts()
//   },
  methods: {
    ...mapActions(['createInvoice']),
  
    async rent(prod) {
      try {
        await this.createInvoice({
          user: this.user._id,
          product: prod,
        })
        alert('Congrats!! Rent operation successful!!')
        this.$router.push('/order').catch(() => {})
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
   
  },
    computed: {
    ...mapState([ 'user', 'products']),
  },

}
</script>

<template lang="pug">
.container
    .container.all
        .row
            //- .col-2
            //-     form(@submit="searchFilter()")
            //-     div
            //-     label(for="priceRange") Price Range up to :&nbsp;
            //-         input(v-model="priceRange" id="priceRange" type="number" placeholder="Max Price")
            //-     div
            //-     input(type="submit" value="Search")
            .col-10
                .container
                    .row.prodLayout
                        .col-5.container.card-container(v-for="pr in this.products")
                            .row
                                .col-6
                                img(src='https://th.bing.com/th/id/R.481249181a9952b4f26e84ac8ca731d5?rik=LADSC%2buUfrk8bQ&riu=http%3a%2f%2feskipaper.com%2fimages%2fbatmobile-1.jpg&ehk=PVKsAAGBELoHEOa4190yuzhh02F%2fMXEvg6pG%2bV1GS18%3d&risl=&pid=ImgRaw&r=0' width='100%' height='100%')
                                .col-6
                                
                                router-link(:to="`/products/${pr._id}`")
                                    h3 {{ pr.name }}
                                h5 Product Price: 
                                    p {{ pr.price }} €
                                button.btn.btn-primary(@click="rent(pr)") Rent       
</template>
<style scoped>
.all{
  display: block;
}
.card-container{
  display: inline-block;
  padding: 5px 7px;
  color: rgb(98, 127, 139);
  font-size: 15px;
  font-weight: 100;
  background-color: rgba(248, 245, 245, 0.25);
  border-radius: 16px;
  margin: 15px 15px;
  box-shadow: 3px 3px rgba(0.1, 0.1, 0.1, 0.1);
  text-align: center;
}
</style>
