import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
import record from '../views/Record.vue'
const history = createWebHistory()

const router = createRouter({
  history,
  scrollBehavior () {
    return {
      top: 0
    }
  },
  linkActiveClass: 'page-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: ''
      }
    },
    {
      path: '/record',
      name: 'record',
      component: record,
      meta: {
        title: '轉換紀錄'
      }
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: () => import('../views/disclaimer.vue'),
      meta: {
        title: '免責聲明'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      meta: {
        title: '無頁面'
      },
      component: () => import('../views/404.vue')
    },
  ]
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