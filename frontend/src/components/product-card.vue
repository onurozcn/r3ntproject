<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    async buy(prod) {
      console.log(prod)
    },
  },
}
</script>
<template lang="pug">
.box
  h2 {{product.name}} {{product.price}}
  button(@click="buy(product)") BUY
   
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid black;
  border-radius: 0.3rem;
}
</style>
