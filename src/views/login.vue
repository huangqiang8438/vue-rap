<template>
  <div>
      <h2>登陆</h2>  
       <cms-button @click="test">
         登陆触发
      </cms-button> 
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      this.$store.dispatch('setRouter').then(route => {
        this.$router.addRoutes(route)
        console.log(route)
      })
    }
  }
}
</script>

<style>

</style>
