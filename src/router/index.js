import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/HomePage.vue')
    },
    {
      path: '/about',
      name: 'about',      
      component: () => import('../components/AboutPage.vue')
    },
    {
      path: '/login',
      name: 'login',      
      component: () => import('../components/LoginPage.vue')
    }
  ]
})

export default router
