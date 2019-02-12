import cmsModules from './routeModule'
// 仅供开发时调用使用
export default [

  {
    name: '首页',
    path: '/',
    component: cmsModules.layout,
    redirect: '/index',
    children: [
      {
        name: '首页内容',
        meta: { title: '首页' },
        path: '/index',
        component: cmsModules.index
      }
    ]
  }, {
    name: '模块',
    path: '/modules',
    component: cmsModules.layout,
    redirect: '/modules/list',
    children: [
      {
        name: '模块列表',
        path: '/modules/list',
        component: cmsModules.moduleList
      }
    ]
  }
]
