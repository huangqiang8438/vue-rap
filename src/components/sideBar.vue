<template>
  <div>
    <!-- 展开 -->
    <div class="cms-menu" :class="collapse&&currentFirstPath!='/' ? 'collapse' : ''" v-if="collapse">
      <ul class="cms-menu-wrap">
        <template v-for="item in menuInfo">
          <li class="cms-menu-item" :key="item.name" :data-path='item.path' v-if="item.isParent&&!item.isHidden">
            <div class="cms-menu-name" :class="currentFirstPath === item.path ? 'active' : '' " @click="showFirstMenu(item,true)" @mouseenter="setActive($event,item,true)" @mouseleave="setActive($event,item,false)">
              <router-link :to="item.path">
                <i class="cms-menu-icon" :class="item.iconClass"></i>
                <h4 class="cms-menu-tit">{{item.name}}</h4>
              </router-link>
            </div>
          </li>
          <li class="cms-menu-item" :key="item.name" :data-path='item.path' v-else-if="!item.isHidden">
            <div class="cms-menu-name" :class="currentFirstPath === item.path ? 'active' : '' " @click="showFirstMenu(item,true)" @mouseenter="setActive($event,item,true)" @mouseleave="setActive($event,item,false)">
              <i class="cms-menu-icon " :class="item.iconClass"></i>
              <h4 class="cms-menu-tit">{{item.name}}</h4>
            </div>
            <ul class="cms-submenu" :class="collapse ? 'show' :'hide' " v-if="item.children && item.children.length > 0" v-show='collapse && currentFirstPath===item.path'>
              <h2 class="cms-submenu-header">
                {{item.name}}
              </h2>
              <template v-for="(child,index) in item.children">
                <div class="cms-submenu-menu" v-if="child.children && child.children.length > 0" :key="index">
                  <span class="cms-submenu-title" :class='currentChildPath === child.path ? "active" : "" ' :data-path='child.path' @click="showChildMenu(child)">
                    {{child.name}}</span>
                  <el-collapse-transition>
                    <ul v-show="currentChildPath===child.path">
                      <li class="cms-submenu-item cms-submenu-child" :class='isChildActive(son)? "active" : ""' v-for="(son,index2) in child.children" :key="index2" :data-path='son.path' @click="showSecondMenu(son,true,true)" v-if="!son.isHidden">
                        <router-link :to="son.path" :target='son.isBlank?"_blank":""'>{{son.name}}</router-link>
                      </li>
                    </ul>
                  </el-collapse-transition>
                </div>
                <li class="cms-submenu-item" v-else :class='currentSecondPath === child.path ? "active" : ""' :key="index" :data-path='child.path' @click="showSecondMenu(child,false,true)">
                  <router-link :to="child.path">{{child.name}}</router-link>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </div>
    <!-- 收缩显示 -->
    <div class="cms-menu shrink" :class="collapse ? 'collapse' : ''" v-else>
      <ul class="cms-menu-wrap">
        <template v-for="item in menuInfo">
          <li class="cms-menu-item" :key="item.name" :data-path='item.path' v-if="item.isParent&&!item.isHidden" :title="item.name">
            <div class="cms-menu-name" :class="currentFirstPath === item.path ? 'active' : '' " @mouseenter="hoverFirstMenu($event,item,true)" @mouseleave="hoverFirstMenu($event,item,false)">
              <router-link :to="item.path" class="flex-center">
                <i class="cms-menu-icon" :class="item.iconClass"></i>
                <h4 class="cms-menu-tit">{{item.name}}</h4>
              </router-link>
            </div>
          </li>
          <li class="cms-menu-item" :key="item.name" :data-path='item.path' v-else-if="!item.isHidden" :title="item.name">
            <div class="cms-menu-name" :class="currentFirstPath === item.path ? 'active' : '' " @mouseenter="hoverFirstMenu($event,item,true)" @mouseleave="hoverFirstMenu($event,item,false)">
              <i class="cms-menu-icon" :class="item.iconClass"></i>
              <h4 class="cms-menu-tit">{{item.name}}</h4>
            </div>
            <ul class="cms-submenu" v-if="item.children && item.children.length > 0" v-show='hoverFirstpath===item.path' @mouseenter="hoverSecondMenu($event,item,true)" @mouseleave="hoverSecondMenu($event,item,false)">
              <h2 class="cms-submenu-header">
                {{item.name}}
              </h2>
              <template v-for="(child,index) in item.children">
                <div class="cms-submenu-menu" v-if="child.children && child.children.length > 0" :key="index">
                  <span class="cms-submenu-title" :class='currentChildPath === child.path ? "active" : "" ' :data-path='child.path' @click="showChildMenu(child)">
                    {{child.name}}</span>
                  <el-collapse-transition>
                    <ul v-show="currentChildPath===child.path">
                      <li class="cms-submenu-item cms-submenu-child" :class='isChildActive(son) ? "active" : ""' v-for="(son,index2) in child.children" :key="index2" :data-path='son.path' @click="showSecondMenu(son,true,false)" v-if="!son.isHidden">
                        <router-link :to="son.path" :target='son.isBlank?"_blank":""'>{{son.name}}</router-link>
                      </li>
                    </ul>
                  </el-collapse-transition>
                </div>
                <li class="cms-submenu-item" v-else :class='currentSecondPath === child.path ? "active" : ""' :key="index" :data-path='child.path' @click="showSecondMenu(child,false,false)">
                  <router-link :to="child.path" :target='child.isBlank?"_blank":""'>{{child.name}}</router-link>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </div>

