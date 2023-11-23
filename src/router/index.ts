import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import TripList from '@/views/TripList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      // component: () => import('@/views/HomePage.vue')
      component: HomePage,
    },
    {
      path: '/trips',
      name: 'TripList',
      // component: () => import('@/views/TripList.vue')
      component: TripList,
    },
  ],
})

export default router
