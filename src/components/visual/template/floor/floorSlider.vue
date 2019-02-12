<template>
  <div class="floor-slider" @mouseenter='showMask(true)' @mouseleave="showMask(false)">
    <ul>
      <li>
        <a href="">
          <img src="" alt="">
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import visual from './../../mixins'
export default {
  name: 'floorSlider',
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
