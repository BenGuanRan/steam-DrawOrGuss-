import { createStore } from 'vuex'

export default createStore({
  state: {
    // 画笔配置
    drawConfig: {
      color: '#000',
      width: 5
    },
    // canvas节点
    canvasNode: document.querySelector('#user_canvas'),
    // 用户状态
    userStatus: {
      username: '',
      drawOrGuss: '',
    },
    // 用户列表
    userList: []
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
