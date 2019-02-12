import cmsMessage from '@/components/cms/cmsMessage'
import router from '@/router/index'
import cms from './index'
import rules from '@/rules'
import http from '@/api/http'
export default {
  install(Vue, options) {
    Vue.prototype.$cms = cms // 工具方法
    Vue.prototype.$routerLink = function(path, type, queryParams) {
      var params = {
        type: type
      }
      params = Object.assign(params, queryParams)
      // 路由
      router.push({ path: path, query: params })
    }
    Vue.prototype.$http = http // axios

    Vue.prototype.$cmsMessage = cmsMessage // cms 提示框
    Vue.prototype.$rules = rules // 验证规则
    Vue.prototype.$successMessage = function(mes) {
      // 成功提示
      cmsMessage({
        message: mes,
        type: 'success',
        timer: '1000'
      })
    }
    Vue.prototype.$getUrl = function() {
      let url = location.href
      const http = url.substring(0, url.indexOf('//') + 2)
      url = url.substring(url.indexOf('//') + 2, url.length)
      if (url.indexOf('/') >= 0) {
        url = url.substring(0, url.indexOf('/'))
      }
      return http + url
    }
    Vue.prototype.$errorMessage = function(mes) {
      // 成功提示
      cmsMessage({
        message: mes,
        type: 'error',
        timer: '1500'
      })
    }
    Vue.prototype.$validateNum = function(el) {
      // 数字验证
      const val = el.target.value
      const reg = /^[1-9][0-9]{0,1}$/
      if (val === '') {
        el.target.className = 'cms-error el-input__inner'
        cmsMessage({
          message: '请输入一个有效数字',
          type: 'success',
          timer: '1000',
          fastClick: false
        })
      } else {
        if (reg.test(val)) {
          el.target.className = 'el-input__inner'
        } else {
          el.target.className = 'cms-error el-input__inner'
          cmsMessage({
            message: '只能输入1-99的正整数',
            type: 'success',
            timer: '1000',
            fastClick: false
          })
        }
      }
    }
  }
}
