import { createRouter, createWebHistory } from 'vue-router/auto'
const history = createWebHistory()

const router = createRouter({
  history,
  scrollBehavior () {
    return {
      top: 0
    }
  },
  linkActiveClass: 'page-active'
})
const defaultDocumentTitle = ' | 蝦皮縮網址網站'
router.beforeEach(to => {
  if (to.meta?.title) {
    document.title = `${to.meta.title}` + defaultDocumentTitle
  } else {
    document.title = `蝦英雄` + defaultDocumentTitle
  }
})
export default router