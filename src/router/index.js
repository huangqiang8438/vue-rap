import Vue from 'vue'
import Router from 'vue-router'
import routesInfo from './routeMap'
/**
 * isParent: true 无二级菜单展开
 *iconClass 图标类名  src/assets/sideBar.SCSS
 *
 *
 */
Vue.use(Router)
export default new Router({
  routes: routesInfo
})
