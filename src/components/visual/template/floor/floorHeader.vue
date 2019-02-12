<template>
  <div class="visual-floor-header v-mask"  @click="isEdit=true">
    <div class="fl">
      <h3 class="floor-header-name" :style="{color:componentData.tagTitle.color}">
        <span class="floor-header-tag" :style="{background:componentData.tagColor}"></span>
        {{componentData.tagTitle.name}}</h3>
      <h4 class="floor-header-sub" :style="{color:componentData.tagSubTitle.color}">{{componentData.tagSubTitle.name}}</h4>
    </div>
    <div class="fr floor-header-link">
      <a v-for='(item,index) in componentData.tagClassify' :key="index" :href="item.url" v-if='item.display'>{{item.name}}</a>
    </div>
    <!-- 编辑内容 -->
    <el-dialog title="楼层编辑" class="visual-dialog" :visible.sync="isEdit" width="900px" :append-to-body='true' :before-close="handleClose">
      <el-form :model="componentData" label-width="120px">
        <el-form-item label="楼层颜色选择">
          <el-color-picker v-model="componentData.tagColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="主标题">
          <el-input v-model="componentData.tagTitle.name"></el-input>
          <el-color-picker v-model="componentData.tagTitle.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="componentData.tagSubTitle.name"></el-input>
          <el-color-picker v-model="componentData.tagSubTitle.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="添加分类内容">
          <el-cascader :props="classifyProps" :options="classifyItems" :show-all-levels="false" @change='getSelectClassify'></el-cascader>
        </el-form-item>
      </el-form>
      <!--动态标签-->
      <div>分类项（可拖动管理标签位置）</div>
      <draggable class="visual-drop-items" v-model="componentData.tagClassify">
        <section class="visual-drop-item" v-for="(item,index) in componentData.tagClassify" :key="index">
          <div class="drop-item--form">
            <label class="drop-item--label">分类名称:</label>
            <el-input class="drop-item--input" v-model="item.name"></el-input>
          </div>
          <div class="drop-item--form">
            <label class="drop-item--label">分类地址:</label>
            <el-input class="drop-item--input" v-model="item.url"></el-input>
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
  name: 'floorHeader',
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
          tagColor: '#3ad2a7',
          tagTitle: {
            name: '主标题',
            color: '#333'
          },
          tagSubTitle: {
            name: '副标标题',
            color: '#333'
          },
          tagClassify: [
            {
              name: '分类1',
              url: '#',
              display: true
            },
            {
              name: '分类2',
              url: '#',
              display: true
            },
            {
              name: '分类3',
              url: '#',
              display: true
            },
            {
              name: '更多',
              url: '#',
              display: true
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      selectedClassify: [],
      classifyProps: {
        value: 'id',
        label: 'name'
      },
      classifyItems: [
        {
          name: '家用电器',
          id: 1,
          url: 'http://dzd.jeecms.com/homeAppliances/index2.jhtml',
          children: [
            {
              id: 2,
              name: '热卖新品',
              url: 'http://dzd.jeecms.com/homeAppliances/index3.jhtml'
            },
            {
              id: 3,
              name: '厨房小电',
              url: 'http://dzd.jeecms.com/homeAppliances/index.jhtml'
            }
          ]
        },
        {
          id: 4,
          name: '手机数码',
          url: 'http://dzd.jeecms.com/homeAppliances/index.jhtml',
          children: [
            {
              id: 5,
              name: '电脑整机',
              url: 'http://dzd.jeecms.com/homeAppliances/index.jhtml'
            },
            {
              id: 6,
              name: '新品上市',
              url: 'http://dzd.jeecms.com/homeAppliances/index.jhtml'
            },
            {
              id: 7,
              name: '更多>',
              url: 'http://dzd.jeecms.com/homeAppliances/index.jhtml'
            }
          ]
        }
      ], // 分类选择列表
      componentData: {
        // 当前组件信息，会拷贝moduleData的数据，此处默认都留空
      }
    }
  },
  methods: {
    getSelectClassify(value) {

    }
  }
}
</script>

<style >

</style>
