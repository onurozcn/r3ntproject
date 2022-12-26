<script>
export default {
  name: 'FooterComponent',
}
</script>

<template lang="pug">

  .footer.center
    div
      h3 About us
      p Newsroom
      p Careers
    div
      h3 Policies
      p Terms conditions
      p Privacy
    div
      h3 Support
      p Help center
      p FAQs
</template>

<style lang="scss">
.footer {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 2.5rem;
  padding: 3.5rem 8rem;
  background:  #c7daea;
  position: sticky;
  top: 100vh;
  margin-top: 2rem;
}
.center {
  margin: auto;
  width: 100%;
}
@media (max-width: 768px) {
  .footer {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>