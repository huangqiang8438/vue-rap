<template>
  <div class="floor-brand" @mouseenter='showMask(true)' @mouseleave="showMask(false)">
    <ul class="floor-brand-items">
      <li class="floor-brand-item" v-for="(item,index) in componentData.items" :key="index">
        <a :href="item.linkPath">
          <img :src="item.imgPath" alt="">
        </a>
      </li>
    </ul>
    <!-- 编辑内容 -->
    <el-dialog title="品牌编辑" class="visual-dialog" :visible.sync="isEdit" width="900px" :append-to-body='true' :before-close="handleClose">
      <el-form :model="componentData" label-width="120px">
        <el-form-item label="添加品牌">
          <el-select v-model="checkBrandItem" @change="setBrand">
            <el-option v-for='(item,index) in brandItems' :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
     
       <!--动态标签-->
      <div>品牌（可拖动管理标签位置）</div>
      <draggable class="visual-drop-items" v-model="componentData.items">
        <section class="visual-drop-item" v-for="(item,index) in componentData.items" :key="index">
          <div class="drop-item--form">
            <label class="drop-item--label">品牌图片{{index+1}}:</label>
              <img :src="item.imgPath"> 
          </div>
          <div class="drop-item--form">
            <label class="drop-item--label">品牌地址:</label>
            <el-input class="drop-item--input" v-model="item.linkPath"></el-input>
          </div>
        </section>
      </draggable>
      <span slot="footer" class="dialog-footer">
        <cms-button type='success' @click="save">确 定</cms-button>
        <cms-button type='info' @click="isEdit = false">取 消</cms-button>
      </span>
    </el-dialog>
  
  </div>
</template>
<script>
import visual from './../../mixins'
import draggable from 'vuedraggable'
export default {
  name: 'floorBrand',
  mixins: [visual],
  components: {
    draggable
  },
  props: {
    moduleData: {
      // 模块数据信息
      type: Object,
      default: function() {
        return {
          items: [
            {
              linkPath: '#',
              imgPath: ''
            },
            {
              linkPath: '#',
              imgPath: ''
            },
            {
              linkPath: '#',
              imgPath: ''
            },
            {
              linkPath: '#',
              imgPath: ''
            },
            {
              linkPath: '#',
              imgPath: ''
            },
            {
              linkPath: '#',
              imgPath: ''
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      checkBrandItem: '',
      count: 0,
      brandItems: [
        'http://dzd.jeecms.com/r/gou/pc/newdzd/images/shoeicon1.png',
        'http://dzd.jeecms.com/r/gou/pc/newdzd/images/shoeicon2.png',
        'http://dzd.jeecms.com/r/gou/pc/newdzd/images/shoeicon3.png',
        'http://dzd.jeecms.com/r/gou/pc/newdzd/images/shoeicon4.png',
        'http://dzd.jeecms.com/r/gou/pc/newdzd/images/shoeicon5.png',
        'http://dzd.jeecms.com/r/gou/pc/newdzd/images/shoeicon6.png'
      ]
    }
  },
  methods: {
    setBrand(val) {
      if (this.count > 5) {
        this.$successMessage('品牌最多只能添加6个')
      } else {
        this.componentData.items[this.count].imgPath = val
        this.componentData.items[this.count].linkPath = '测试' + this.count
        this.count++
      }
    }
  }
}
</script>

<style >

</style>
