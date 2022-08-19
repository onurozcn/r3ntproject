<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'all-products',
  // data() {
  //   return {
  //       search: false,
  //   }
  // },
//   async created() {
//     this.products = await this.fetchProducts()
//   },
  methods: {
    ...mapActions(['createInvoice']),
  
    async rent(prod) {
      if(!this.user){
        alert("You need to Log-In to rent this car!")
        location.assign("http://r3ntproject.localhost/login")
      }
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
    async searchFilter(pric){
      this.products = this.products.filter(prod => prod.price <= pric)
      
    }
   
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
            //- MAKE FILTERING WORK 
            .col-2
                form(@submit="searchFilter(priceRange)")
                  div
                  label(for="priceRange") Price Range up to :&nbsp;
                      input(v-model="priceRange" id="priceRange" type="number" placeholder="Max Price")
                  div
                  input(type="submit" value="Search")
            //-     ----------------------------------   
            .col-10
                .container
                    .row.prodLayout
                        .col-5.container.card-container(v-for="pr in this.products")
                            .row
                                .col-6
                                img(:src="`${pr.photo}`" width='100%' height='100%')
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
