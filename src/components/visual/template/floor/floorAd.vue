<template>
  <div class="floor-ad" >
     <a :href="componentData.linkPath">
          <img :src="componentData.imgPath" alt="">
       </a>   
    <el-dialog title="广告编辑" class="visual-dialog" :visible.sync="isEdit" width="800px" :append-to-body='true' :before-close="handleClose">
      <el-form :model="componentData" label-width="120px">
        <el-form-item label="广告图地址">
          <el-input v-model="componentData.linkPath" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="广告图地址">
          <el-select v-model="componentData.imgPath" placeholder="请选择图片">
            <el-option label="图一" value="http://dzd.jeecms.com/u/201802/03180804qyhw.jpg"></el-option>
            <el-option label="图二" value="http://dzd.jeecms.com/u/201802/03180853diyu.jpg"></el-option>
             <el-option label="图三" value="http://dzd.jeecms.com/u/201802/03180959g1zw.jpg"></el-option>
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
import visual from './../../mixins'
export default {
  name: 'floorAd',
  mixins: [visual],
  props: {
    moduleData: {
      // 模块数据信息
      type: Object,
      default: function() {
        return {
          linkPath: '',
          imgPath: ''
        }
      }
    }
  }

}
</script>

<style >

</style>
