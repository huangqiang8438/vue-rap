<template>
   <div class="cms-prompt" ref="prompt" id="prompt" :style="{ height: warpHeight }" @click="toggleCollapse">
      <div class="cms-prompt-icon">
        <img src="../../assets/images/icon-prompt.png" alt="">
        <span>操作说明:</span> </div>
      <ul class="cms-prompt-info">
       <slot></slot>
      </ul>
      <div class="cms-prompt-collapse " v-if="collapse" >{{toggleFont}}
        <i class="iconfont" :class="toggleState ? 'icon-zhankai1-copy' : 'icon-zhankai1' "></i></div>
   </div>
</template>

<script>
export default {
  name: 'cmsPrompt',
  props: {
    collapse: false
  },
  data() {
    return {
      toggleFont: '收起',
      toggleState: false,
      warpHeight: 'auto',
      saveHeight: ''
    }
  },
  methods: {
    toggleCollapse() {
      this.toggleState = !this.toggleState
      this.toggleFont = this.toggleState ? '展开' : '收起'
      if (this.toggleState) {
        this.warpHeight = '36px'
      } else {
        this.warpHeight = this.saveHeight
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      const height = this.$refs.prompt.offsetHeight

      this.saveHeight = height + 'px'
      this.warpHeight = height + 'px'
    })
  }
}
</script>

<style lang="scss" scoped>





  .cms-prompt{
    cursor: pointer;
    width: 100%;
    background-color: #f4f8fb;
     border: dotted 1px #e0e0e0;
     padding: 0 10px;
     overflow: hidden;
     position: relative;
     transition:all .15s;
  }
  .prompt-unfold{
    transition:all .15s; 
  }
  .cms-prompt-icon{
    font-size: 12px;
    color: #6798bd;
    display: flex;
    align-items:center;
    float: left;
    img{
       position: relative;
       top:2px;
       margin-right: 5px;
    }
    span{
      display:inline-block;
      margin-top: 11px;
    }
  }
  .cms-prompt-info{
    float: left;
    li{   
      font-size: 12px;
      letter-spacing: 0px;
      color: #999999;
      margin-left: 13px;
      margin-bottom: 13px;
      &:first-child{
        margin-top: 11px;
      }
      &:last-child{
        margin-bottom: 10px;
      }
    }
  }
  .cms-prompt-collapse{
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 12px;
    color: #6798bd;
    .iconfont{
      font-size: 12px;
    }
  }
</style>


