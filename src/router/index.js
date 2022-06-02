import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
import record from '../views/Record.vue'
const history = createWebHistory()

const router = createRouter({
  history,
  linkActiveClass: 'page-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: '首頁'
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
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      meta: {
        title: '無頁面'
      },
      component: () => import('../views/404.vue')
    },
  ]
})
const defaultDocumentTitle = '蝦英雄'
router.afterEach(to => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})
export default router