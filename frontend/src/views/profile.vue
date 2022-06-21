<script>
import Counter from '@/components/counter.vue'
// import Product from '@/components/product-card'
import { mapActions, mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  components: { Counter },
  data() {
    return {
      products: [],
      users: [],
      time: new Date(),
      message: '',
      show: false,
      fPrice: 0,

      // search: {
      //   fPrice: 10000,
      //   rType: [],
      //   fType: [],
      // },
    }
  },
  async created() {
    this.users = await this.fetchUsers()
    this.products = await this.fetchProducts()
  },
  methods: {
    ...mapActions(['createInvoice', 'fetchUsers', 'fetchProducts', 'goLive', 'sendMessageToLiveStream', 'joinStream']),
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
    showProducts() {
      this.show = !this.show
    },
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
      // location.reload()
    },
    // async searchFilter(e) {
    //   e.preventDefault()

    //   try {
    //     //  add filter method to state index
    //     this.products = await this.filterProducts({
    //       fPrice: this.price,
    //       // type: this.rType,
    //       // fuel: this.fType,
    //     })
    //     this.$router.push('/')
    //   } catch (e) {
    //     this.backendError = e.response.data.message
    //   }
    // },
  },
  computed: {
    ...mapState(['currentLiveStream', 'liveStreams', 'user', 'product', 'liveStreamMessages']),
  },
}
</script>

<template lang="pug">
  .container
    .container.searchbutton
          button(@click="showProducts") Show Products
    .container(v-if="show")
      .row
        .col-2
          form(@submit="searchFilter()")
           div
            label(for="price") Price Range up to :&nbsp;
              input(id="priceRange" type="number" placeholder="Max Price")
           div
            input(type="submit" value="Search")


        .col-10
          .container
            .row.prodLayout
              .col-5.container.card-container(v-for="product in products")
                .row
                  .col-6
                    img(src='https://th.bing.com/th/id/R.481249181a9952b4f26e84ac8ca731d5?rik=LADSC%2buUfrk8bQ&riu=http%3a%2f%2feskipaper.com%2fimages%2fbatmobile-1.jpg&ehk=PVKsAAGBELoHEOa4190yuzhh02F%2fMXEvg6pG%2bV1GS18%3d&risl=&pid=ImgRaw&r=0' width='100%' height='100%')
                  .col-6
                    router-link(:to="`/products/${product._id}`")
                      h3 {{ product.name }}
                    h5 Product Price: 
                      p {{ product.price }} €
                    button.btn.btn-primary(@click="rent(product)") Rent
              
  //-   div(v-if="liveStreams.length")
  //-     h2 Live streams
  //-     div(v-for="stream in liveStreams")
  //-       p {{ stream }}
  //-       button(@click="joinStream(stream)") Join stream
  //-   button(@click="goLive") Go live
  //-   div(v-if="currentLiveStream")
  //-     h3 Live stream
  //-     .messages
  //-       .message(v-for="message in liveStreamMessages")
  //-         p
  //-           span {{ message.author }}:&nbsp;
  //-           span {{ message.body }}
  //-     form(@submit="sendMessage")
  //-       input(type="text" v-model="message")
  //-       input(type="submit" value="Send message")
</template>
<style scoped>
.searchbutton {
  justify-content: center;
  display: flex;
  padding: 1rem;
}
.card-container {
  display: grid;
  border: 1px solid #d0d0d0;
  padding: 12px;
  margin-bottom: 24px;
  border-radius: 8px;
  place-items: center;
}
.container {
  padding: 2px;
  margin: 5px;
}
div {
  padding: 0.3rem;
}
.rentalType {
  margin: 3px;
}
label {
  margin: 1px;
  padding: 1px;
}
#priceRange {
  width: 100px;
}
.prodLayout {
  justify-content: center;
}
</style>
