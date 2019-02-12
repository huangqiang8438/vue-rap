import cmsMask from './../mask/mask.vue'
export default{
  props: {
    index: {
      type: [String, Number],
      default: 0
    }
  },
  components: {
    cmsMask
  },
  data() {
    return {
      isShow: false,
      isEdit: false,
      componentData: {}
    }
  },
  watch: {
    moduleData: {
      handler(newVal, oldVal) {
        this.componentData = newVal
      },
      deep: true
    }
  },
  created() {
    this.componentData = this.moduleData
  },
  methods: {
    onShow() {
      this.isShow = true
    },
    onHide() {
      this.isShow = false
    },
    showMask(state, test) {
      this.isShow = state
    },
    deleteModule() {
      this.$emit('delete', this.index)
    },
    setIsEdit(state) {
      this.isEdit = state
    },
    save() {
      this.$emit('change', this.index, this.componentData)
      this.isEdit = false
    },
    handleClose(done) {
      this.$emit('change', this.index, this.componentData)
      done()
    }
  }
}
