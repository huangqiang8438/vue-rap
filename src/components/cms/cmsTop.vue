<template>
  <div class="cms-top" @click="goTop" v-show="state"> 
     <i class="tri"></i>
  </div>
</template>

<script>
export default {
  name: 'cmsTop',
  data() {
    return {
      state: false
    }
  },
  methods: {
    goTop() {
      const layout = document.getElementById('layOut')
      layout.scrollTop = 0
      this.state = false
    }
  },
  mounted() {
    const layout = document.getElementById('layOut')
    this.$nextTick(() => {
      layout.addEventListener('scroll', (e) => {
        this.state = e.target.scrollTop > 200
      }, false)
    })
  }
}
</script>

<style lang="scss" scoped>
 .cms-top{
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background:#ccc;
   position: fixed;
   right:30px;
   bottom: 40px;
   cursor: pointer;
   text-align: center;
   transition: .25s ease-in-out;
 }
 .tri{
   width: 0;
    height: 0;
    border: 12px solid transparent;
    border-bottom-color: #fff;
    text-align: center;
    position: relative;
    top: -5px;
 }
  .cms-top:hover{
    background: #f44444;
  }
</style>

