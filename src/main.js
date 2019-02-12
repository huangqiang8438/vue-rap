// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Vddl from './components/vddl/install'// 拖拽插件
import cmsComponents from '@/components/index'
import global from './utils/global'
import VueClipboard from 'vue-clipboard2'
import 'normalize.css/normalize.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/index.scss'
import '@/directive/index'
import './permission'
Vue.use(VueClipboard)
Vue.use(Vddl)
Vue.use(ElementUI)
Vue.use(cmsComponents)
Vue.use(global)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
