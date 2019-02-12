<template>
  <div class="api-main-container">
    <section class="cms-list-query api-repository-header">
      <div class="fl">
        <label>仓库名称</label>
        <el-input v-model="queryParams.repositoryName" @keyup.enter.native='getRepositoryItems'></el-input>
        <cms-button size="small" @click="getRepositoryItems">查询</cms-button>
      </div>
      <cms-button size="small" type='success' class="fr" @click="showAaddItems">新增仓库</cms-button>
    </section>
    <!-- 添加修改操作 -->
    <el-dialog :title="title" :visible.sync="visible" width="50%" :before-close="handleClose" :close-on-click-modal='false'>
      <el-form :model='formData' label-width="180px" ref="form">
        <el-form-item label="名称" prop="repositoryName" :rules="[{ required: true, message:'名称必填', trigger: 'blur' }]">
          <el-input v-model="formData.repositoryName" auto-complete="off" ref='name'></el-input>
        </el-form-item>
        <el-form-item label="访问路径" prop="requestUrl" :rules="[{ required: true, message:'访问路径必填', trigger: 'blur' },
        { type:'url',message:'请输入正确的url地址',trigger:'blur'}]">
          <el-input v-model="formData.requestUrl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="formData.remak" auto-complete="off" type="textarea" :rows="6"></el-input>
        </el-form-item>
        <el-form-item label="Headers信息头" class="headers">
          <el-row v-for="(item,index) in headers " :key="index">
            <el-col :span="6">
              <el-input v-model="item.name" auto-complete="off" ref='headerName'></el-input>
            </el-col>
            <el-col :span="15" class="interval-block">
              <el-input v-model="item.description" auto-complete="off" ref='description'></el-input>
            </el-col>
            <el-col :span="2" class="interval-block">
              <span title="新增" v-if="(headers.length -1) === index " @click="addHeader">
                <i class="el-icon-plus"></i>
              </span>
              <span title="删除" v-else>
                <i class="el-icon-delete" @click="delHeader(index)"></i>
              </span>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" style=" width:100%;text-align:center">
        <cms-button type="success" @click="addRepository" v-if="title==='添加新仓库'">提交</cms-button>
        <cms-button type="success" @click="editRepository" v-if="title==='修改仓库信息'">修改</cms-button>
        <cms-button type="rest" @click="restRepository">取消</cms-button>
      </div>
    </el-dialog>
    <!-- 异常处理操作 -->
    <el-dialog :visible.sync="ErrorVisible" :width="fullscreen?'100%':'90%'" :fullscreen="fullscreen" :before-close="errorClose" :close-on-click-modal='false'>
      <div slot="title">{{repositoryName}}::错误代码列表
        <span v-if="fullscreen" title="缩小" class="header-tool-mix" @click="narrowscreen">
          <i class="el-icon-minus"></i>
        </span>
        <span v-else title="全屏" class="header-tool-plus" @click="funllscreen">
          <i class="el-icon-plus"></i>
        </span>
      </div>
      <div style="padding:12px 20px;max-height:500px;overflow:auto">
        <table class="api-list-table">
          <tr>
            <th>code</th>
            <th style="text-align:center">公共
              <el-tooltip class="item" effect="dark" content="标注为公共的错误码，表示每个接口中都有可能出现，推荐接入端在全局中处理" placement="right">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </th>
            <th>说明</th>
            <th>解决途径
              <el-tooltip class="item" effect="dark" content="针对不同的返回结果，可尝试使用提供的处理方式进行解决，但不保证一定能解决" placement="right">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in errorList" :key="index">
            <td class="list-code">
              <textarea v-if="item.isEdit" v-model="item.errorCode" class="no-border-textarea" @input='autoHeight($event)' :id="'inputs'+index" @blur='clearStyle' @focus="getEvent($event)"></textarea>
              <div class="view-box" v-else>{{item.errorCode}}</div>
            </td>
            <td class="list-public">
              <cms-switch v-if="item.isEdit" v-model="item.isCommon" style="margin:7px 0 0 0;"></cms-switch>
              <div class="view-box" v-else  :class="[item.isCommon ? 'green':'']">{{item.isCommon?'是':'否'}}</div>
            </td>
            <td class="list-desc">
              <textarea v-if="item.isEdit" v-model="item.errorDescription" class="no-border-textarea" @input='autoHeight($event)' @blur='clearStyle' @focus="getEvent($event)"></textarea>
              <div class="view-box" v-else>{{item.errorDescription}}</div>
            </td>
            <td class="list-method">
              <textarea v-if="item.isEdit" v-model="item.errorSolution" class="no-border-textarea" @input='autoHeight($event)' @blur='clearStyle' @focus="getEvent($event)"></textarea>
              <div class="view-box" v-else>{{item.errorSolution}}</div>
            </td>
            <td class="operation">
              <el-button type="text" v-if="!item.isEdit" @click="editErrorCode(item,index)">编辑</el-button>
              <el-button type="text" v-else @click="saveErrorCode(item,index)">保存</el-button>
              <el-button type="text" v-if="item.isEdit && item.id && item.id != ''" @click="cancleErrorCode(item,index)">取消</el-button>
              <el-button type="text" @click="deleteErrorCode(item,index)">删除</el-button>
            </td>
          </tr>
        </table>
      </div>
      <div slot="footer" style=" width:100%;text-align:center">
        <cms-button type="success" @click="addErrorCode">新增</cms-button>
        <cms-button type="rest" @click="errorClose">取消</cms-button>
      </div>
    </el-dialog>
    <div style="padding:15px 0;">
      <!-- 仓库卡片 -->
      <el-row :gutter="20">
        <el-col style="margin-bottom:15px;" :xs="24" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in repositoryItems" :key="index">
          <div class="repository-card-wrapper">
            <div class="repository-card-header">
              <div class="fl">
                <i class="el-icon-document"></i>
                <span class="name" @click="view({repositoryId:item.id,name:item.repositoryName})">{{item.repositoryName }}</span>
              </div>
              <div class="fr repository-card-toolbar">
                <span title="设置" class="el-icon-setting icon" @click="setErrorCode(item)"></span>
                <span title="修改" class="el-icon-edit icon" @click="getRepository(item)"></span>
                <span title="删除" class="el-icon-delete icon" @click="deleteRepository(item)"></span>
              </div>
            </div>
            <div class="repository-card-body">
              <!-- 文档简介 -->
              {{item.remak}}
            </div>
            <div class="repository-card-footer">
              <div class="fl">
                <i class="iconfont icon-yonghuming"></i>
                <span>{{item.createUser}}</span>
              </div>
              <div class="fr">
                <span>{{$cms.getDateDiff(item.createTime,true)}}更新</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

