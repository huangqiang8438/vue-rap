import layout from '@/components/layout.vue'
import childView from '@/components/childView.vue'

export default {
  layout: layout,
  childView: childView,
  index: () => import('~/index.vue'), // 首页
  moduleList: () => import('~/module/list.vue') // api类型列表
}
