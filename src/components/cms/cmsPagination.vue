<template>
 <div  class="cms-pagination">
  <el-pagination
    :style='{float:align}'
    background
    :page-sizes="[10,20,50,100,200]"
    :page-size="size"
     :layout="layout"
      :total="total"
      @size-change='getSize'
      @current-change='getChange'
    >
    </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'cmsPagination',
  props: {
    align: {
      type: String,
      default: 'right'
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      current: 1,
      size: 10
    }
  },
  methods: {
    getSize(val) { // 每页条数size
      this.size = val
      this.$emit('change', this.current, this.size)
    },
    getChange(val) { // 当前页
      this.current = val
      this.$emit('change', this.current, this.size)
    }
  }
}

</script>

<style lang='scss' scoped>
  .cms-pagination{
   padding: 20px 0
  }
</style>
