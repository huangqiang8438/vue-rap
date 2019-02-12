<!--图片空间选择-->
<template>
  <div class="cms-picture-zone">
    <div class="cms-picture-zone__inner">
      <div class="cms-picture-zone__header">
        <span class="fl">全部图片</span>
        <div class="fr cms-picture-zone__search">
          <cms-upload :on-change='getUpload'>
            <cms-button icon='up' size='small' class="cms-upload-btn">上传图片</cms-button>
          </cms-upload>
          <label>关键字</label>
          <el-input style="width:160px" placeholder="输入名称"></el-input>
          <cms-button :colorPicker='true'>搜索</cms-button>
          <el-dropdown>
            <span class="el-dropdown-link">高级搜索
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="cms-picture-zone__batch">
        <div class="batch--fl">
          <el-checkbox v-model="checkAll" @change='getCheckAll'>全选</el-checkbox>
          <span @click="deletePictureItems">
            <i class="iconfont icon-shanchu1"></i> 批量删除</span>
        </div>
        <div class="batch--fr ">
          <label>排序</label>
          <el-select v-model="params.count" style="width:160px;margin-right:20px;">
            <el-option v-for="(item,index) in timerItems" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select>
          <div class="batch-tabs">
            <span>
              <i class="iconfont icon-liebiao"></i>
            </span>
            <span>
              <i class="iconfont icon-liebiao1"></i>
            </span>
          </div>
        </div>
      </div>
      <!--图片列表-->
      <div class="cms-picture-zone__body">
        <ul class="zone--items--flex">
          <li class="zone--items" :class="[isChecked(item) ? 'checked' : '']" v-for="(item,index) in pictureItems" :key="index" @contextmenu.prevent="openMenu(item,index,$event)">
            <div class="body--img-box" @click="setCheckedItems(item,index)">
              <img :src="item.path" alt="">
            </div>
            <div class="body--img-name">
              <span v-show="!item.isEdit">{{item.name}}</span>
              <input type="text" v-show="item.isEdit" v-model="item.name" class="img-name-edit" @blur="savePictureName" :ref="'editInput'+index">
            </div>
          </li>
        </ul>
        <!-- 右键 -->
        <ul class="zone-contextmenu" v-show="contextmenuVisible" :style="{left:left+'px',top:top+'px'}">
          <li>
            <i class="iconfont icon-yidong"></i>
            移动
          </li>
          <li @click="editName">
            <i class="iconfont icon-jiaoxueneirong_zhongmingming"></i>
            重命名</li>
          <li @click="deletePictureItem">
            <i class="iconfont icon-shanchu"></i>
            删除
          </li>
        </ul>
      </div>
    </div>
    <div class="el-dialog__footer footer-flex">
      <cms-button @click="setChange" type='success' :disabled='disable' class="abs-button">确定</cms-button>
      <cms-pagination @change="getPage" :total='1' align='left' layout='prev, pager, next' class="zone-pagination"></cms-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        count: 1
      },
      pictureItems: [
        // 图片列表
        {
          path:
            'https://img.alicdn.com/imgextra/i1/835893472/TB2kY0CaamWBuNjy1XaXXXCbXXa_!!835893472.jpg_430x430q90.jpg',
          name: 'test1.jpg',
          id: 1
        },
        {
          path:
            'https://img.alicdn.com/imgextra/i1/370627083/TB2czaBbh1YBuNjy1zcXXbNcXXa-370627083.jpg_430x430q90.jpg',
          name: 's9.jpg',
          id: 2
        },
        {
          path:
            'https://img.alicdn.com/imgextra/i4/370627083/TB21R9CbhWYBuNjy1zkXXXGGpXa-370627083.jpg_430x430q90.jpg',
          name: 'test1.jpg',
          id: 3
        },
        {
          path:
            'https://img.alicdn.com/imgextra/i1/1917047079/TB2ExXzblY85uJjSZPcXXaGGpXa_!!1917047079.jpg_430x430q90.jpg',
          name: 'x',
          id: 4
        },
        {
          path:
            'https://img.alicdn.com/bao/uploaded/i3/1917047079/TB1IfFybl_85uJjSZPfXXcp0FXa_!!0-item_pic.jpg_430x430q90.jpg',
          name: 'test1.jpg',
          id: 5
        }
      ],
      disable: true,
      checkAll: false,
      checkedItems: [], // 选中图片的数组
      selectedItem: {}, // 当前操作的图片对象
      selectedIndex: [], // 当前选中的是第几项
      contextmenuVisible: false,
      top: 0,
      left: 0,
      timerItems: [
        {
          name: '时间倒序',
          id: 1
        }
      ]
    }
  },
  methods: {
    imageRander(file) {
      window.URL.createObjectURL(file)
      return window.URL.createObjectURL(file)
    },
    getUpload(fileList) {
      var newFileList = []

      for (const key in fileList) {
        if (fileList.hasOwnProperty(key)) {
          newFileList.push({
            path: this.imageRander(fileList[key]),
            name: fileList[key].name,
            id: Math.random() * 100,
            isAdd: true
          })
        }
      }
      this.pictureItems = newFileList.concat(this.pictureItems)
    },
    getPictureItems(params) {
      // 获取图片接口信息,加一个修改标记
      this.pictureItems.forEach((element, index) => {
        this.$set(this.pictureItems[index], 'isEdit', false)
      })
    },
    getCheckAll(value) {
      // 全选操作
      if (value) {
        this.checkedItems = Object.assign([], this.pictureItems)
      } else {
        this.checkedItems = []
      }
    },
    isChecked(item) {
      // 判断是否选中
      return this.checkedItems.findIndex(v => v.id === item.id) > -1
    },
    setCheckedItems(item, index) {
      // 单击选中图片
      if (this.checkedItems.findIndex(v => v.id === item.id) === -1) {
        this.checkedItems.push(item)
      } else {
        this.checkedItems.splice(
          this.checkedItems.findIndex(v => v.id === item.id),
          1
        )
      }
    },
    editName() {
      // 重命名
      this.pictureItems[this.selectedIndex].isEdit = true
      const el = this.$refs['editInput' + this.selectedIndex]
      setTimeout(() => {
        // 听说是因为有重绘，这个操作好骚啊
        el[0].focus()
      }, 20)
    },
    savePictureName() {
      // 保存重命名
      // 此处调用修改名称接口
      this.pictureItems[this.selectedIndex].isEdit = false
      this.$successMessage('重命名成功')
    },
    deletePictureItem() {
      // 删除图片项
      this.pictureItems.splice(this.selectedIndex, 1)
      // 此处调用删除接口
      this.$successMessage('删除成功')
    },
    deletePictureItems() {
      // 批量删图片项
      // 此处调用删除接口
      var ids = []
      this.checkedItems.map(v => {
        ids.push(v.id)
      })
      this.$successMessage(ids)
    },
    setChange() {
      // 把选中的对象传递出来
      this.$emit('change', this.checkedItems)
      this.checkedItems = []
      this.selectedItem = {} // 当前操作的图片对象
      this.selectedIndex = [] // 当前选中的是第几项
    },
    getPage(current, size) {
      // 分页调用
      console.log(current)
      console.log(size)
    },
    openMenu(item, index, e) {
      // 打开右键
      this.contextmenuVisible = true
      this.selectedItem = item
      this.selectedIndex = index
      this.left = e.clientX - 630
      this.top = e.clientY - 220
    },
    closeMenu() {
      // 关闭右键
      this.contextmenuVisible = false
    }
  },
  watch: {
    contextmenuVisible(value) {
      if (value) {
        window.addEventListener('click', this.closeMenu)
      } else {
        window.removeEventListener('click', this.closeMenu)
      }
    },
    checkedItems: {
      handler(curVal, oldVal) {
        const checkLen = curVal.length
        const itemLen = this.pictureItems.length
        this.checkAll = itemLen === checkLen // 判断是否全选
        if (checkLen > 0) {
          this.disable = false
        } else {
          this.disable = true
        }
      },
      deep: true
    }
  },
  created() {
    this.getPictureItems()
  }
}
</script>

