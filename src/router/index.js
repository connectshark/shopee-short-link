const { createRouter, createWebHashHistory } = require('vue-router')

const history = createWebHashHistory()

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    }
  ]
})

export default router