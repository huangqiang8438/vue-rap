import Vue from 'vue'
import cmsMessage from './cmsMessage'
import cms from '@/utils'
const MyMsgConstructor = Vue.extend(cmsMessage)
let instance
var MyMsg = function(options) {
  var self_options = {
    message: 'cms-message',
    timer: 1500,
    autoClose: true,
    type: 'default',
    fastClick: true,
    callback: function() {}
  }
  if (cms.validateObjcet(options) === 'String') {
    self_options.message = options
  } else if (cms.validateObjcet(options) === 'Object') {
    self_options = Object.assign(self_options, options)
  }

  instance = new MyMsgConstructor({// 组件实例
    data: {
      options: self_options
    },
    methods: {
      onClose: self_options.callback
    }
  })

  // 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
  instance.$mount()
  document.body.appendChild(instance.$el)
  return instance
}

export default MyMsg