<style scoped lang='scss'>
.cms-picture-zone {
  position: relative;
  margin-left: 220px;
  &__inner {
    padding-left: 16px;
  }
  &__header {
    width: 100%;
    height: 45px;
    line-height: 45px;
  }
  &__search {
    min-width: 520px;
    display: flex;
    align-items: center;
    .cms-button {
      padding: 6px 14px;
      margin-right: 20px;
    }
    > * {
      margin-right: 10px;
    }
  }
  &__batch {
    width: 100%;
    height: 38px;
    border-top: 1px solid #e3f2df;
    border-bottom: 1px solid #e3f2df;
    padding: 0 16px;
    background: #f7fff4;
  }
  &__body {
    width: 100%;
    height: 468px;
    overflow: auto;
    padding: 16px;
    background: #f7f7f7;
    position: relative;
  }
  &__bottom {
  }
}
.cms-upload-btn {
  background: #ffcc00;
  border: 1px solid #e8be19;
  color: #a15f00;
  padding: 6px 10px !important;
  margin-right: 10px !important;
}
.batch--fl {
  float: left;
  height: 38px;
  display: flex;
  align-items: center;
  > * {
    margin-right: 30px;
    cursor: pointer;
  }
  .iconfont {
    position: relative;
    top: 1px;
  }
}
.batch--fr {
  height: 38px;
  float: right;
  display: flex;
  align-items: center;
  margin-right: 14px;
  > * {
    position: relative;
    top: -1px;
  }
  > label {
    margin-right: 10px;
  }
}
.batch-tabs {
  > span {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    border: 1px solid #dcdfe6;
    float: left;

    &:first-child {
      border-right: none;
      border-radius: 3px 0 0 3px;
    }
    &:last-child {
      border-radius: 0px 3px 3px 0;
    }
  }
}
.zone--items--flex {
}
.zone--items {
  width: 152px;
  border: 1px solid transparent;
  float: left;
  margin-right: 13px;
  margin-bottom: 16px;
  position: relative;
  cursor: pointer;
  &:nth-child(5n) {
    margin-right: 0;
  }
  &.checked {
    border-color: #00da38;
    &::after {
      font-family: "iconfont" !important;
      content: "";
      width: 34px;
      height: 34px;
      background: url("./../../../assets/images/img-check.png");
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }
}
.body--img-box {
  width: 150px;
  height: 150px;
  img {
    max-width: 150px;
  }
}
.body--img-name {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #fff;
  color: #444;
}
.img-name-edit {
  outline: none;
  border: none;
  border-bottom: 1px solid #c1d7bb;
  color: #444;
  padding-left: 14px;
}
.zone-contextmenu {
  position: absolute;
  top: 140px;
  left: 160px;
  width: 110px;
  border: 1px solid #00da38;
  border-radius: 5px;
  background: #fff;
  z-index: 9999;
  li {
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    color: #444;
    padding-left: 16px;
    border-bottom: 1px solid #e3f2df;
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
    .iconfont {
      position: relative;
      top: 1px;
      font-weight: 600;
    }
    .icon-yidong,
    .icon-jiaoxueneirong_zhongmingming {
      color: #2ce05a;
    }
    .icon-shanchu {
      color: #fe5331;
    }
  }
}
.footer-flex {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.abs-button {
  position: absolute;
  left: 16px;
}
.zone-pagination {
  padding: 0 !important;
  float: none !important;
  line-height: 1 !important;
}
</style>
