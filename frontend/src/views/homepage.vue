<script>
import Counter from '@/components/counter.vue'
import { mapActions, mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Homepage',
  components: { Counter },
  data() {
    return {
      time: new Date(),
      message: '',
    }
  },
  methods: {
    ...mapActions(['createInvoice', 'fetchUsers', 'fetchProducts', 'goLive', 'sendMessageToLiveStream', 'joinStream']),
    
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
  },
  computed: {
    ...mapState(['currentLiveStream', 'liveStreams', 'user', 'liveStreamMessages']),
  },
}
</script>

<template lang="pug">
  .container
    .container.searchbutton
          router-link.button(to="/show-products") Show Products
        
  //- OPEN A LIVE STREAM WITH OTHERS 

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
