import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
const history = createWebHistory()

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue')
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('../views/record.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/404.vue')
    },
  ]
})

export default router