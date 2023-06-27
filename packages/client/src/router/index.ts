import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'Login', component: () => import('@/views/Login/index.vue') }],
})

export default router
