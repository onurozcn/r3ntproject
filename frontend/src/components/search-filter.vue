<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'SearchFilterComponent',
  data() {
    return {
      price: null,
      fuel: '',
      gear: '',
      showBtn : true
    }
  },
  methods: {
    ...mapActions(['filterProducts']),
    ...mapMutations(['setFilteredProducts']),
    hideButton(){
      this.showBtn = !this.showBtn
    },
    async searchFilter() {
      const filteredProducts = await this.filterProducts({
        price: this.price,
        fuel: this.fuel,
        gear: this.gear,
      })
      this.showBtn = !this.showBtn
      this.setFilteredProducts(filteredProducts)
      this.$refs.anyName.reset()
    },
  },
}
</script>
<template lang="pug">
    .row.center.filter
      button.center.search-bar-button.btn.btn-primary(v-show="showBtn" @click="hideButton()" data-bs-toggle="collapse" data-bs-target="#searchfilter" aria-expanded="false" aria-controls="searchfilter") Search Filter
      form.mt-3(v-show="!showBtn" @submit.prevent="searchFilter")          
        label(for="price") Price up to
          input.form-control.custom(v-model="price" id="priceRange" type="number" min=0 step=1 placeholder="Max Price")
        label(for="fuel") Fuel Type
          select.form-control.custom(v-model="fuel" id="fuel" name="fuel")
              option(value="" selected) Select
              option(value="Diesel" ) Diesel
              option(value="Gasoline" ) Gas
              option(value="Electric" ) Electric
              option(value="Hybrid" ) Hybrid
        label(for="gear") Gear Type
          select.form-control.custom(v-model="gear" id="gear" name="gear")
            option(value="" selected) Select
            option(value="Automatic") Auto
            option(value="Manuel") Manuel
        button.btn.btn-primary.ml-2(type='submit') Search


    
</template>
          <style scoped>
.search-bar-button{
  max-width: 200px;
  padding: 10px;
}
.center {
  margin: auto;
  /* width: 50%; */
  padding: 10px;
}
label{
  text-align: center;
  padding-left: 10px;
}
.filter{
  min-width: 300px;
}
.custom{
  max-width: 100px;
}
</style>
