export default {
  required: function(mes, trigger, type) { // 必填验证
    return {
      required: true,
      message: mes || '此项必填',
      trigger: trigger || 'blur',
      type: type || ''
    }
  },
  len: function(min, max, trigger) { // 长度验证
    return {
      min: min || 1,
      max: max || 255,
      message: '长度为' + min + '-' + max,
      trigger: trigger || 'blur'
    }
  },
  password: function(callback) {
    return {
      validator: callback,
      trigger: 'blur'
    }
  },
  email: function() {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const va = (rule, value, callback) => {
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱地址'))
      }
    }
    return {
      validator: va,
      trigger: 'blur'
    }
  }
}

