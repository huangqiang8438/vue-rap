<template>
  <transition :name="transitionName" class="cms-transition">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'cmsTransition',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  created() {
    this.transitionName = 'slide-right'
  },
  destroyed() {
    this.transitionName = 'slide-left'
  }
}
</script>

<style scoped lang='scss'>
.cms-transition{
 
}
@keyframes show-in{
  0%   {
    transform: scale(.3);
    opacity: 0;
  }

  100%  { transform: scale(1);
    opacity: 1;}
}
@keyframes show-out{
  0%   {
    transform: scale(1);
    opacity: 1;
  }

  100%  { transform: scale(.3);
    opacity: 0;}
}
.slide-left-enter, .slide-right-leave-active {
   transition: all 10s;
  transform: translate(100px,0)
}
.slide-left-leave-active, .slide-right-enter {
   transition: all .5s;
  transform: translate(-100px,0)
}
</style>
