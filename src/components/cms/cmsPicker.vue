<template>
  <el-date-picker
      v-model="checkedTimer"
      :type="type"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      style="width:285px"
      value-format="yyyy-MM-dd"
      @change="getTime"
      >
    </el-date-picker>
</template>

<script>
export default {
  name: 'cmsPicker',
  props: {
    value: {
      type: [String, Date, Array]
    },
    type: {
      type: String,
      default: 'daterange'// 参考element 组件
    }
  },
  data() {
    return {
      checkedTimer: this.value,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    value() {
      this.checkedTimer = this.value
    }
  },
  methods: {
    getTime(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>
