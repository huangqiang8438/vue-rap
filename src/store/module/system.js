
const localColor = localStorage.getItem('color') == null ? '#188ae2' : localStorage.getItem('color')// 本地存储上次的颜色
const system = {
  state: {
    color: localColor
  },
  mutations: {
    SET_COLOR: (state, color) => {
      if (color == null) {
        color = '#188ae2'
      }
      localStorage.setItem('color', color)
      state.color = color
    }
  },
  actions: {
    setColor({ commit }, color) {
      commit('SET_COLOR', color)
    }
  }

}

export default system
