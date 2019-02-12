import Vue from 'vue'
import Vuex from 'vuex'

import sideBar from './module/sideBar'
import tagsView from './module/tagsView'
import system from './module/system'
import permissions from './module/premission'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sideBar,
    tagsView,
    system,
    permissions
  }
})

export default store
