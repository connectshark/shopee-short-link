import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
import about from '../views/About.vue'
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
      path: '/about',
      name: 'about',
      component: about,
      meta: {
        title: '作者'
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
      component: () => import('../views/404.vue')
    },
  ]
})

export default router