const MockData = [{ 'createTime': 1528790347000, 'createUser': '', 'hasDeleted': false, 'headerParam': '[{"name":"JSPGOU-Auth-Token","description":"权限验证信息头，可从登陆成功之后返回信息中获取"}]', 'id': -8, 'remak': 'jspgou_b2b2c', 'repositoryName': 'jspgou_b2b2c-平台管理', 'requestUrl': 'http://192.168.0.200', 'updateTime': 1529912707000, 'updateUser': '' }, { 'createTime': 1528791064000, 'createUser': '', 'hasDeleted': false, 'headerParam': '', 'id': -7, 'remak': 'API文档管理系统', 'repositoryName': 'API文档管理系统', 'requestUrl': 'http://192.168.0.200', 'updateTime': null, 'updateUser': '' }, { 'createTime': 1529398089000, 'createUser': '', 'hasDeleted': false, 'headerParam': '[{"name":"JSPGOU-Auth-Token","description":"权限验证信息头，可从登陆成功之后返回信息中获取"}]', 'id': 2, 'remak': '', 'repositoryName': 'jspgou_b2b2c-PC端', 'requestUrl': 'http://127.0.0.1', 'updateTime': 1540281619000, 'updateUser': '' }, { 'createTime': 1529553698000, 'createUser': '', 'hasDeleted': false, 'headerParam': '', 'id': 12, 'remak': '', 'repositoryName': 'jspgou_b2b2c-商家管理', 'requestUrl': 'http://127.0.0.12', 'updateTime': 1529559688000, 'updateUser': '' }]
import {
  repositorySave,
  repositoryUpdate,
  repositoryDelete,
  errorCodeSave,
  errorCodeList,
  errorCodeUpdate,
  errorCodeDelete
} from './../api/api.js'
const defaultData = {
  repositoryName: '',
  remak: '',
  requestUrl: ''
}
export default {
  data() {
    return {
      visible: false, // 弹窗显隐
      ErrorVisible: false,
      title: '', // 操作类型名称
      queryParams: {
        // 查询参数
        repositoryName: ''
      },
      formData: {
        repositoryName: '',
        remak: '',
        requestUrl: '',
        headerParam: ''
      },
      repositoryItems: MockData,
      errorList: [
        {
          errorCode: '',
          errorDescription: '',
          errorSolution: '',
          repositoryId: '',
          isCommon: true,
          isEdit: false
        }
      ],
      errorView: false,
      repositoryId: '',
      repositoryName: '',
      fullscreen: false,
      headers: [{ name: '', description: '' }]
    }
  },
  methods: {
    view(obj) {
      localStorage.removeItem('docItemsData')
      localStorage.removeItem('apiId')
      this.$routerLink('/modules/list', 'list', obj)
    },
    getRepositoryItems() {
      // this.repositoryItems = res.data
      // 获取仓库列表
      // repositorList(this.queryParams).then(res => {
      //   if (res.code === 200) {
      //     console.log(JSON.stringify(res.data))
      //     // this.repositoryItems = res.data
      //   } else {
      //     this.$errorMessage('列表加载失败,错误代码:' + res.code)
      //   }
      // })
    },
    addHeader() {
      this.headers.push({ name: '', description: '' })
    },
    delHeader(index) {
      this.headers.splice(index, 1)
    },
    addRepository() {
      // 添加仓库
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formData.headerParam = JSON.stringify(this.headers)
          repositorySave(this.formData).then(res => {
            if (res.code === 200) {
              this.getRepositoryItems()
              this.$successMessage('添加成功')
            } else {
              this.$errorMessage('添加失败')
            }
            this.formData = Object.assign({}, defaultData)
            this.visible = false
          })
        } else {
          return false
        }
      })
    },
    showAaddItems() {
      this.formData = this.$cms.deepCopy(defaultData) // 用深拷贝,浅拷贝修改时会有问题
      this.headers = [{ name: '', description: '' }]
      setTimeout(() => {
        this.$refs['form'].clearValidate()
        this.$refs['name'].focus()
      }, 1)
      this.title = '添加新仓库'
      this.visible = true
    },
    getRepository(item) {
      // 修改显示
      setTimeout(() => {
        this.$refs['form'].clearValidate()
        this.$refs['name'].focus()
      }, 1)
      // 获取单个表单信息
      this.formData = Object.assign({}, item)
      this.headers =
        this.formData.headerParam !== ''
          ? JSON.parse(this.formData.headerParam)
          : [{ name: '', description: '' }]
      this.title = '修改仓库信息'
      setTimeout(() => {
        this.visible = true
      }, 10)
    },
    editRepository() {
      // 修改表单
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formData.headerParam = JSON.stringify(this.headers)
          repositoryUpdate(this.formData).then(res => {
            if (res.code === 200) {
              this.getRepositoryItems()
              this.$successMessage('修改成功')
            } else {
              this.$errorMessage('修改失败')
            }
            this.formData = Object.assign({}, defaultData)
            this.visible = false
          })
        } else {
          return false
        }
      })
    },
    deleteRepository(item) {
      this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          repositoryDelete([item.id]).then(res => {
            if (res.code === 200) {
              this.$successMessage('删除成功')
              this.getRepositoryItems()
            } else {
              this.$errorMessage('删除失败，错误代码:' + res.code)
            }
          })
        })
        .catch(() => {
          return false
        })
      // 删除仓库信息
    },
    getErrorList() {
      errorCodeList({ repositoryId: this.repositoryId }).then(res => {
        this.errorList = res.data
      })
    },
    setErrorCode(item) {
      this.fullscreen = false
      this.repositoryName = item.repositoryName
      this.repositoryId = item.id
      this.getErrorList()
      this.ErrorVisible = true
    },
    funllscreen() {
      this.fullscreen = true
    },
    narrowscreen() {
      this.fullscreen = false
    },
    addErrorCode() {
      this.errorView = true // 切换编辑状态
      const obj = {
        errorCode: '',
        errorDescription: '',
        errorSolution: '',
        repositoryId: this.repositoryId,
        isCommon: true,
        isEdit: true
      }
      this.errorList.push(obj)
    },
    editErrorCode(item, index) {
      item.isEdit = true
    },
    saveErrorCode(item, index) {
      if (item.id && item.id !== '') {
        errorCodeUpdate(item).then(res => {
          if (res.code === 200) {
            item.isEdit = false
            this.$successMessage('修改成功')
          } else {
            this.$errorMessage(res.message)
          }
        })
      } else {
        errorCodeSave(item).then(res => {
          if (res.code === 200) {
            item.isEdit = false
            this.$successMessage('添加成功')
            item.id = res.data
          } else {
            this.$errorMessage(res.message)
          }
        })
      }
    },
    cancleErrorCode(item, index) {
      item.isEdit = false
    },
    deleteErrorCode(item, index) {
      if (item.id && item.id !== '') {
        errorCodeDelete({ ids: [item.id] }).then(res => {
          if (res.code === 200) {
            this.errorList.splice(index, 1)
            this.$successMessage('删除成功')
          } else {
            this.$errorMessage(res.message)
          }
        })
      } else {
        this.errorList.splice(index, 1)
      }
    },
    errorClose() {
      this.ErrorVisible = false
    },
    restRepository() {
      // 重置表单
      this.visible = false
      this.formData = Object.assign({}, defaultData)
      this.$refs.form.resetFields()
    },
    autoHeight(el) {
      el.target.style.height = 'auto'
      el.target.style.height = el.target.scrollHeight - 28 + 'px'
    },
    clearStyle() {
      // 清除激活样式
      const selectItems = document.querySelectorAll('.api-list-table td')
      for (let i = 0; i < selectItems.length; i++) {
        selectItems[i].style = ''
      }
    },
    getEvent(el) {
      // 增加激活样式
      this.clearStyle()
      var parentNode = el.target.parentNode
      if (parentNode.tagName !== 'TD') {
        parentNode = el.target.offsetParent
        if (parentNode.tagName !== 'TD') {
          parentNode = parentNode.parentNode.parentNode
        }
      }
      parentNode.style.borderBottom =
        '1px solid ' + this.$store.state.system.color
    },
    handleClose(done) {
      // 关闭方法
      done()
    }
  },
  watch: {
    $route: () => {
      localStorage.removeItem('docItemsData')
      localStorage.removeItem('apiId')
    }
  },
  created() {
    this.getRepositoryItems()
  }
}
</script>

