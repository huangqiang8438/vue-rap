<template>
  <div class="cms-breadcrumb clearfix">
    <slot name="body"></slot> 
    <ul class="cms-breadcrumb-items">
       <slot><li></li></slot> 
    </ul>
    <div class="cms-breadcrumb-back" > 
      <i class="iconfont icon-guanbi" @click="$routerLink(to)"></i>
        <transition name="cms-breadcrumb">
            <div class="cms-breadcrumb-tooltip" v-show="visble">
                点击此处返回{{title}}
              </div>  
        </transition>
      </div> 
  </div>
</template>

<script>
export default {
  name: 'cmsBreadcrumb',
  props: {
    to: {
      type: String,
      default: '/index'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visble: false
    }
  },
  created() {
    setTimeout(() => {
      this.visble = true
    }, 800)
    setTimeout(() => {
      this.visble = false
    }, 3000)
  }
}
</script>
