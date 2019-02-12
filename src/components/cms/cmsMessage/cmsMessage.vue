<template>
  <transition name='message-box'>
    <div class="cms-message-box" :class="options.type" v-show="visible" id="cmsMessageComponent">
      {{options.message}}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'cmsMessage',
  data() {
    return {
      options: {
        message: '',
        timer: 1500,
        autoClose: true,
        type: 'default',
        fastClick: true
      },
      visible: false,
      timers: []
    }
  },
  methods: {
    autoClose() {
      this.visible = true
      if (this.options.autoClose) {
        const t = setTimeout(() => {
          this.close()
        }, this.options.timer)
        this.timers.push(t)
      }
    },
    close() {
      this.visible = false
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    }
  },
  mounted() {
    const el = document.getElementById('cmsMessageComponent')
    if (el) {
      this.timers.forEach(timer => {
        window.clearTimeout(timer)
      })
      this.timers = []
      el.parentNode.removeChild(el)
    }
    this.autoClose()
  },
  watch: {
    visible(value) {
      if (this.options.fastClick) {
        if (value) {
          window.addEventListener('click', this.close)
        } else {
          window.removeEventListener('click', this.close)
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.cms-message-box {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  font-size: 14px;
  padding: 14px 18px;
}
.cms-message-box.error {
  background: rgba(254, 83, 49, 0.8);
}
.message-box-enter-active,
.message-box-leave-active {
  transition: all 0.15s;
}

.message-box-enter,
.message-box-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
.message-box-leave,
.message-box-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
