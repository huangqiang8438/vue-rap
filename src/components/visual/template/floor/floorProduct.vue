<template>
  <div class="floor-product" @mouseenter='showMask(true)' @mouseleave="showMask(false)">
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
            <el-option label="图一" value="https://img30.360buyimg.com/babel/s350x180_jfs/t17347/163/808378838/34823/cea3c724/5aa9dc55N45895624.jpg!q90!cc_350x180"></el-option>
            <el-option label="图二" value="https://img13.360buyimg.com/babel/s350x180_jfs/t16723/54/862077136/37027/188fcad2/5aae7850N8bca76dc.jpg!q90!cc_350x180"></el-option>
            <el-option label="图三" value="https://img11.360buyimg.com/da/s340x200_jfs/t14302/118/1926856693/147207/981455b1/5a61a7e0N4b697801.jpg!q90!cc_340x200"></el-option>
            <el-option label="图四" value="http://dzd.jeecms.com/r/gou/pc/newdzd/images/shoeicon6.png"></el-option>
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
          linkPath: '#',
          imgPath: '#'
        }
      }
    }
  },
  data() {
    return {
      componentData: {
        // 当前组件信息，会拷贝moduleData的数据，此处默认都留空
      }
    }
  }
}
</script>

<style >

</style>
