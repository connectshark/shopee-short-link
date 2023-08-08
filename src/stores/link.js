import { defineStore } from 'pinia'

const KEY = 'shortLink'

const LS = {
	load (listName) {
		return JSON.parse(localStorage.getItem(listName) || '[]')
	},
	save (listName, data) {
		localStorage.setItem(listName, JSON.stringify(data))
	},
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
      this.links = LS.load(KEY)
    },
    addLink (linkData) {
      this.links.unshift(linkData)
      LS.save(KEY, this.links)
    },
    deleteLink (index) {
      this.links.splice(index, 1)
      LS.save(KEY, this.links)
    }
  }
})
