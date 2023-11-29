import { createRouter, createWebHistory } from 'vue-router'
import TripDetail from '@/views/TripDetail.vue'
import TripList from '@/views/TripList.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import ForbiddenPage from '@/views/ForbiddenPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/trips',
      name: 'TripList',
      // component: () => import('@/views/TripList.vue')
      component: TripList,
    },
    {
      path: '/trips/:tripId',
      name: 'TripDetail',
      // component: () => import('@/views/TripDetail.vue')
      component: TripDetail,
    },
    {
      path: '/403',
      name: 'Forbidden',
      // component: () => import('@/views/ForbiddenPage.vue')
      component: ForbiddenPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      // component: () => import('@/views/NotFoundPage.vue')
      component: NotFoundPage,
    },
  ],
})

export default router
