import { createStore } from 'vuex'

export default createStore({
  state: {
    drawConfig: {
      color: '#000',
      width: 5
    },
    canvasNode: document.querySelector('#user_canvas')
  },
  mutations: {
    changeColor(state, newColor) {
      state.drawConfig.color = newColor
    },
    changeWidth(state, newWidth) {
      state.drawConfig.width = newWidth
    },
    changeConfig(state, newConfig) {
      state.drawConfig.color = newConfig.color
      state.drawConfig.width = newConfig.width
    }
  },
  actions: {
  },
  modules: {
  }
})
