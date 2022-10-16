<script>
import ShowProducts from '@/components/all-products.vue'

import { mapActions, mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Homepage',
  components: { ShowProducts },
  data() {
    return {
      time: new Date(),
      message: '',
    }
  },
  methods: {
    ...mapActions(['createInvoice', 'fetchUsers', 'fetchProducts']),
    
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
  },
}
</script>

<template lang="pug">
  
  ShowProducts
    
 
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
