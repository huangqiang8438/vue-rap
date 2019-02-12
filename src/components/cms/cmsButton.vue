<template>
  <button class="cms-button" :class="styleClass" :style="color" :disabled="disabled" @click="handleClick">
    <i class="iconfont" :class="iconClass" v-if="icon!==''"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'cmsButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    colorPicker: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    color() {
      let obj = {}
      if (this.colorPicker) {
        obj = {
          backgroundColor: this.$store.state.system.color
        }
      }
      return obj
    },
    styleClass() {
      const styleClass = [
        'cms-button--' + this.size,
        'cms-button--' + this.type
      ]
      if (this.icon !== '') {
        // 判断有无图标
        styleClass.push('is-icon')
      }
      return styleClass
    },
    iconClass() {
      return ['cms-icon--' + this.icon]
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang='scss' scoped>
.cms-button {
  cursor: pointer;
  background-color: #188ae2;
  border-radius: 4px;
  border: none;
  color: #fff;
  outline: none;
  font-size: 14px;
  padding: 9px 20px;
  &:disabled{
    background: #cecece;
    cursor:not-allowed;
  }
  &--default {
    background-color: #188ae2;
  }
  &--small {
    min-width: 54px;
    padding: 6px 12px;
  }
  &--info {
    background-color: #f7f7f7;
    color: #444;
    border: 1px solid #e7e7e7;
    .iconfont {
      color: #b7b7b7;
    }
    &:hover {
      .cms-icon-- {
        &edit,
        &lock,
        &success,
        &correlation,
        &up,
        &back {
          color: #00da38;
        }
        &error,
        &warning,
        &down {
          color: #fe5331;
        }
        &look {
          color: #00ccff;
        }
      }
    }
  }
  &--rest {
    background-color: #999;
  }
  &--error {
    background-color: #fe5331;
  }
  &--success {
    background-color: #00da38;
  }
  &--warning {
    background-color: #ff802c;
  }
  &--more {
    background-color: #8bb2c2;
  }
  .iconfont {
    font-size: 14px;
  }
  &:hover {
    opacity: 0.8;
  }
}
.cms-icon-- {
  &error {
    &::after {
      content: "\e606";
    }
  }
  &success {
    &::after {
      content: "\e64b";
    }
  }
  &warning {
    &::after {
      content: "\e6dd";
    }
  }
  &edit {
    &::after {
      content: "\e615";
    }
  }
  &add {
    &::after {
      content: "\e633";
    }
  }
  &save {
    &::after {
      content: "\e642";
    }
  }
  &lock {
    //操作图标
    &::after {
      content: "\e614";
    }
  }
  &correlation {
    //关联图标
    &::after {
      content: "\e63b";
    }
  }
  &down {
    //箭头
    &::after {
      content: "\e738";
    }
  }
  &up {
    //箭头
    &::after {
      content: "\e8d0";
    }
  }
  &back {
    //还原返回
    &::after {
      content: "\e8d1";
    }
  }
  &more {
    //更多
    &::after {
      content: "\e612";
    }
  }
  &look {
    //查看
    &::after {
      content: "\e609";
    }
  }
}
.is-icon {
  padding: 6px 8px;
}
.is-disabled {
  cursor: not-allowed;
}
.el-dialog .cms-button {
  padding: 7px 20px;
}
</style>
