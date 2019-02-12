<template>
  <div class="visual-banner-module" @mouseenter='showMask(true)' @mouseleave="showMask(false)">
    <a :href="componentData.linkPath">
      <img :src="componentData.imgPath" alt="" class="visual-banner-img">
    </a>
    <cms-mask @edit='setIsEdit' type='edit' v-if="isMask"></cms-mask>
    <cms-mask @delete='deleteModule' type='delete'></cms-mask>
    <el-dialog title="广告编辑" class="visual-dialog" :visible.sync="isEdit" width="800px" :append-to-body='true' :before-close="handleClose">
      <el-form :model="componentData" label-width="120px">
        <el-form-item label="banner图地址">
          <el-input v-model="componentData.linkPath" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="banner图">
          <el-select v-model="componentData.imgPath" placeholder="请选择图片">
            <el-option label="图一" value="http://dzd.jeecms.com/u/201802/11105627fx4s.jpg"></el-option>
            <el-option label="图二" value="http://dzd.jeecms.com/u/201801/28114352maop.jpg"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <cms-button type='success' @click="save">确 定</cms-button>
        <cms-button type='info' @click="isEdit = false">取 消</cms-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import visual from './../mixins'
export default {
  name: 'visualBanner',
  mixins: [visual],
  props: {
    moduleData: {// 模块数据信息
      type: Object,
      default: function() {
        return {
          linkPath: '#',
          imgPath: '#'
        }
      }
    }
  },
  data() {
    return {
      componentData: { // 当前组件信息，会拷贝moduleData的数据，此处默认都留空

      }
    }
  },
  mounted() {

  }
}
</script>

<style >

</style>
