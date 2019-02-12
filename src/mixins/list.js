export default {
  data() {
    return {
      loading: true, // 遮罩
      queryParams: {}, // 查询参数对象
      tableData: null, // 表格数据
      dataUrl: '', // 表格数据url
      checkItems: [], // 被选中对象
      total: 0
    }
  },
  computed: {
    ids() {
      const arr = []
      this.checkItems.map(v => {
        arr.push(v.id)
      })
      return arr
    },
    batchStatus() {
      if (this.checkItems.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    query() {
      this.getTableData(this.dataUrl, this.queryParams)
    },
    getTableData(url, params) { // 获取表格数据
      this.dataUrl = url
      this.$http.$get(url, params)
        .then(res => {
          this.tableData = res.data.content
          this.total = res.data.totalElements
          this.loading = false
        })
        .catch(res => {
          this.loading = false
          this.$errorMessage('加载失败，请重试！')
        })
    },
    getCheckItems(obj) { // 获取全选数据
      this.checkItems = obj
    },
    getPage(current, size) { // 翻页方法
      this.queryParams.page = current - 1 // 后台翻页从0开始的所以减1
      this.queryParams.size = size
      this.getTableData(this.dataUrl, this.queryParams)
    },
    sortNum(el, id, sortNum) {
      // 数字排序
      const val = el.target.value
      const reg = /^[1-9][0-9]{0,1}$/
      if (val === '') {
        el.target.className = 'cms-error el-input__inner'
        this.$cmsMessage({
          message: '请输入一个有效数字',
          type: 'error',
          timer: '1000',
          fastClick: false
        })
      } else {
        if (reg.test(val)) {
          el.target.className = 'el-input__inner'
          this.$http.$post(this.$api.apiManagerSort, [{ id: id, sortNum: sortNum }])
            .then(res => {
              if (res.code === '200') {
                this.getTableData(this.dataUrl, this.queryParams)
              } else {
                this.$successMessage('修改失败')
              }
            })
        } else {
          el.target.className = 'cms-error el-input__inner'
          this.$cmsMessage({
            message: '只能输入1-99的正整数',
            type: 'error',
            timer: '1000',
            fastClick: false
          })
        }
      }
    },
    deleteTableDatas(url, ids) { // 批量删除
      if (this.batchStatus) {
        this.$confirm('您确定要批量删除数据吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$http.$post(url, { ids: ids }).then(res => {
              if (res.code === '200') {
                this.$successMessage('删除成功!')
                this.getTableData(this.dataUrl, this.queryParams)
              } else {
                this.$errorMessage('删除失败,' + res.message)
              }
            })
          })
          .catch(() => {})
      } else {
        this.$errorMessage('请至少选择一条数据!')
      }
    },
    deleteTableData(url, id) { // 删除参数为ids的使用当前方法
      this.$confirm('您确定删除此条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.$post(url, { ids: [id] }).then(res => {
            if (res.code === '200') {
              this.$successMessage('删除成功!')
              this.getTableData(this.dataUrl, this.queryParams)
            } else {
              this.$errorMessage('删除失败,' + res.message)
            }
          })
        })
        .catch(() => {})
    }
  }
}
