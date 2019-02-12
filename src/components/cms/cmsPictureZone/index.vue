<template>
  <el-dialog title="图片空间" :visible.sync="state" width="1200px" top="10vh" :before-close="handleClose">
    <div class="cms-zone-warper">
      <picture-tree></picture-tree>
      <picture-zone @change="getCheckedItems"></picture-zone>
    </div>
  </el-dialog>
</template>

<script>
import pictureTree from './fileTree.vue'
import pictureZone from './pictureZone.vue'
export default {
  components: {
    pictureTree,
    pictureZone
  },
  name: 'cmsPictureZone',
  props: {
    value: false // 显示隐藏
  },
  data() {
    return {
      state: false // 显示隐藏
    }
  },
  methods: {
    getCheckedItems(items) {
      this.$emit('change', items)
      this.close()
    },
    close() {
      // 关闭弹窗
      this.state = false
      this.$emit('input', false)
    },
    handleClose(done) {
      // 关闭弹窗
      done()
      this.close()
    }
  },
  watch: {
    value() {
      this.state = this.value // 显示隐藏
    }
  }
}
</script>

<style scoped lang='scss'>
.cms-zone-warper{
  overflow: hidden;
}
</style>