</template>

<script>
// bug 点击一级导航二三级导航状态会被清空 2-08
import routesInfo from '../router/routeMap'

export default {
  data() {
    return {
      menuInfo: routesInfo,
      activeArray: [],
      currentFirstPath: '', // 展开时点击保留的路径
      hoverFirstpath: '',
      currentSecondPath: '',
      currentChildPath: '',
      isRoot: false
    }
  },
  computed: {
    collapse() {
      return this.$store.state.sideBar.collapse
    }
  },
  methods: {
    toggleSideBar(status) {
      this.$store.dispatch('toggleSideBar', status)
    },
    /**
     * @description 点击展开第一级的方法
     *
     * @param {object} item 当前点击路由对象
     */
    showFirstMenu(item, state) {
      this.currentSecondPath = '' // 清空之前的选中
      this.currentChildPath = '' // 清空之前的选中
      this.currentFirstPath = item.path // 获取到一级点击的路径
      if (!item.isParent && item.children && item.children.length > 0) {
        // 判断有无子节点
        this.toggleSideBar(state)
      } else {
        this.toggleSideBar(state)
      }
    },
    hoverFirstMenu(e, item, state) {
      if (state) {
        e.target.className = 'cms-menu-name no-arrow'
      } else if (item.path === this.currentFirstPath) {
        e.target.className = 'cms-menu-name active no-arrow'
      } else {
        e.target.className = 'cms-menu-name'
      }
      this.hoverFirstpath = item.path // 获取到一级滑动的路径
      this.showFirstMenu(item, false)
    },
    hoverSecondMenu(e, item, state) {
      if (!state) {
        this.hoverFirstpath = ''
      }
    },
    setActive(e, item, state) {
      // 控制显示样式
      if (state) {
        if (item.path === this.currentFirstPath) {
          e.target.className = 'cms-menu-name  active'
        } else {
          e.target.className = 'cms-menu-name  no-arrow'
        }
      } else if (item.path === this.currentFirstPath) {
        e.target.className = 'cms-menu-name active'
      } else {
        e.target.className = 'cms-menu-name'
      }
    },
    /**
     * @description 点击展开第二级的方法
     *
     * @param {object} item 当前点击路由对象
     * @param {Boolean} isChild 判断是否是第三级
     * @param {Boolean} state 判断当前是否为收缩状态
     */
    showSecondMenu(item, isChild, state) {
      this.toggleSideBar(state)
      if (!isChild) {
        this.currentChildPath = '' // 关闭上层展开的选项
      }
      this.currentSecondPath = item.path // 获取到二级点击的路径
    },
    showChildMenu(item) {
      if (item.path === this.currentChildPath) {
        // 判断是否已经点击过，点击过就收缩回去
        this.currentChildPath = ''
      } else {
        this.currentChildPath = item.path // 获取到有子节点的点击路径
      }
    },
    isChildActive(son) {
      return (
        this.currentSecondPath === son.path ||
        this.currentSecondPath.indexOf(son.path) > -1
      )
    },
    setActiveLink(matched) {
      // matched 当前路径选中的数组,逻辑有疑问,这个地方要修改过
      const len = matched.length
      this.currentSecondPath = matched[len - 1].path
      if (len === 2) {
        if (matched[len - 2].path === '') {
          this.currentFirstPath = '/'
        } else {
          this.currentFirstPath = matched[len - 2].path
        }
      }
      if (len > 2) {
        this.currentChildPath = matched[len - 2].path
        this.currentFirstPath = matched[len - 3].path
      }
    }
  },
  created() {
    this.setActiveLink(this.$route.matched)
  },
  watch: {
    $route() {
      this.setActiveLink(this.$route.matched)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
