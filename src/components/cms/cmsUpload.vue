<template>
  <div class="cms-upload"
   @click="selectFile"
  >
    <slot></slot>
    <input type="file" 
    name='fileName'
    multiple="multiple"
    ref='uploadFile' class="cms-upload-input"
    @change="onUpLoad($event)"
    >
  </div>
</template>

<script>
function noop() {}
// 需求不明确,确定后再完善
export default {
  name: 'cmsUpload',
  props: {
    onChange: {// 返回选择的文件列表
      type: Function,
      default: noop
    }
  },
  data() {
    return {

    }
  },
  methods: {
    selectFile() { // 选择上传的文件
      this.$refs['uploadFile'].click()
    },
    onUpLoad(el) { // 返回上传的文件
      this.onChange(el.target.files)
    }
  }
}
</script>

<style scoped lang='scss'>
 .cms-upload{
   display: inline-block;
 }
 .cms-upload-input{
  display: none;
 }
</style>
