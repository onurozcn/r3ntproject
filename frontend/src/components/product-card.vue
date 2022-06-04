<script>
export default {
  name: 'ProductCard',
  props: ['product'],
}
</script>
<template lang="pug">
.box
  h2 {{product.name}} {{product.price}}
   
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid black;
  border-radius: 0.3rem;
}
</style>
