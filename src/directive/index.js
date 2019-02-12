
import Vue from 'vue'
import store from '@/store'
// 调色板指令
Vue.directive('color', {
  bind(el, binding) {
    el.style.backgroundColor = store.state.system.color
  }
})

Vue.directive('drag', // 自定义指令                                      JS
  { bind: function(el, binding) {
    const oDiv = el // 当前元素
    // const self = this // 上下文
    oDiv.onmousedown = function(e) {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - oDiv.offsetLeft
      const disY = e.clientY - oDiv.offsetTop

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        // 移动当前元素
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
        // 将此时的位置传出去
        // binding.value({ x: e.pageX, y: e.pageY })
      }
      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
  }
)

