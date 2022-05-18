<script>
// @ is an alias to /src
/* eslint-disable */
import Counter from '@/components/counter.vue'
import { mapActions } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'UserList',
  components: { Counter },
  data() {
    return {
      users: [],
    }
  },
  async created() {
    this.users = await this.fetchUsers()
   

    // setTimeout(() => {
    //   this.users.push({
    //     name: 'A dummy user',
    //     age: 55,
    //     email: 'dummyEmail' + Date.now(),
    //   })
    // }, 5000)
  },
  methods: { 
    ...mapActions(['fetchUsers'])
  }
}
</script>

<template lang="pug">
  .home
    h1 Rent Project 
    h2 USERS
    div(v-for="user in users" :user="user")
      router-link(:to="`/users/${user._id}`") {{user.name}}
    Counter
</template>
