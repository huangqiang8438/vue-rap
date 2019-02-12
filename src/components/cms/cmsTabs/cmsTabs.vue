<template>
  <div class="cms-tabs clearfix">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'cmsTabs'
}
</script>

<style lang='scss' scoped>
 .cms-tabs{
   width: 100%;
   border-bottom: 2px solid #f0f0f0; 
   margin-bottom: 16px;
 }
</style>
