<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <template   v-for="tag in Array.from(visitedViews)"  > 
          <router-link ref='tag' class="tags-view-item" :class="tag.path==='/index'?'tags-view-index':''" 
              :key="tag.path"
              :to="tag.path" 
              @contextmenu.prevent.native="openMenu(tag,$event)"
              v-if="!isActive(tag)"
            >       
              <span class="tag-view-name" > {{tag.title}}</span>
              <span class='iconfont icon-cha' @click.prevent.stop='closeSelectedTag(tag)' v-if="tag.path!=='/index'" ></span>
            </router-link>
            <a ref='tag' class="tags-view-item active" :class="tag.path==='/index'?'tags-view-index':''" 
              :key="tag.path"
              href="javascript:void(0)"
              @contextmenu.prevent="openMenu(tag,$event)"
              v-else
            >       
              <span class="tag-view-name" > {{tag.title}}</span>
              <span class='iconfont icon-cha' @click.prevent.stop='closeSelectedTag(tag)' v-if="tag.path!=='/index'" ></span>
            </a>
    </template>  
   </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)" v-if="indexVisible">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags"  v-if="indexVisible">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      indexVisible: true,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        window.addEventListener('click', this.closeMenu)
      } else {
        window.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return this.$route.path.indexOf(route.path) > -1 || route.title === this.$route.name
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu(tag, e) {
      if (tag.path === '/index') {
        this.indexVisible = false
      } else {
        this.indexVisible = true
      }
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  .tags-view-wrapper {
    background: #f7f7f7;
    height: 42px;
    border-bottom: 1px solid #e0e0e0;
    z-index:2;
    // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 37px;
      line-height: 37px;
      border: 1px solid #e0e0e0;
      border-bottom: none;
      color: #444444;
      background: #f0f0f0;
      font-size: 14px;
      margin-left: 2px;
      margin-top: 4px;
       z-index: 3;
        .icon-cha{
          width: 16px;
          height: 16px;
          font-size: 12px;
          margin-right: 8px;
          text-align:center;
          &:hover{
            background-color: #fe5331;
        border-radius: 2px;
        color: #fff;  
          }
        }
       .tag-view-name{
         padding-left: 16px;
         padding-right: 8px; 
       }
      &:first-of-type {
        margin-left: 16px;
      }
      &.active {
        background-color: #ffffff;
        color: #444;
        border-color: #e0e0e0;
        border-bottom: 1px solid #fff;
        &::before {
          position: absolute;
          content: '';
           background: #fff;
          bottom: -2px;
            left: 0;
           width: 100%;
           height: 1px;
           display: inline-block;
        }
       
      }
    }
    .tags-view-index{
       width: 81px;
        text-align:center;
       .tag-view-name{
         padding-left: 0px;
         padding-right: 0px; 
        &::before {
          position: absolute;
          content: '';
           background: #fff;
          bottom: -2px;
          left: 0;
           width: 100%;
           height: 1px;
           display: inline-block;
        }
       }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
        
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      text-align: center;
      transition: all .15s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
       vertical-align: 1px;
      margin-right:8px;
      &:before {
        transform: scale(.75);
        display: inline-block;
        vertical-align: -1px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
