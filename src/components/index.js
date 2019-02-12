import cmsPrompt from './cms/cmsPrompt'
import cmsSwitch from './cms/cmsSwitch'
import cmsPicker from './cms/cmsPicker'
import cmsButton from './cms/cmsButton'
import cmsPagination from './cms/cmsPagination'
import cmsBreadcrumb from './cms/cmsBreadcrumb'
import cmsMessage from './cms/cmsMessage'
import cmsTransition from './cms/cmsTtransition'
import cmsTabs from './cms/cmsTabs/cmsTabs'
import cmsTab from './cms/cmsTabs/cmsTab'
import cmsBrandDialog from './cms/cmsBrandDialog/cmsBrandDialog'
import cmsPictureZone from './cms/cmsPictureZone/index'
import cmsUpload from './cms/cmsUpload'
import cmsTop from './cms/cmsTop'
import visualBanner from './visual/template/banner'

const components = [
  visualBanner,
  cmsPictureZone,
  cmsUpload,
  cmsBrandDialog,
  cmsTabs,
  cmsTab,
  cmsTransition,
  cmsPrompt,
  cmsSwitch,
  cmsPicker,
  cmsButton,
  cmsPagination,
  cmsBreadcrumb,
  cmsMessage,
  cmsTop
]

const install = function(Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
