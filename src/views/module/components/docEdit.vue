<template>
  <div v-loading='loading' ref='layout' id="layOut">
    <div class="cms-form-layout" >
      <div class="api-tag no-margin">
        <i class="iconfont icon-jibenxinxi"></i>
        基本信息
      </div>
      <el-row>
        <!-- 编辑模式显示api主体表单信息 -->
        <el-col :span="20" v-if="opterStatus">
          <el-form ref="form" :rules="rules" :model="formData" label-width="190px">
            <el-form-item label="API所属模块">
              {{formData.moduleName}}
            </el-form-item>
            <el-form-item label="API名称" prop="apiName">
              <el-input v-model="formData.apiName" class="media-input"></el-input>
            </el-form-item>
            <el-form-item label="API地址" prop="apiUrl">
              <el-input placeholder="请输入api地址" v-model="formData.apiUrl" class="input-with-select ">
                <el-select slot="prepend" v-model="formData.requestType" class="input-select" @change="changeIsGet">
                  <el-option :label="item.name" :value="item.id" v-for="(item , index) in requestTypes" :key="index"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="参数请求类型" prop="requestParamType">
              <el-radio-group v-model="formData.requestParamType">
                <el-radio :label="1" :disabled="!isGet">url-params</el-radio>
                <el-radio :label="2" :disabled="isGet">form-data</el-radio>
                <el-radio :label="3" :disabled="isGet">x-www-form-urlencoded</el-radio>
                <el-radio :label="4" :disabled="isGet">application/json</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否使用Header头信息" prop="isUseHeader">
              <cms-switch v-model="formData.isUseHeader"></cms-switch>
            </el-form-item>
            <el-form-item label="错误信息列表" prop="errorIds">
              <el-select v-model="formData.errorIds" multiple filterable placeholder="请选择" size="small" class="media-input">
                <el-option v-for="item in errorItems" :key="item.id" :label="item.errorCode" :value="item.id">
                  <span style="float: left">{{ item.errorCode }}:</span>
                  <span style="float: left; color: #8492a6;">{{ item.errorDescription }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用场景" prop="remark">
              <el-input v-model="formData.remark" type="textarea" :rows='5' class="media-input"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 预览模式显示api主体信息 -->
        <el-col v-else :span="20">
          <el-row class="preview">
            <el-col>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">{{formData.moduleName}}</el-breadcrumb-item>
                <el-breadcrumb-item>
                  <a href="/">{{formData.apiName}}</a>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col>
              <span>API地址：{{formData.apiUrl}}</span>
              <span title="复制到剪贴板" v-if="formData.apiUrl!==''" style="margin-left:5px; font-size:12px;" @click.stop="onCopy(formData.apiUrl)" class="fa fa-clipboard"></span>
            </el-col>
            <el-col>
              请求方式：
              <span v-for="(item , index) in requestTypes" :key="index">{{item.id == formData.requestType ? item.name:''}}</span>
            </el-col>
            <el-col>
              请求参数类型：
              <span v-for="(item , index) in requestParamTypes" :key="index">{{item.id == formData.requestParamType ? item.name:''}}</span>
            </el-col>
            <el-col v-if="opterStatus">
              是否启用headers信息：
              <span >{{formData.isUseHeader?'是':'否'}}</span>
            </el-col>
            <el-col>
              错误代码列表：
              <el-tag v-for="(item,index) in formData.errors" :key="index" style="margin-right:8px;" size="mini">
                {{item.errorCode}}
              </el-tag>
            </el-col>
            <el-col>
              使用场景：{{formData.remark}}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <el-button-group>
            <el-button type="primary" v-if="opterStatus" size="small" @click="saveForm()">保存</el-button>
            <el-button type="primary" v-else size="small" @click="edit()">编辑</el-button>
            <el-button type="info" v-if="(formData.id&&formData.id !=0 && opterStatus) " size="small" @click="edit()">取消</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <!-- header参数列表 -->
      <div class="api-table-warpper" v-if="!opterStatus&&formData.isUseHeader">
        <div class="api-table-toolbar">
          <span class="title">header参数</span>
        </div>
         <table class="api-list-table">
            <tr>
              <th>参数名</th>
              <th>说明</th>
            </tr>
            <tr v-for="(item,index) in formData.headerParams" :key="index">
              <td>
                 <div class="view-box" >{{item.name}}</div>
              </td>
              <td>
                 <div class="view-box" >{{item.description}}</div>
              </td>
            </tr>
         </table>
      </div>
      <!-- 请求参数 -->
      <data-table :opterStatus="opterStatus" :data="formData.request" @change="getRequest"></data-table>
      <!-- 响应参数 -->
      <data-table :excludeProps="['isRequired','len']" :opterStatus="opterStatus" type='response' @change="getResponse" :data="formData.response"></data-table>
    <!-- 错误代码列表-->
       <div class="api-table-warpper" v-if="!opterStatus&&formData.errors&&formData.errors.length>0">
        <div class="api-table-toolbar">
          <span class="title">错误参数列表</span>
        </div>
         <table class="api-list-table">
            <tr>
              <th>code</th>
              <th>说明</th>
               <th>解决途径</th>
            </tr>
            <tr v-for="(item,index) in formData.errors" :key="index">
              <td class='list-code'>
                 <div class="view-box" >{{item.errorCode}}</div>
              </td>
              <td>
                 <div class="view-box" >{{item.errorDescription}}</div>
              </td>
               <td>
                 <div class="view-box" >{{item.errorSolution}}</div>
              </td>
            </tr>
         </table>
      </div> 
    </div>
    <cms-top></cms-top>
  </div>
</template>
<script>
import rules from '@/rules'
import dataTable from './dataTable'
import {
  apiSave,
  apiUpdate,
  errorCodeList
} from './../../../api/api.js'
export default {
  components: {
    dataTable
  },
  props: {
    moduleInfo: {
      // 获取到模块的信息，给添加时附默认值
      default: function() {
        return {
          title: '',
          moduleId: 0
        }
      },
      type: Object
    },
    apiId: {
      // api列表的对象信息,给修改时附默认值
      default: 0,
      type: Number
    },
    value: {
      default: false,
      type: Boolean
    },
    repositoryId: {
      // 仓库id
      type: Number
    }
  },
  data() {
    return {
      opterStatus: false,
      loading: false,
      type: this.$route.query.type, // 表单操作类型
      id: this.$route.query.id, // 表单id
      requestTypes: [
        // 类型对象
        { id: 1, name: 'GET' },
        { id: 2, name: 'POST' },
        { id: 3, name: 'DELETE' },
        { id: 4, name: 'UPDATE' },
        { id: 5, name: 'PUT' }
      ],
      requestParamTypes: [
        { id: 1, name: 'url-params' },
        { id: 2, name: 'form-data' },
        { id: 3, name: 'x-www-form-urlencoded' },
        { id: 4, name: 'application/json' }
      ],
      rules: {
        apiName: [rules.required('api名称不能为空')],
        apiUrl: [rules.required('api地址不能为空')]
      },
      formData: {
        // 添加修改的对象,给后台传递这个对象
        moduleName: '',
        apiName: '',
        apiUrl: '',
        requestType: 1,
        requestParamType: 1, // 参数请求类型
        isUseHeader: true, // 头信息
        errorIds: [],
        remark: '',
        request: [],
        response: [],
        moduleId: ''
      },
      errorItems: [],
      isGet: true
    }
  },
  methods: {
    onCopy(data) {
      this.$copyText(data).then(
        e => {
          this.$successMessage('复制成功')
        },
        e => {
          this.$errorMessage('复制失败')
        }
      )
    },
    getDataInfo(id) {
      const data = { 'apiName': '会员详情', 'apiUrl': '/admin/platform/member/get', 'createTime': 1528885822000, 'createUser': '', 'errorIds': [], 'errors': [], 'hasDeleted': false, 'id': 118, 'isUseHeader': true, 'moduleId': 26, 'remark': '', 'repository': { 'headerParam': '[{"name":"JSPGOU-Auth-Token","description":"权限验证信息头，可从登陆成功之后返回信息中获取"}]', 'id': -8, 'repositoryName': 'jspgou_b2b2c-平台管理' }, 'repositoryId': -8, 'request': [{ 'isRequired': true, 'level': 0, 'scope': '', 'name': 'id', 'rule': '', 'description': '标识\n', 'id': 0, 'type': 'String', 'value': '', 'parentId': -1 }], 'requestParamType': 1, 'requestType': 1, 'response': [{ 'isRequired': false, 'level': 0, 'scope': 'request', 'name': 'code', 'description': '', 'rule': '', 'id': 376, 'type': 'String', 'value': '200', 'parentId': -1 }, { 'isRequired': false, 'level': 0, 'scope': 'request', 'name': 'data', 'description': '', 'rule': '', 'id': 377, 'type': 'Object', 'value': '', 'parentId': -1 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'email', 'description': '邮箱', 'rule': '', 'id': 380, 'type': 'String', 'value': 'user@qq.com', 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'enabled', 'description': '是否启用 0-禁用  1-启用', 'rule': '', 'id': 381, 'type': 'Boolean', 'value': false, 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'id', 'description': '标识', 'rule': '', 'id': 383, 'type': 'Number', 'value': 1, 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'lastLoginIp', 'description': '最后登录ip', 'rule': '', 'id': 384, 'type': 'String', 'value': '', 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'lastLoginTime', 'description': '最后登录时间', 'rule': '', 'id': 385, 'type': 'Number', 'value': '1521604674000', 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'lastPasswordChange', 'description': '密码最后被改变时间', 'rule': '', 'id': 386, 'type': 'Null', 'value': '1528960115000', 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'memberAccount', 'description': '会员账户', 'rule': '', 'id': 387, 'type': 'Null', 'value': null, 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'memberExt', 'description': '会员信息扩展', 'rule': '', 'id': 388, 'type': 'Object', 'value': '', 'parentId': 377 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'resourceData', 'rule': '', 'description': '头像资源\n', 'id': 413, 'type': 'Object', 'value': '', 'parentId': 388 }, { 'len': '', 'level': 3, 'scope': '', 'name': 'url', 'rule': '', 'description': '资源路径', 'id': 416, 'type': 'String', 'value': '', 'parentId': 413 }, { 'len': '', 'level': 3, 'scope': '', 'name': 'resourceType', 'rule': '', 'description': '文件类型(1图片 2视频 3音频 4word 5excel 6ppt 7压缩包 8其他)', 'id': 415, 'type': 'Number', 'value': '', 'parentId': 413 }, { 'len': '', 'level': 3, 'scope': '', 'name': 'id', 'rule': '', 'description': '标识id', 'id': 414, 'type': 'Number', 'value': '', 'parentId': 413 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'resourceDataId', 'rule': '', 'description': '头像资源id', 'id': 412, 'type': 'Number', 'value': '', 'parentId': 388 }, { 'isRequired': false, 'level': 2, 'scope': 'request', 'name': 'birthday', 'description': '会员生日', 'rule': '', 'id': 389, 'type': 'Number', 'value': '1528782876000', 'parentId': 388 }, { 'isRequired': false, 'level': 2, 'scope': 'request', 'name': 'gender', 'description': '性别', 'rule': '', 'id': 392, 'type': 'Number', 'value': 2, 'parentId': 388 }, { 'isRequired': false, 'level': 2, 'scope': 'request', 'name': 'id', 'description': '会员扩展信息标识', 'rule': '', 'id': 394, 'type': 'Number', 'value': 1, 'parentId': 388 }, { 'isRequired': false, 'level': 2, 'scope': 'request', 'name': 'username', 'description': '会员用户名', 'rule': '', 'id': 398, 'type': 'String', 'value': 'user', 'parentId': 388 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'memberId', 'description': '关联会员id', 'rule': '', 'id': 399, 'type': 'Number', 'value': 1, 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'memberLevel', 'description': '会员等级', 'rule': '', 'id': 400, 'type': 'Object', 'value': '', 'parentId': 377 }, { 'isRequired': false, 'level': 2, 'scope': 'request', 'name': 'levelName', 'description': '会员等级名称', 'rule': '', 'id': 401, 'type': 'String', 'value': '普通会员', 'parentId': 400 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'memberThirds', 'description': '第三方会员登录信息', 'rule': '', 'id': 402, 'type': 'Array', 'value': '[]', 'parentId': 377 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'username', 'rule': '', 'description': '会员用户名', 'id': 423, 'type': 'String', 'value': '', 'parentId': 402 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'thirdUsername', 'rule': '', 'description': '三方平台用户名', 'id': 422, 'type': 'String', 'value': '', 'parentId': 402 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'thirdTypeCode', 'rule': '', 'description': '第三方平台类型编号', 'id': 421, 'type': 'String', 'value': '', 'parentId': 402 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'thirdId', 'rule': '', 'description': '第三方平台返回唯一id', 'id': 420, 'type': 'String', 'value': '', 'parentId': 402 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'memberId', 'rule': '', 'description': '会员id', 'id': 419, 'type': 'String', 'value': '', 'parentId': 402 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'id', 'rule': '', 'description': '会员第三方信息id', 'id': 418, 'type': 'String', 'value': '', 'parentId': 402 }, { 'len': '', 'level': 2, 'scope': '', 'name': 'appId', 'rule': '', 'description': '第三方平台appid', 'id': 417, 'type': 'String', 'value': '', 'parentId': 402 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'phone', 'description': '手机号', 'rule': '', 'id': 403, 'type': 'String', 'value': '18379797979', 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'userSource', 'description': '登录类型', 'rule': '', 'id': 406, 'type': 'String', 'value': 'member', 'parentId': 377 }, { 'isRequired': false, 'level': 1, 'scope': 'request', 'name': 'username', 'description': '会员用户名', 'rule': '', 'id': 407, 'type': 'String', 'value': 'user', 'parentId': 377 }, { 'isRequired': false, 'level': 0, 'scope': 'request', 'name': 'message', 'description': '', 'rule': '', 'id': 408, 'type': 'String', 'value': '操作成功！', 'parentId': -1 }, { 'isRequired': false, 'level': 0, 'scope': 'request', 'name': 'redirectUrl', 'description': '', 'rule': '', 'id': 409, 'type': 'String', 'value': '', 'parentId': -1 }, { 'isRequired': false, 'level': 0, 'scope': 'request', 'name': 'requestUrl', 'description': '', 'rule': '', 'id': 410, 'type': 'String', 'value': '', 'parentId': -1 }, { 'isRequired': false, 'level': 0, 'scope': 'request', 'name': 'timestamp', 'description': '', 'rule': '', 'id': 411, 'type': 'Number', 'value': 1528885793297, 'parentId': -1 }], 'updateTime': 1533525881000, 'updateUser': '' }
      this.formData = Object.assign({}, data)
      this.formData.moduleName = this.moduleInfo.title
      if (data.repository.headerParam !== '') {
        this.formData.headerParams = JSON.parse(data.repository.headerParam)
      }
      this.changeIsGet()
      // if (id !== 0) {
      //   apiGet({ id: id }).then(res => {
      //     if (res.code === 200) {
      //       console.log(JSON.stringify(res.data))
      //       // this.formData = Object.assign({}, res.data)
      //       // this.formData.moduleName = this.moduleInfo.title
      //       // if (res.data.repository.headerParam !== '') {
      //       //   this.formData.headerParams = JSON.parse(res.data.repository.headerParam)
      //       // }
      //       this.changeIsGet()
      //     } else {
      //       this.$errorMessage('接口信息获取失败')
      //     }
      //   })
      // }
    },
    edit() {
      // 编辑状态切换
      if (!this.opterStatus && this.moduleInfo.moduleId === 0) {
        this.$errorMessage('请先选择API所属模块！')
        return false
      }
      this.opterStatus = !this.opterStatus
      this.$emit('input', this.opterStatus)
    },
    getRequest(req) {
      // 获取到响应的数据
      this.formData.request = req
    },
    getResponse(res) {
      // 获取到响应的数据
      this.formData.response = res
    },
    changeIsGet() {
      // 判断选择的请求是什么类型的参数
      const type = this.formData.requestType
      if (type === 1) {
        this.formData.requestParamType = 1
        this.isGet = true
      } else {
        if (this.formData.requestParamType === 1) {
          this.formData.requestParamType = 4
        }
        this.isGet = false
      }
    },
    getErrorList() { // 获取错误代码列表
      errorCodeList({ repositoryId: this.repositoryId, isCommon: false }).then(
        res => {
          this.errorItems = res.data
        }
      )
    },
    saveForm() {
      // 添加修改提交操作
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 参数处理下
          const params = this.$cms.deepCopy(this.formData)
          params.requestJson = JSON.stringify(params.request)
          params.responseJson = JSON.stringify(params.response)
          params.repositoryId = this.repositoryId
          if (this.apiId !== 0) {
            apiUpdate(params).then(res => {
              if (res.code === 200) {
                this.$successMessage('修改成功')
                this.getDataInfo(res.data)// 回调
                this.opterStatus = false
                this.$emit('onChange', params.moduleId)
                this.$emit('input', this.opterStatus)
              } else {
                this.$errorMessage('修改失败')
              }
            })
          } else {
            apiSave(params).then(res => {
              if (res.code === 200) {
                this.$successMessage('新增成功')
                this.getDataInfo(res.data)
                this.opterStatus = false
                this.$emit('onChange', params.moduleId)
                this.$emit('input', this.opterStatus)
              } else {
                this.$errorMessage('新增失败')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs['layout'].scrollTop = 0
      })
    }
  },
  created() {
    this.getErrorList()
  },
  watch: {
    value: {
      // 监听添加还是修改
      handler(curVal) {
        this.opterStatus = this.value
      }
    },
    moduleInfo: {
      // 将模块基础信息赋值
      handler(curVal) {
        this.formData = {
          moduleName: this.moduleInfo.title,
          moduleId: this.moduleInfo.moduleId,
          apiName: '',
          apiUrl: '',
          requestType: 1,
          requestParamType: 1, // 参数请求类型新增的时候为空
          isUseHeader: true, // 头信息
          errorIds: [],
          remark: '',
          request: [],
          response: []
        }
        this.changeIsGet()
      },
      deep: true,
      immediate: true
    },
    apiId: {
      // 监听api列表的变化
      handler(curVal) {
        this.getDataInfo(this.apiId)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.scrollTop()
  }
}
</script>
<style <style lang="scss" scoped>
.preview {
  margin: 15px 0px;
}
.preview .el-col {
  font-size: 16px;
  margin: 8px 0px;
  color: #606266;
}
.cms-form-layout .input-select {
  width: 100px !important;
}
.list-code{
  width: 120px;
}
</style>

