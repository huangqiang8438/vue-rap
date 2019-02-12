<template>
  <div class="api-modules-warpper">
    <div class="api-modules-silder">
       <module-tree class="api-modules-tree" :title="title" :id='repositoryId' @change="getModuleInfo"></module-tree>
      <doc-items class="api-modules-list" :dataInfo='docItemsData' @change="getApiInfo" ref="docItem"></doc-items>
    </div>
      <doc-edit class="api-modules-edit" v-model="opterStatus" :moduleInfo='docItemsData' :apiId='dataInfo' :repositoryId="repositoryId"
        @onChange='refreshList'
      ></doc-edit>
  </div>
</template>
<script>
import docEdit from './components/docEdit'
import moduleTree from './components/moduleTree'
import docItems from './components/docTree'
export default {
  components: {
    docEdit,
    docItems,
    moduleTree
  },
  data() {
    return {
      opterStatus: false,
      title: this.$route.query.name,
      repositoryId: parseInt(this.$route.query.repositoryId),
      docItemsData: localStorage.getItem('docItemsData') ? JSON.parse(localStorage.getItem('docItemsData')) : { title: '', moduleId: 0 },
      dataInfo: localStorage.getItem('apiId') ? parseInt(localStorage.getItem('apiId')) : 0
    }
  },
  methods: {
    getModuleInfo(obj) { // 获取到当前点击的模块信息
      console.log(obj)
      if (obj.id !== 0) {
        this.docItemsData = {
          title: obj.moduleName,
          moduleId: obj.id
        }
        localStorage.setItem('docItemsData', JSON.stringify(this.docItemsData))
        this.opterStatus = true
        this.dataInfo = 0
      }
    },
    getApiInfo(item) { // 获取接口详细信息
      this.opterStatus = false
      this.dataInfo = item.id
      localStorage.setItem('apiId', this.dataInfo)
    },
    refreshList(moduleId) {
      this.$refs['docItem'].getApiList(moduleId)
    }
  }
}

</script>

<style>

</style>
