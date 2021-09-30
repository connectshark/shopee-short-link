import { createStore } from 'vuex'
import ls from '../lib/ls'

const key = 'shortLink'

const store = createStore({
  state: {
    links: []
  },
  mutations: {
    /**
     * 添加連結
     */
    addLink (state, data) {
      state.links.push(data)
    },
    /**
     * 初始化多連結
     */
    addLinks (state, arr) {
      state.links = [...arr]
    }
  },
  actions: {
    init ({ commit }) {
      commit('addLinks', ls.load(key))
    }
  }
})

export default store