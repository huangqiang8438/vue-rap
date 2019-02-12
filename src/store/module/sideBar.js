
const sideBar = {
  state: {
    collapse: true,
    changeStatus: true// 手动展开状态，区分开二级菜单触发和手动触发
  },
  mutations: {
    /*
     * status判断是否展开
     * changeStatus 判断是否为手动触发展开
     *
     */
    TOGGLE_SIDEBAR: (state, status) => {
      state.collapse = status
    },
    TOGGLE_AUTO: (state, status) => {
      state.changeStatus = status
    }
  },
  actions: {
    toggleSideBar({ commit }, status) {
      commit('TOGGLE_SIDEBAR', status)
    },
    toggleAuto({ commit }, status) {
      commit('TOGGLE_AUTO', status)
    }
  }

}

export default sideBar
