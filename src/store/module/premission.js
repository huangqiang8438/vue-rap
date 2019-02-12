
const commed = {
  layout: () => import('@/components/layout.vue'),
  index: () => import('@//views/index.vue')
}

const routeMap = [{
  name: '首页',
  path: '/',
  component: 'layout',
  isParent: true,
  iconClass: 'icon-index',
  redirect: '/index',
  children: [
    {
      name: '首页内容',
      meta: { title: '首页' },
      path: '/index',
      component: 'index'
    }
  ] }, {
  name: '平台',
  path: '/platform',
  iconClass: 'icon-pt',
  component: 'layout',
  children: [
    {
      name: '权限',
      path: '/perm',
      component: '/components/childView.vue',
      children: [
        {
          name: '管理员',
          path: '/admin',
          component: '/views/platform/permissions/admin/list.vue'
        },
        {
          isHidden: true,
          meta: { title: '管理员' },
          name: '管理员-编辑',
          path: '/admin/edit',
          component: '/views/platform/permissions/admin/edit.vue'
        }
      ]
    }
  ]
}
]

function filterRouter(routersMap) { // 过滤路由信息
  var filterArray = []
  routersMap.map(v => {
    if (v.component) {
      v.component = commed[v.component]
    }
    if (v.children && v.children.length > 0) {
      filterRouter(v.children)
    }
    filterArray.push(v)
  })
  return filterArray
}

const permissions = {
  state: {
    loginState: false, // 登陆状态
    ansyRouterMap: [] // 后端角色菜单
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.ansyRouterMap = routers
    }
  },
  actions: {
    setRouter({ commit }) {
      return new Promise(resolve => {
        const accessedRouters = filterRouter(routeMap)
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }

}

export default permissions
