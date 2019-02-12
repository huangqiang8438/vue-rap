<template>
  <!-- 导航树 -->
      <div class="cms-zone-tree">
        <div class="tree-header">
          <span class="pic-dir">
            <i class="iconfont icon-tupian3"></i> 图片目录</span>
          <span class="new-fold" @click="addNodes">
            <i class="iconfont icon-xinjianwenjianjia"></i> 新建文件夹</span>
        </div>
        <div class="tree-body">
          <ul id="treeDemo" class="ztree" ref="treeDemo"></ul>
        </div>
      </div>

</template>

<script>
const $ = require('jquery')
// import './static/js/jquery.ztree.all.min'
import './../../../../static/js/jquery.ztree.all.min'
export default {
  data() {
    return {
      treeObj: null,
      setting: {
        callback: {
          onClick: this.getCheckNode,
          onRename: this.editNodeName
        }
      },
      checkNodes: {}, // 当前点击的文件夹
      zNodes: [
        {
          name: '全部图片',
          open: true,
          children: [
            { name: '图片' },
            {
              name: '宝贝图片',
              children: [
                { name: '叶子节点111' },
                { name: '叶子节点112' },
                { name: '叶子节点113' },
                { name: '叶子节点114' }
              ]
            },
            { name: '客服图片' },
            {
              name: '店铺装修',
              children: [
                { name: '店铺装修1' },
                { name: '店铺装修2' },
                { name: '店铺装修3' },
                { name: '店铺装修4' }
              ]
            },
            { name: '淘盘宝贝发布' },
            { name: '超级商品手机详情勿删' }
          ]
        }
      ]
    }
  },
  methods: {
    ceatedTreeNode() { // 创建图片空间文件树
      this.$nextTick(function() {
        this.treeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes)
      })
    },
    getCheckNode(e, treeId, treeNode) { // 获取到当前点击的文件夹
      this.checkNodes = treeNode // 保存当前点击的节点
    },
    addNodes() { // 添加文件夹节点
      const newNode = {
        name: '新建文件夹',
        parentId: 2,
        isAdd: true
      }
      const returnObj = this.treeObj.addNodes(this.checkNodes, newNode)
      this.treeObj.editName(returnObj[0])
    },
    editNodeName(e, treeId, treeNode, isCancel) { // 修改文件夹名称，这里做判断区分添加还是修改
      treeNode.id = 1223
    }
  },
  created() {
    this.ceatedTreeNode()
  }
}
</script>

<style scoped lang='scss'>
.cms-zone-tree {
  width: 220px;
   border-right: 1px solid #f0f0f0;
   float: left;
}
.tree-body {
  height: 560px;
  overflow: auto;
 
}
.tree-header {
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .pic-dir {
    float: left;
    font-size: 12px;
    i {
      font-size: 20px;
      color: #00da38;
      position: relative;
      top: 3px;
    }
  }
  .new-fold {
    float: right;
    font-size: 12px;
    cursor: pointer;
    i {
      font-size: 20px;
      position: relative;
      top: 3px;
    }
  }
}
</style>
