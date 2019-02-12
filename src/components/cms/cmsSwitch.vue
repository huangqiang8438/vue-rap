<template>
  <div class="cms-switch" 
   :class="sizeClass" 
   @click="toggle" 
      >
    <span class="cms-switch--title cms-switch--on" :true-value='activeValue'  v-if="status" >{{onText}}</span>
    <span class="cms-switch--title cms-switch--off" :true-value='inactiveValue' v-else >{{offText}}</span>
  </div>
</template>

<script>
/**
 *
 *
 * @event input return value
 * @event change return value,id
 *
 */
export default {
  name: 'cmsSwitch',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    id: {// 唯一表示
      type: [String, Number],
      default: 0
    },
    size: {// 尺寸
      type: String,
      default: 'small'// 可选值 large
    },
    activeValue: {// 打开绑定值
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: { // 关闭绑定值
      type: [Boolean, String, Number],
      default: false
    },
    onText: {// 打开文字描述
      type: String,
      default: '是'
    },
    offText: {
      type: String, // 关闭文字描述
      default: '否'
    }
  },

  data() {
    return {
      status: true// 是否选中状态
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue
    },
    sizeClass() { // 开关大小样式
      const classArr = []
      if (this.status) {
        classArr.push('on')
      } else {
        classArr.push('off')
      }
      if (this.size === 'small') {
        classArr.push('small')
      } else {
        classArr.push('large')
      }
      return classArr
    }
  },
  watch: {
    checked() {
      this.status = this.checked
    }
  },
  methods: {
    toggle() { // 点击改变事件
      this.$emit('input', !this.checked ? this.activeValue : this.inactiveValue)
      this.$emit('change', !this.checked ? this.activeValue : this.inactiveValue, this.id)
    }
  },
  created() {
    this.status = this.value === this.activeValue
  }
}
</script>

<style lang='scss' scoped>
   .cms-switch{
     cursor: pointer;
     user-select: none;
     display: inline-block;
     position: relative;
     height: 20px;
     line-height: 20px;
     
     border-radius: 10px;
     transition: all 0.21s ease;
   
    &--title{
      display: inline;
       position: absolute;
      font-size: 12px;
      font-weight:500;
      top: 0px;
     
    }
    &--on{
        left: 6px;
    }
    &--off{
      left: 23px;
    }
     &::after{
       position: absolute;
       content: '';
       width: 16px;
        height: 16px;
        top:2px;
        background-color: #ffffff;
        border-radius: 50%;
        transition: left 0.23s ease, width 0.23s ease, background-color 0.23s ease
     }
   }
   .small{
    width: 41px;
   }
   .large{
     width: 52px;
   }
    .on.large{
        &::after{
          left: 35px;
        }  
    }
    .on{
      background-color: #00da38;
      color: #fff;
        &::after{
          left: 23px;
        }  
    }
    
    .off{
      background-color: #e0e0e0;
      color: #b6b6b6;
        &::after{
          left: 1px;
        }  
    }
</style>
