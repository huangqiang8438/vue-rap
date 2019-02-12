<template>
  <div class="v-module clearfix visual-floor-module" @mouseover="onShow" @mouseout="onHide">
    <floor-header :moduleData='componentData.floorHeader'></floor-header>
    <floor-ad :moduleData='componentData.floorAd' class="floor-inline-block"></floor-ad>
    <div class="floor-inline-block">
      <floor-brand :moduleData='componentData.floorBrand'></floor-brand>
      <floor-slider></floor-slider>
    </div>
    <div class="floor-inline-block floor-product-warpper">
      <floor-product :moduleData='componentData.floorProduct.items[0]'></floor-product>
      <floor-product :moduleData='componentData.floorProduct.items[1]'></floor-product>
      <floor-product :moduleData='componentData.floorProduct.items[2]'></floor-product>
      <floor-product :moduleData='componentData.floorProduct.items[3]'></floor-product>
      <floor-product :moduleData='componentData.floorProduct.items[4]'></floor-product>
      <floor-product :moduleData='componentData.floorProduct.items[5]'></floor-product>
    </div>
    <cms-mask :isShow='isShow'></cms-mask>
  </div>
</template>
<script>
import visual from './../../mixins'
import floorHeader from './floorHeader'
import floorAd from './floorAd'
import floorBrand from './floorBrand'
import floorSlider from './floorSlider'
import floorProduct from './floorProduct'

export default {
  name: 'floor1',
  mixins: [visual],
  components: {
    floorHeader,
    floorAd,
    floorBrand,
    floorSlider,
    floorProduct
  },
  props: {
    moduleData: {
      // 模块数据信息
      type: Object,
      default: function() {
        return {
          floorHeader: {
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
                url: '#'
              },
              {
                name: '分类2',
                url: '#'
              },
              {
                name: '分类3',
                url: '#'
              }
            ],
            tagMore: {
              name: '更多',
              url: '#'
            }
          },
          floorAd: {
            linkPath: '',
            imgPath: ''
          },
          floorBrand: {
            // 楼层品牌信息
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
          },
          floorProduct: {
            items: [
              {
                linkPath: '',
                imgPath: ''
              },
              {
                linkPath: '',
                imgPath: ''
              },
              {
                linkPath: '',
                imgPath: ''
              },
              {
                linkPath: '',
                imgPath: ''
              },
              {
                linkPath: '',
                imgPath: ''
              },
              {
                linkPath: '',
                imgPath: ''
              }
            ]
          }
        }
      }
    }
  }
}
</script>