<template>
  <div class="api-table-warpper">
    <div class="api-table-toolbar">
      <span class="title">{{title}}参数</span>
      <!-- 工具条 -->
      <div class="box">
        <el-button-group>
          <el-button v-show="opterStatus" type="info" icon="" size="small" @click="addDataItem(-1,-1)">新建</el-button>
          <el-button v-show="opterStatus" type="info" size="small" @click="exportVisible=true">导入</el-button>
          <el-button :type="previewStatus?'primary':'info'" size="small" @click="preview">预览</el-button>
        </el-button-group>
      </div>
    </div>
    <!-- 表格 -->
    <table class="api-list-table">
      <tr>
        <th v-show="opterStatus"></th>
        <th v-if="excludeProps.indexOf('name') === -1" >名称 </th>
        <th v-if="excludeProps.indexOf('type') === -1">类型</th>
         <th v-if="(opterStatus&&excludeProps.indexOf('len') === -1)">长度</th>
        <th v-if="excludeProps.indexOf('isRequired') === -1" >必填</th>
        <th v-if="excludeProps.indexOf('rule') === -1">生成规则</th>
        <th v-if="excludeProps.indexOf('value') === -1">初始值</th>
        <th v-if="excludeProps.indexOf('description') === -1">说明</th>
      </tr>
      <tr :class="[opterStatus ?'':'data-tr']" v-for="(item,index) in dataItems" :key="index" >
        <td v-show="opterStatus" class="tool">
          <span class="el-icon-delete" title="删除" @click="deleteDataItem(item,index)"></span>
          <span class="el-icon-plus" title="添加" @click="addDataItem(item.id,index,item.level)" v-if="((item.type==='Object')||(item.type==='Array'))"></span>
        </td>
        <td class="name"  v-if="excludeProps.indexOf('name') === -1">
          <div :style="{paddingLeft:item.level*16+'px'}" class="name-warper">
            <span class="child-tag" v-if="item.level>0">∟</span>
            <input v-if="opterStatus" v-model="item.name" class="no-border-textarea" @blur='clearStyle'   @focus="getEvent($event)">
            <div class="view-box" v-else>{{item.name}}</div>
          </div>
        </td>
        <td class="select"  v-if="excludeProps.indexOf('type') === -1">
          <el-select v-if="opterStatus" v-model="item.type" @blur='clearStyle'  @focus="getEvent($event)">
            <el-option :label="item" :value="item" v-for="(item , index) in dataTypes" :key="index"></el-option>
          </el-select>
          <div class="view-box" v-else>{{item.type}}{{(item.len == null||item.len =='')?'':'('+item.len+')'}}</div>
        </td>
       <td class="select"  v-if="(opterStatus&&excludeProps.indexOf('len') === -1)">
         <input v-if="opterStatus" v-model="item.len" class="no-border-textarea" @blur='clearStyle'   @focus="getEvent($event)">
          <div class="view-box" v-else>{{item.len}}</div>
        </td>
        <td class="required" v-if="excludeProps.indexOf('isRequired') === -1">
          <cms-switch v-if="opterStatus" v-model="item.isRequired"></cms-switch>
          <div class="view-box" v-else :class="[item.isRequired ? 'green':'']">{{item.isRequired?'是':'否'}}</div>
        </td>
        <td class="rule" v-if="excludeProps.indexOf('rule') === -1">
          <input v-if="opterStatus" v-model="item.rule" class="no-border-textarea" @blur='clearStyle'  @focus="getEvent($event)">
          <div class="view-box" v-else>{{item.rule}}</div>
        </td>
        <td class="value" v-if="excludeProps.indexOf('value') === -1">
          <textarea v-if="opterStatus" v-model="item.value" class="no-border-textarea" @input='autoHeight($event)'  @blur='clearStyle' @focus="getEvent($event)"></textarea>
          <div class="view-box" v-else>{{item.value}}</div>
        </td>
        <td class="desc" v-if="excludeProps.indexOf('description') === -1">
          <textarea v-if="opterStatus" v-model="item.description" class="no-border-textarea" @input='autoHeight($event)'  @blur='clearStyle' @focus="getEvent($event)"></textarea>
          <div class="view-box" v-else>{{item.description}}</div>
        </td>
      </tr>
    </table>
    <!-- 请求模板 -->
    <el-row :gutter="20" v-show="previewStatus">
      <el-col :span="12" class="result-template">
        <p>{{title}}模板
           <span title="复制到剪贴板" 
                 style="margin-left:5px; font-size:12px;"
                  @click.stop="onCopy(dataItemsObject)"
                class="fa fa-clipboard"></span>   
        </p>
        <pre class="api-table-view">{{dataItemsObject}}</pre>
      </el-col>
      <el-col :span="12" class="result-template">
        <p>{{title}}数据 
          <span title="复制到剪贴板" 
                 style="margin-left:5px; font-size:12px;"
                  @click.stop="onCopy(MockData)"
                class="fa fa-clipboard"></span>  
           </p>
        <pre class="api-table-view">{{MockData}}</pre>
      </el-col>
    </el-row>
    <!-- 导入弹窗 -->
    <el-dialog :title="'导入'+title+'数据'" :visible="exportVisible" :before-close="restCode" :close-on-click-modal='false'>
      <codemirror ref="myCm" v-model="code" :options='cmOption' class="code" @focus="onCodeFocus"></codemirror>
      <div class="data-error" v-if="dataError"> {{dataErrorInfo}}</div>
      <div slot="footer" style=" width:100%;text-align:center">
        <cms-button type="success" @click="setExportData">确定</cms-button>
        <cms-button type="rest" @click="restCode">取消</cms-button>
      </div>
    </el-dialog>
    <!--新建弹窗 -->
    <el-dialog title="新增属性" :visible="addVisible" :before-close="closeAddForm" :close-on-click-modal='true' width='700px'>
      <el-form :model='formData' label-width="160px" ref="addForm">
        <el-form-item v-if="excludeProps.indexOf('name') === -1" label="名称" prop="name" :rules="[{ required: true, message:'名称必填', trigger: 'blur' }]">
          <el-input v-model="formData.name" @keyup.enter.native='saveDataItem ' ref="name"></el-input>
        </el-form-item>
        <el-form-item v-if="excludeProps.indexOf('type') === -1" label="类型" prop="type">
          <el-select v-model="formData.type">
            <el-option :label="item" :value="item" v-for="(item , index) in dataTypes" :key="index"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item v-if="excludeProps.indexOf('len') === -1" label="长度" prop="len">
            <el-input v-model.number="formData.len" @keyup.enter.native='saveDataItem' ></el-input>
        </el-form-item>
        <el-form-item v-if="excludeProps.indexOf('isRequired') === -1" label="必填" prop="isRequired">
            <cms-switch v-if="opterStatus" v-model="formData.isRequired"></cms-switch>
        </el-form-item>
        <el-form-item v-if="excludeProps.indexOf('rule') === -1" label="生成规则" prop="rule">
          <el-input v-model="formData.rule" auto-complete="off" @keyup.enter.native='saveDataItem'></el-input>
        </el-form-item>
        <el-form-item v-if="excludeProps.indexOf('value') === -1" label="初始值" prop="value">
          <el-input v-model="formData.value" auto-complete="off" @keyup.enter.native='saveDataItem'></el-input>
        </el-form-item>
        <el-form-item v-if="excludeProps.indexOf('description') === -1" label="说明" prop="description">
          <el-input v-model="formData.description" auto-complete="off" type="textarea" :rows='4' @keyup.enter.native='saveDataItem'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style=" width:100%;text-align:center">
        <cms-button type="success" @click="saveDataItem">新建</cms-button>
        <cms-button type="rest" @click="closeAddForm">取消</cms-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')
