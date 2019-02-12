<template>
  <el-dialog
  title="选择品牌"
  :visible.sync="state"
  width="800px"
  top="20vh"
  :before-close="handleClose">
  <!-- 品牌选择 -->
  <div class="brand-header">
    <span class="brand-tooltip">首字母</span>
    <ul class="brand-letter-box">
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
      <li>H</li>
      <li>I</li>
      <li>J</li>
      <li>K</li>
      <li>L</li>
      <li>M</li>
      <li>N</li>
      <li>O</li>
      <li>P</li>
      <li>Q</li>
      <li>R</li>
      <li>S</li>
      <li>T</li>
      <li>U</li>
      <li>V</li>
      <li>W</li>
      <li>X</li>
      <li>Y</li>
      <li>Z</li>
    </ul>
  </div>
    <!-- 品牌分类 -->
    <div class="brand-body">
      <!-- 循环 -->
          <section class="brand-group-box" v-for="(item,index) in brandArray" :key="index">
              <span class="brand-group-name">{{item.letterName}}</span>
               <ul class="brand-group-items">
                 <li v-for="(brand,index2) in item.items" 
                 :key="index2" 
                 :class="[checkArray.indexOf(brand.id) > -1 ? 'active' : '']"
                 @click="checkBrands(brand)"
                 >{{brand.name}}</li>
               </ul>
           </section>
     </div> 
  <span slot="footer" >
    <cms-button type="success" @click="close">确定</cms-button>
    <cms-button type="rest" @click="close">取消</cms-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'cmsBrandDialog',
  props: {
    value: false, // 显示隐藏
    select: { // 选中的品牌数组
      type: Array,
      default: function() {
        return []
      }
    }
  },
  watch: {
    value() {
      this.state = this.value // 显示隐藏
    },
    checkArray: { // 监听选中的变化
      handler(oldVal, newVal) {
        this.$emit('change', this.checkArray)
      },
      deep: true
    }
  },
  data() {
    return {
      state: false,
      checkArray: Object.assign([], this.select),
      brandArray: [
        {
          letterName: 'A',
          items: [
            {
              id: 1,
              name: '奥迪'
            },
            {
              id: 2,
              name: '奥特莱瑟'
            },
            {
              id: 3,
              name: '阿迪达斯'
            },
            {
              id: 4,
              name: '阿玛尼'
            }
          ]
        },
        {
          letterName: 'B',
          items: [
            {
              id: 5,
              name: '奔驰'
            },
            {
              id: 6,
              name: '宾利'
            },
            {
              id: 7,
              name: 'bsd'
            },
            {
              id: 8,
              name: '宝马'
            }
          ]
        }
      ]
    }
  },
  methods: {
    checkBrands(brand) { // 选择品牌
      if (this.checkArray.findIndex(v => v === brand.id) === -1) {
        this.checkArray.push(brand.id)
      } else {
        this.checkArray.splice(this.checkArray.findIndex(v => v === brand.id), 1)
      }
    },
    close() { // 关闭弹窗
      this.state = false
      this.$emit('input', false)
    },
    handleClose(done) { // 关闭弹窗
      done()
      this.close()
    }
  }
}
</script>

<style scoped lang='scss'>
  .brand-header{
    padding:  0 17px;
    width:100%;
    height: 38px;
    line-height: 38px;
    background: #f7fff4;
    border-top:1px solid #e3f2df;
    border-bottom: 1px solid #e3f2df;
  }
  .brand-tooltip{
    margin-top: 9px;
    float: left;
    display: inline-block;
    position: relative;
    width: 44px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    background: #b7b7b7;
    &::before{
     content: '';
    position: absolute;
    top: 6px;
    right: -4px;
    display: block;
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-left: 4px solid #b7b7b7;
    border-bottom: 3px solid transparent;
    }
  }
  .brand-letter-box{
     margin-top: 6px;
    overflow:hidden;
    margin-left: 76px;
    li{
     float: left;  
     cursor: pointer; 
     font-size: 12px;
     line-height: 1;
     width: 25px;
     height: 25px;
     line-height: 25px;
     text-align:center;
    }
  }
  .brand-body{
    padding: 0 26px;
    height: 385px;
    overflow:auto;
  }
  .brand-group-box{
     border-bottom: 1px dashed #efefef;
     overflow: hidden;
     display: flex;
     padding: 10px 0 10px 0;
  }
  .brand-group-name{
    float: left;
    height: 100%;
    width: 38px;
   
  }
  .brand-group-items{
    flex: 1;
    li{
      cursor: pointer;
      float: left;
      margin-right: 20px;
      margin-bottom: 4px;
      border: 1px solid #fff;
      border-radius: 3px;
      padding: 0 6px;
      
      &.active{
        color: #00da38;
        border-color: #00da38;
      }
    }
  }
</style>