<style scoped lang='scss'>
.cms-layout .el-form-item__content > .el-input,
.cms-layout .el-form-item__content .el-textarea {
  width: 500px;
}
.api-repository-header {
  border-bottom: 1px solid #e1e4e8;
}
.list-code {
  width: 15%;
}
.list-desc {
  width: 30%;
}
.list-method {
  width: 30%;
}
.list-public {
  width: 10%;
  text-align: center;
  vertical-align: middle;
}
.operation {
  padding-left: 10px;
}
.operation button {
  padding: 10px 0px;
  margin-left: 5px;
}
.header-tool-plus {
  font-size: 20px;
  color: #909399;
  float: right;
  margin: 3px 23px 0px 0px;
}
.header-tool-mix {
  font-size: 20px;
  color: #909399;
  float: right;
  margin: 3px 23px 0px 0px;
}
.headers .interval-block span,
.header-tool-plus,
.header-tool-mix:hover {
  cursor: pointer;
}
.cms-main .el-dialog__wrapper .el-dialog {
  position: relative;
}
.cms-main .el-dialog .el-dialog__footer {
  position: absolute;
  bottom: 0;
}
.headers .el-row {
  width: 500px;
  margin-bottom: 5px;
  padding-bottom: 5px;
}
.headers .interval-block {
  margin-left: 10px;
}
</style>
