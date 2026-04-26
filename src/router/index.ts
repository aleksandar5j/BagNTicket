import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/components/HomeView.vue'
import DestinationsView from '@/components/DestinationsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: DestinationsView,
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    // uvek na vrh za nove rute
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