var Mock = require('mockjs')
// 将线性数据构造为对象数据
function createdDataObject(arr, pid) {
  var obj = {}

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].parentId === pid) {
      if (arr[i].type === 'Object') {
        arr[i].value = createdDataObject(arr, arr[i].id)
      } else if (arr[i].type === 'Array') {
        var val = createdDataObject(arr, arr[i].id)
        console.log(Object.keys(val).length)
        if (Object.keys(val).length > 0) {
          arr[i].value = [createdDataObject(arr, arr[i].id)]
        } else {
          arr[i].value = arr[i].value
        }
      }
      obj[
        arr[i].name +
          (arr[i].rule == null || arr[i].rule === '' ? '' : '|') +
          arr[i].rule
      ] =
        arr[i].value
    }
  }
  return obj
}
var defaultFormData = {
  id: '', // 模块id
  parentId: '', // 父层id
  scope: '', // 参数响应类型
  type: 'String', // 参数类型
  name: '', // 参数名称
  rule: '', // 参数规则
  len: '', // 长度
  value: '',
  level: 0, // 参数值
  description: '' // 参数说明
}
export default {
  components: {
    codemirror
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    type: {
      type: String,
      default: 'request'
    },
    opterStatus: {
      type: Boolean,
      default: false
    },
    excludeProps: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dataTypes: ['String', 'Number', 'Boolean', 'Object', 'Array', 'Function', 'File', 'RegExp'],
      previewStatus: false,
      addVisible: false, // 新建模态框
      autofocus: false,
      exportVisible: false, // 导入模态框
      dataError: false, // 错误信息提示
      dataErrorInfo: '',
      isChild: false, // 是否为子元素新建
      chooseIndex: -1, // 点击新建的索引项
      visible: true,
      code: '{}',
      dataItems: [],
      formData: Object.assign({}, defaultFormData),
      MockData: '',
      jsonList: [], // json导入列表
      count: 0, // 计数器
      cmOption: {
        tabSize: 4,
        lineNumbers: true,
        mode: 'text/javascript',
        smartIndent: true,
        autofocus: true
      }
    }
  },
  computed: {
    title() {
      return this.type === 'request' ? '请求' : '响应'
    },
    dataItemsObject() {
      const arr = []
      const copyItems = JSON.parse(JSON.stringify(this.dataItems))
      for (const i in copyItems) {
        arr.push(copyItems[i])
      }
      return createdDataObject(arr, -1)
    }
  },
  methods: {
    onCopy(data) {
      if (typeof data === 'object') {
        data = JSON.stringify(data)
      }
      this.$copyText(data).then((e) => {
        this.$successMessage('复制成功')
      }, (e) => {
        this.$errorMessage('复制失败')
      })
    },
    autoHeight(el) {
      el.target.style.height = 'auto'
      el.target.style.height = (el.target.scrollHeight - 28) + 'px'
    },
    clearStyle() { // 清除激活样式
      const selectItems = document.querySelectorAll('.api-list-table td')
      for (let i = 0; i < selectItems.length; i++) {
        selectItems[i].style = ''
      }
    },
    getEvent(el) { // 增加激活样式
      this.clearStyle()
      var parentNode = el.target.parentNode
      if (parentNode.tagName !== 'TD') {
        parentNode = el.target.offsetParent
        if (parentNode.tagName !== 'TD') {
          parentNode = parentNode.parentNode.parentNode
        }
      }
      parentNode.style.borderBottom = '1px solid ' + this.$store.state.system.color
    },
    onCodeFocus(e) {
      // 编辑器获取焦点事件
      this.dataError = false
    },
    setExportData() {
      // 格式化json数据字符串
      try {
        this.jsonList = [] // 初始化导入列表，防止追加啊
        const exportData = JSON.parse(this.code)
        if (this.$cms.validateObjcet(exportData) === 'Array') {
          this.dataErrorInfo = '不支持导入数组类型参数'
          this.dataError = true
        } else {
          this.dataItems = this.getDataItems(exportData, 0, -1) // 把导入数据转换为操作列表
          this.exportVisible = false
        }
      } catch (error) {
        this.dataErrorInfo = '导入参数不正确，请检查是否为json数据'
        this.dataError = true
      }
    },
    getDataItems(object, level, parentId) {
      // 必须是一个json 对象 ,默认层级 ,上级id
      const objType = this.$cms.validateObjcet(object)
      console.log(objType !== 'Object' || objType !== 'Array')
      if (objType !== 'Object') {
        this.jsonList.push({ 'level': level, 'name': 0, 'isRequired': false, 'scope': 'request',
          'type': objType, 'description': '', 'rule': '', 'id': this.count++, 'value': object })
      } else {
        for (const key in object) {
          const params = {}
          if (object.hasOwnProperty(key)) {
            params.level = level
            params.name = key
            params.isRequired = false
            params.scope = 'request'
            params.type = this.$cms.validateObjcet(object[key])
            params.description = ''
            params.rule = ''
            params.id = this.count++
            params.parentId = parentId
            if (params.type === 'Object') {
              params.value = ''
            } else if (params.type === 'Array') {
              if (this.$cms.validateObjcet(object[key][0]) === 'Object') {
                params.value = ''
              } else {
                params.value = object[key]
              }
            } else {
              params.value = object[key]
            }
            this.jsonList.push(params)
            if (this.$cms.validateObjcet(object[key]) === 'Object') {
              const i = level + 1
              this.getDataItems(object[key], i, params.id)
            }
            if (this.$cms.validateObjcet(object[key]) === 'Array') {
              const j = level + 1
              // && (this.$cms.validateObjcet(object[key][0]) === 'Object' || this.$cms.validateObjcet(object[key][0]) === 'Array')
              if (object[key].length > 0) {
                this.getDataItems(object[key][0], j, params.id)
              }
            }
          }
        }
      }
      return this.jsonList
    },
    addDataItem(parentId, index, level) {
      // 新增参数操作
      if (index < 0) {
        this.chooseIndex = -1
        this.formData.parentId = -1
        this.formData.level = 0
        this.isChild = false
      } else {
        this.chooseIndex = index
        this.formData.parentId = parentId
        this.formData.level = level + 1
        this.isChild = true // 当前点击的是增加子元素
      }
      setTimeout(() => {
        this.$refs['addForm'].clearValidate()
        this.$refs['name'].focus()
      }, 1)
      this.addVisible = true
    },
    saveDataItem() {
      // 添加判断当前打开的是否是添加子元素
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          this.formData.id = this.getOnlyId()
          if (this.isChild) {
            // 这里做修改
            this.dataItems.splice(this.chooseIndex + 1, 0, this.formData)
          } else {
            this.dataItems.push(this.formData)
          }
          this.formData = Object.assign({}, defaultFormData)
          this.addVisible = false
        } else {
          return false
        }
      })
    },
    deleteDataItem(item, index) {
      this.dataItems.splice(index, 1)
      const newArr = this.dataItems.filter(v => {
        return v.parentId !== item.id
      })
      this.dataItems = newArr
      console.log(newArr)
    },
    restCode() {
      // 清空导入
      this.code = '{ }'
      this.dataError = false
      this.exportVisible = false
    },
    closeAddForm(done) {
      // console.log(this.$refs['addForm'])
      this.$refs['addForm'].clearValidate()
      this.formData = Object.assign({}, defaultFormData)
      this.addVisible = false
    },
    preview() {
      this.previewStatus = !this.previewStatus
    },
    getOnlyId() {
      // 获取当前列表内唯一的id值
      var idArr = []
      var addArr = ''
      if (this.dataItems.length > 0) {
        this.dataItems.map(v => {
          idArr.push(v.id)
        })
        const sortArr = idArr.sort((a, b) => {
          return a - b
        })
        addArr = sortArr[sortArr.length - 1] + 1
      } else {
        addArr = 0
      }
      return addArr
    }
  },
  watch: {

    dataItems: {
      handler(curVal, oldVal) {
        this.$emit('change', this.dataItems)
        this.MockData = Mock.mock(this.dataItemsObject)
      },
      deep: true
    },
    data: {
      handler(curVal, oldVal) {
        this.dataItems = this.data
      },
      deep: true
    }
  },
  created() {
    this.dataItems = this.data
  }
}
</script>

<style lang="scss" scoped>
.data-error {
  margin-left: 30px;
  font-size: 12px;
  color: red;
  border-top: 1px solid #e0e0e0;
}

.el-icon-plus {
  float: right;
  margin-right: 8px;
}
.el-icon-delete {
  float: right;
  margin-right: 8px;
}
.tool {
  [class^="el-icon-"] {
    font-weight: bold;
    cursor: pointer;
    color: #777;
  }
}
.data-tr td span {
  padding: 0px 15px;
}
</style>

