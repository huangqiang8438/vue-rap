<template>
  <div class="cms-layout">
     <cms-header></cms-header>
     <div class="cms-container">
        <div class="cms-main">
            <router-view class="cms-body" ref="layout" ></router-view>
        </div>
     </div>
  </div>
</template>

<script>
import cmsHeader from './header'
export default {
  components: {
    cmsHeader
  }
}
</script>

<style>

</style>
