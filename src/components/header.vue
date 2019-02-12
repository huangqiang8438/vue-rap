<template>
  <header class="cms-header" :style="{ backgroundColor:color}">
      <!-- 左侧 -->
    <div class="cms-header-left">
       <div class="logo">
          <img src="../assets/images/logo.png" alt="logo">
       </div> 
       <span class="cms-toggle-button" @click="toggleSideBar" title="收缩／展开">
         <i class="iconfont" 
            :class="status?'icon-zhankai-copy':'icon-zhankai'"></i></span> 
    </div>
     <!--右侧-->
     <div class="cms-header-right" >
        <ul class="cms-nav clearfix">
          <li class="cms-nav-item flex-center toggleInfo"  >
             <span class="iconfont icon-morentouxiang toggleInfo"></span>
              <span class="toggleInfo">您好,&nbsp;</span>
              <span class="user-name toggleInfo">admin <i class="triangle-bottom toggleInfo" :class="infoState?'rotate180':''"></i></span> 
              <!-- 展开框 -->
               <transition name="el-zoom-in-top">
                    <section class="user-info-wraper" v-show="infoState">
                        <div class="user-info-title flex-center">
                          <i class="iconfont icon-chakantiezishijian"></i>
                          <span class="title-font">最后登录</span> 
                        </div>
                        <div class="user-info-content">
                          <p style="color:#444">2018-02-22 10:10:22</p>
                          <p style="color:#999">IP: 117.40.92.20</p>
                        </div>
                          <div class="user-info-footer">
                            <i class="iconfont icon-yonghutouxiang"></i>
                            <span>修改个人信息</span>
                        </div>
                    </section>
               </transition>
          </li>
		  <li class="cms-nav-item" @click="back()">
            <span>返回资源库</span>
          </li>
          <!--<li class="cms-nav-item">
            <span>系统消息</span>
            <el-badge class="cms-header-mark" :value="100"  :max="99"/>
          </li>-->
          <li class="cms-nav-item">
             <span>界面颜色</span>
             <theme-picker></theme-picker>     
          </li>
          <!--<li class="cms-nav-item"><span>商城首页</span></li>
          <li class="cms-nav-item"> <span>退出系统</span></li>-->
        </ul>
     </div>
       
  </header>
</template>

<script>
import themePicker from './ThemePicker'
export default {
  components: {
    themePicker
  },
  data() {
    return {
      infoState: false // 登陆信息显示状态
    }
  },
  computed: {
    status() {
      return this.$store.state.sideBar.collapse
    },
    color: {
      get() {
        return this.$store.state.system.color
      },
      set() {
      }
    }
  },
  methods: {
    back() {
      localStorage.removeItem('docItemsData')
      localStorage.removeItem('apiId')
      this.$routerLink('/index')
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar', !this.status)
      this.$store.dispatch('toggleAuto', this.status)
    }

  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (e.target.className.indexOf('toggleInfo') >= 0) {
        this.infoState = !this.infoState
      } else {
        this.infoState = false
      }
    })
  }
}
</script>


