import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/sessionUser'

import HomeView from '@/components/HomeView.vue'
import DestinationsView from '@/components/DestinationsView.vue'
import CategoriesView from '@/components/CategoriesView.vue'
import DestinationDetails from '@/components/DestinationDetails.vue'
import ArrangementDetails from '@/components/ArrangementDetails.vue'
import AccomodationDetails from '@/components/AccomodationDetails.vue'
import OffersView from '@/components/OffersView.vue'
import AccomodationsView from '@/components/AccomodationsView.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Contact from '@/components/Contact.vue'
import About from '@/components/About.vue'
import Favorites from '@/components/Favorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false },
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: DestinationsView,
    },
    {
      path: '/destination-details/:id',
      name: 'destination-details',
      component: DestinationDetails,
    },
    {
      path: '/arrangement-details/:id',
      name: 'arrangement-details',
      component: ArrangementDetails,
    },
    {
      path: '/accomodation-details/:id',
      name: 'accomodation-details',
      component: AccomodationDetails,
    },
    {
      path: '/offers',
      name: 'offers',
      component: OffersView,
    },
    {
      path: '/hotels',
      name: 'hotels',
      component: AccomodationsView,
    },
    {
      path: '/categories/:id',
      name: 'categories',
      component: CategoriesView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      meta: { requiresAuth: true },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

router.beforeEach((to, from, next) => {
  const session = useSessionStore()

  if (to.meta.requiresAuth && !session.isLoggedIn) {
    next('/login')
    return
  }

  if ((to.name === 'login' || to.name === 'register') && session.isLoggedIn) {
    next('/') // ili dashboard/home
    return
  }

  // ✅ sve ok
  next()
})

export default router
