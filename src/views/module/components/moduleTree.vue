<template>
  <div>
    <div class="api-tree-inner">
      <h4>模块分类
        <i class="el-icon-refresh" @click="refrash" :class="[loading?'rotate':'']"></i>
      </h4>
      <el-input placeholder="请输入搜索关键词" v-model="filterText">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-tree ref='tree' class="modules-tree" :data="data" highlight-current :expand-on-click-node="false" :props="defaultProps" :filter-node-method="filterNode" node-key="id" :default-expanded-keys="defaultKeys" :current-node-key="[30]" :indent='10' 
    @node-click='getNodeInfo'>
      <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover="selcetNode(node)">
        <span class="tree-name" :title="node.label">{{ node.label }}</span>
        <span v-show="node.id===checkId">
          <i class="el-icon-plus" title="添加" @click.stop="showNodeInfo(node,data,'save')"></i>
          <i class="el-icon-edit-outline" title="修改" @click.stop="showNodeInfo(node,data,'edit')" v-if='data.id!=0'></i>
          <i class="el-icon-close" title="关闭" @click.stop="deleteNodeInfo(node,data)" v-if='data.id!=0'></i>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="checkTitle" :visible="nodeVisible" :append-to-body='true' width="600px" top="25vh" :before-close="handleClose" :close-on-click-modal='false'>
      <el-form :model='formData' label-width="100px" ref="form">
        <el-form-item label="名称" prop="name" :rules="[{ required: true, message:'名称必填', trigger: 'blur' }]">
          <el-input v-model="formData.name" auto-complete="off" ref='moduleName' @keyup.enter.native='createdNode(checkNodeData,checkStatus)'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style=" width:100%;text-align:center">
        <cms-button type="success" @click="createdNode(checkNodeData,checkStatus)">提交</cms-button>
        <cms-button type="rest" @click="handleClose">取消</cms-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  repositoryModuleSave,
  repositoryModuleUpdate,
  repositoryModuleDelete
} from './../../../api/api.js'
export default {
  props: {
    title: {
      default: '文档标题',
      type: String
    },
    id: {
      default: 0,
      type: [String, Number]
    }
  },
  data() {
    return {
      filterText: '', // 筛选值
      checkId: '', // 选中时的id
      nodeVisible: false, // 模态框的状态
      loading: false,
      data: [
        {
          moduleName: this.title,
          id: 0,
          childs: []
        }
      ],
      defaultProps: {
        children: 'childs',
        label: 'moduleName'
      },
      checkNodeData: {}, // 添加修改时选中的data对象
      checkStatus: 'save',
      formData: {
        // 添加修改的对象
        name: ''
      },
      localData: JSON.parse(localStorage.getItem('docItemsData'))
    }
  },
  computed: {
    defaultKeys() {
      const keys = [0]
      if (localStorage.getItem('docItemsData')) {
        const obj = JSON.parse(localStorage.getItem('docItemsData'))
        const moduleId = obj.moduleId
        keys.push(moduleId)
      }
      return keys
    },
    checkTitle() {
      return this.checkStatus === 'save' ? '添加模块' : '修改模块'
    }
  },
  methods: {
    refrash() {
      this.loading = true
      setTimeout(() => {
        this.getModuleTree()
      }, 200)
    },
    getModuleTree() {
      const data = [{ 'childs': [{ 'childs': [{ 'childs': [], 'id': 7, 'moduleName': '管理员', 'parentId': -6 }, { 'childs': [], 'id': 8, 'moduleName': '角色管理', 'parentId': -6 }, { 'childs': [], 'id': 9, 'moduleName': '菜单管理', 'parentId': -6 }, { 'childs': [], 'id': 10, 'moduleName': 'API管理', 'parentId': -6 }], 'id': -6, 'moduleName': '权限', 'parentId': -8 }, { 'childs': [], 'id': -5, 'moduleName': '广告', 'parentId': -8 }, { 'childs': [{ 'childs': [], 'id': 172, 'moduleName': '文章分类', 'parentId': -4 }, { 'childs': [], 'id': 173, 'moduleName': '文章管理', 'parentId': -4 }], 'id': -4, 'moduleName': '文章', 'parentId': -8 }, { 'childs': [{ 'childs': [], 'id': 11, 'moduleName': '商城设置', 'parentId': -3 }, { 'childs': [], 'id': 13, 'moduleName': '邮箱设置', 'parentId': -3 }, { 'childs': [], 'id': 14, 'moduleName': '短信设置', 'parentId': -3 }, { 'childs': [], 'id': 15, 'moduleName': '区域设置', 'parentId': -3 }, { 'childs': [], 'id': 16, 'moduleName': '支付插件', 'parentId': -3 }, { 'childs': [], 'id': 17, 'moduleName': '物流公司', 'parentId': -3 }, { 'childs': [], 'id': 18, 'moduleName': '友情链接', 'parentId': -3 }, { 'childs': [], 'id': 19, 'moduleName': '消息设置', 'parentId': -3 }, { 'childs': [], 'id': 24, 'moduleName': '第三方登陆', 'parentId': -3 }, { 'childs': [], 'id': 25, 'moduleName': '操作日志', 'parentId': -3 }, { 'childs': [{ 'childs': [], 'id': 57, 'moduleName': '字典数据列表', 'parentId': 54 }], 'id': 54, 'moduleName': '字典管理', 'parentId': -3 }, { 'childs': [], 'id': 72, 'moduleName': '定时任务', 'parentId': -3 }, { 'childs': [], 'id': 82, 'moduleName': 'FTP管理', 'parentId': -3 }, { 'childs': [], 'id': 194, 'moduleName': '运单模板', 'parentId': -3 }, { 'childs': [], 'id': 233, 'moduleName': '微信开放平台设置', 'parentId': -3 }, { 'childs': [], 'id': 252, 'moduleName': 'oss云储存配置', 'parentId': -3 }, { 'childs': [], 'id': 253, 'moduleName': '消费者保障服务', 'parentId': -3 }, { 'childs': [], 'id': 414, 'moduleName': '索引重置', 'parentId': -3 }], 'id': -3, 'moduleName': '设置', 'parentId': -8 }, { 'childs': [], 'id': -2, 'moduleName': '界面', 'parentId': -8 }, { 'childs': [{ 'childs': [{ 'childs': [], 'id': 144, 'moduleName': '发送', 'parentId': 143 }], 'id': 143, 'moduleName': '站内信', 'parentId': 142 }], 'id': 142, 'moduleName': '消息', 'parentId': -8 }, { 'childs': [], 'id': 732, 'moduleName': '平台接收消息', 'parentId': -8 }], 'id': -8, 'moduleName': '系统', 'parentId': 0 }, { 'childs': [{ 'childs': [{ 'childs': [], 'id': 26, 'moduleName': '商城会员', 'parentId': -1 }, { 'childs': [], 'id': 27, 'moduleName': '会员等级', 'parentId': -1 }, { 'childs': [], 'id': 28, 'moduleName': '增票资质', 'parentId': -1 }, { 'childs': [], 'id': 29, 'moduleName': '充值/提现申请', 'parentId': -1 }], 'id': -1, 'moduleName': '会员', 'parentId': -7 }, { 'childs': [{ 'childs': [], 'id': 38, 'moduleName': '商品管理', 'parentId': 1 }, { 'childs': [], 'id': 39, 'moduleName': '商品分类', 'parentId': 1 }, { 'childs': [{ 'childs': [], 'id': 64, 'moduleName': '规格属性列表', 'parentId': 40 }], 'id': 40, 'moduleName': '商品类型（模型）', 'parentId': 1 }, { 'childs': [], 'id': 41, 'moduleName': '品牌管理', 'parentId': 1 }, { 'childs': [], 'id': 42, 'moduleName': '商品标签', 'parentId': 1 }], 'id': 1, 'moduleName': '商品', 'parentId': -7 }, { 'childs': [], 'id': 2, 'moduleName': '订单', 'parentId': -7 }, { 'childs': [{ 'childs': [], 'id': 642, 'moduleName': '访问统计设置', 'parentId': 6 }, { 'childs': [], 'id': 652, 'moduleName': '商品分析', 'parentId': 6 }, { 'childs': [], 'id': 662, 'moduleName': '会员分析', 'parentId': 6 }, { 'childs': [], 'id': 672, 'moduleName': '平台概况', 'parentId': 6 }, { 'childs': [], 'id': 682, 'moduleName': '流量统计', 'parentId': 6 }, { 'childs': [], 'id': 692, 'moduleName': '店铺分析', 'parentId': 6 }, { 'childs': [], 'id': 693, 'moduleName': '交易分析', 'parentId': 6 }], 'id': 6, 'moduleName': '统计', 'parentId': -7 }, { 'childs': [{ 'childs': [{ 'childs': [], 'id': 182, 'moduleName': '店铺商品分类', 'parentId': 30 }], 'id': 30, 'moduleName': '店铺管理', 'parentId': 193 }, { 'childs': [], 'id': 31, 'moduleName': '店铺账户', 'parentId': 193 }, { 'childs': [], 'id': 32, 'moduleName': '店铺等级', 'parentId': 193 }, { 'childs': [], 'id': 33, 'moduleName': '自营店铺', 'parentId': 193 }, { 'childs': [], 'id': 34, 'moduleName': '店铺域名', 'parentId': 193 }, { 'childs': [], 'id': 35, 'moduleName': '店铺动态', 'parentId': 193 }, { 'childs': [], 'id': 36, 'moduleName': '店铺权益', 'parentId': 193 }, { 'childs': [], 'id': 37, 'moduleName': '店铺资源空间', 'parentId': 193 }], 'id': 193, 'moduleName': '店铺', 'parentId': -7 }], 'id': -7, 'moduleName': '商城', 'parentId': 0 }, { 'childs': [{ 'childs': [{ 'childs': [], 'id': 703, 'moduleName': '评价管理', 'parentId': 3 }], 'id': 3, 'moduleName': '客服', 'parentId': 4 }, { 'childs': [], 'id': 292, 'moduleName': '营销服务', 'parentId': 4 }, { 'childs': [], 'id': 293, 'moduleName': '营销活动', 'parentId': 4 }, { 'childs': [], 'id': 294, 'moduleName': '营销统计', 'parentId': 4 }, { 'childs': [], 'id': 295, 'moduleName': '优惠券', 'parentId': 4 }, { 'childs': [{ 'childs': [], 'id': 513, 'moduleName': '广告列表', 'parentId': 512 }], 'id': 512, 'moduleName': '广告版位', 'parentId': 4 }, { 'childs': [{ 'childs': [], 'id': 523, 'moduleName': '设置', 'parentId': 522 }], 'id': 522, 'moduleName': '首页设置', 'parentId': 4 }, { 'childs': [], 'id': 702, 'moduleName': '评价管理', 'parentId': 4 }, { 'childs': [], 'id': 722, 'moduleName': '意见反馈', 'parentId': 4 }, { 'childs': [], 'id': 723, 'moduleName': '投诉管理', 'parentId': 4 }, { 'childs': [], 'id': 742, 'moduleName': '购买咨询', 'parentId': 4 }], 'id': 4, 'moduleName': '运营', 'parentId': 0 }, { 'childs': [{ 'childs': [], 'id': 76, 'moduleName': '登录', 'parentId': 75 }, { 'childs': [], 'id': 77, 'moduleName': '上传', 'parentId': 75 }, { 'childs': [], 'id': 132, 'moduleName': '字典', 'parentId': 75 }, { 'childs': [], 'id': 152, 'moduleName': '用户权限列表', 'parentId': 75 }, { 'childs': [], 'id': 332, 'moduleName': '商城公用数据接口', 'parentId': 75 }], 'id': 75, 'moduleName': '公用', 'parentId': 0 }, { 'childs': [{ 'childs': [{ 'childs': [], 'id': 204, 'moduleName': '粉丝列表', 'parentId': 203 }, { 'childs': [], 'id': 213, 'moduleName': '定时群发', 'parentId': 203 }, { 'childs': [], 'id': 222, 'moduleName': '自动回复', 'parentId': 203 }, { 'childs': [], 'id': 223, 'moduleName': '公众号列表', 'parentId': 203 }, { 'childs': [], 'id': 224, 'moduleName': '素材管理', 'parentId': 203 }, { 'childs': [], 'id': 232, 'moduleName': '微信菜单管理', 'parentId': 203 }, { 'childs': [], 'id': 234, 'moduleName': '微信授权扫码页面', 'parentId': 203 }], 'id': 203, 'moduleName': '公众号', 'parentId': 202 }, { 'childs': [{ 'childs': [{ 'childs': [], 'id': 534, 'moduleName': '平台是否已经添加小程序 ', 'parentId': 533 }], 'id': 533, 'moduleName': '小程序设置', 'parentId': 532 }, { 'childs': [], 'id': 535, 'moduleName': '小程序代码管理', 'parentId': 532 }, { 'childs': [], 'id': 542, 'moduleName': '体验者管理', 'parentId': 532 }, { 'childs': [], 'id': 544, 'moduleName': '版本管理', 'parentId': 532 }], 'id': 532, 'moduleName': '小程序', 'parentId': 202 }], 'id': 202, 'moduleName': '微信', 'parentId': 0 }, { 'childs': [{ 'childs': [{ 'childs': [], 'id': 624, 'moduleName': '异常数据', 'parentId': 623 }], 'id': 623, 'moduleName': '商家结算', 'parentId': 622 }], 'id': 622, 'moduleName': '统计/结算', 'parentId': 0 }, { 'childs': [{ 'childs': [{ 'childs': [], 'id': 627, 'moduleName': '异常数据处理', 'parentId': 626 }], 'id': 626, 'moduleName': '商家结算', 'parentId': 625 }], 'id': 625, 'moduleName': '财务', 'parentId': 0 }, { 'childs': [], 'id': 733, 'moduleName': '控制台', 'parentId': 0 }]
      const root = this.data[0]
      root.childs = data
      this.data = [root]
      setTimeout(() => {
        if (this.localData) {
          this.$refs['tree'].setCurrentKey(this.localData.moduleId)
        }
      }, 50)
      this.loading = false
      // 动态数据
      // repositoryModuleTree({ repositoryId: this.id }).then(res => {
      //   const root = this.data[0]
      //   root.childs = data
      //   console.log(JSON.stringify(res.data))
      // })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.moduleName.indexOf(value) !== -1
    },
    selcetNode(node) {
      // 滑动时获取到当前节点
      this.checkId = node.id
    },
    getNodeInfo(obj, node, self) {
      // 点击节点获取的信息
      this.checkId = node.id
      this.$emit('change', obj)
    },
    showNodeInfo(node, data, status) {
      // 添加或者子节点 node为父节点参数 ,status save 添加 edit 修改
      setTimeout(() => {
        this.$refs['form'].clearValidate()
        this.$refs['moduleName'].focus()
      }, 1)
      this.nodeVisible = true
      this.checkStatus = status
      this.checkNodeData = data
      if (status === 'edit') {
        this.formData.name = data.moduleName
      }
    },
    createdNode(data, status) {
      // 构造和修改节点，此处发请求
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (status === 'save') {
            // 添加
            const params = {
              parentId: data.id,
              moduleName: this.formData.name,
              repositoryId: this.id
            }
            repositoryModuleSave(params).then(res => {
              if (res.code === 200) {
                this.$successMessage('新增成功')
                const newChild = {
                  id: res.data,
                  moduleName: params.moduleName,
                  childs: []
                }
                if (!data.childs) {
                  this.$set(data, 'childs', [])
                }
                data.childs.push(newChild)
              }
            })
          } else {
            // 修改
            const updateParams = {
              id: data.id,
              moduleName: this.formData.name
            }
            repositoryModuleUpdate(updateParams).then(res => {
              if (res.code === 200) {
                this.$successMessage('更新成功')
                data.moduleName = updateParams.moduleName
              }
            })
          }
          this.formData.name = '' // 置空
          this.nodeVisible = false
        } else {
          return false
        }
      })
    },
    deleteNodeInfo(node, data) {
      this.$confirm('是否删除该模块？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          repositoryModuleDelete({ ids: [data.id] }).then(res => {
            if (res.code === 200) {
              const parent = node.parent
              const children = parent.data.childs || parent.data
              const index = children.findIndex(d => d.id === data.id)
              children.splice(index, 1)
              this.$successMessage('删除成功')
            } else {
              this.$errorMessage('删除失败')
            }
          })
        })
        .catch(() => {
          return false
        })
    },
    handleClose(done) {
      this.formData.name = ''
      this.nodeVisible = false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getModuleTree()
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.api-tree-position {
}
.api-tree-inner {
  padding: 12px;
  h4 {
    text-align: center;
    margin-bottom: 12px;
    color: #353535;
  }
}
.modules-tree {
  height: 90%;
  overflow: auto;
  padding-left: 12px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding-right: 8px;
}
</style>
