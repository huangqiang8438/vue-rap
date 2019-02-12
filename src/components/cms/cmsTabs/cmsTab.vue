<template>
   <div class="cms-tab" :class="[isActive ? 'active' : '']"  :style="colorObj" @click="jumper">
      <slot></slot>
      <span class="bottom-line" v-if="isActive" :style="{backgroundColor:color}"></span>
   </div>
</template>

<script>
export default {
  name: 'cmsTab',
  props: {
    to: {
      type: String
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      isActive: false,
      colorObj: {
        color: '#444'
      }
    }
  },
  computed: {
    color() {
      return this.$store.state.system.color
    }
  },
  methods: {
    jumper() {
      this.$routerLink(this.to)
    }
  },
  created() {
    const selfRouter = this.$route.path
    if (selfRouter === this.to) {
      this.isActive = true
      this.colorObj.color = this.color
    }
  }
}
</script>

<style lang='scss' scoped>
.cms-tab {
  float: left;
  padding: 9px 15px;
  color: #444;
  font-size: 14px;
  cursor: pointer;
  position: relative;
}
.bottom-line{
   position: absolute;
  display:inline-block;
  bottom: -2px;
  left: 0;
  width: 100%;
  background:#188ae2;
  height: 2px;
}
</style>

