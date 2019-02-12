<template>
  <div class="visual-mask" v-show="isShow" >
   <div class="visual-mask-opt">
      <span><i class="iconfont icon-zhiding"></i>顶部</span>
      <span><i class="iconfont icon-xiayi-copy"></i>上移</span>
      <span><i class="iconfont icon-xiayi"></i>下移</span>
      <span><i class="iconfont icon-zhiding-copy"></i>底部</span>
      <span><i class="iconfont icon-shanchu"></i>删除</span>
     </div> 
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: [String, Number]
    },
    type: {
      type: [String],
      default: 'edit'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    onShow() { // 显示
      this.isShow = true
    },
    onHide() { // 隐藏
      this.isShow = false
    },
    delModule() {
      this.$emit('delete', this.index)
    },
    edit() {
      this.$emit('edit', true)
    }
  }
}
</script>

<style scoped lang='scss'>
  .visual-mask{
    position: absolute;
    cursor: pointer;
    background: #76c2e9;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    border-radius: 4px 0 4px 4px;
  }
  .visual-mask-opt{
    padding: 10px;
    right: 0;
  top:-32px;
  position: absolute;
  height: 32px;
  
  width: 275px;
  border-radius: 4px 4px 0 0;
  background: #76c2e9;
  z-index: 11;
  font-size: 12px;
  color: #fff;
  span{
    margin-right: 9px;
  }
  .iconfont{
    position: relative;
    top:2px;
  }
  }
</style>
