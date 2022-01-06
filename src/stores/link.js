import { defineStore } from 'pinia'

const key = 'shortLink'

/**
 * 設定localstorage資料
 */
const LS = {
	/**
	 * 讀取localstorage資料
	 * @param {String} listName key名稱
	 * @returns {Array} 若無資料回空陣列,若有則回obj
	 */
	load (listName) {
		return JSON.parse(localStorage.getItem(listName) || '[]')
	},
	/**
	 * 寫入localstorage資料
	 * @param {String} listName key名稱
	 * @param {Object} data 要寫入localstorage的資料
	 */
	save (listName, data) {
		localStorage.setItem(listName, JSON.stringify(data))
	},
	/**
	 * 刪除localstorage資料
	 * @param {string} listName key名稱
	 */
	remove (listName) {
		localStorage.removeItem(listName)
	}
}

export const useLinkStore = defineStore({
  id: 'link',
  state: () => ({
    links: []
  }),
  getters: {
  },
  actions: {
    initState () {
      this.links = LS.load(key)
    },
    addLink (linkData) {
      this.links.unshift(linkData)
      LS.save(key, this.links)
    },
    deleteLink (index) {
      this.links.splice(index, 1)
      LS.save(key, this.links)
    }
  }
})
