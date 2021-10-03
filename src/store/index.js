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
      ls.save(key, state.links)
    },
    /**
     * 初始化多連結
     */
    addLinks (state, arr) {
      state.links = [...arr]
      ls.save(key, state.links)
    },

    deleteLink (state, index) {
      state.links.splice(index, 1)
      ls.save(key, state.links)
    }
  },
  actions: {
    init ({ commit }) {
      commit('addLinks', [{
        url: 'https://fkdsjlf',
        subids: ['fjs']
      }] || ls.load(key))
    }
  }
})

export default store