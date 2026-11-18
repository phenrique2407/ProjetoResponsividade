import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ChallengeView from '../views/ChallengeView.vue'
import Section1 from '../views/Section1.vue'
import Section2 from '../views/Section2.vue'
import Section3 from '../views/Section3.vue'
import Section4 from '../views/Section4.vue'
import Section5 from '../views/Section5.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: ChallengeView,
    },
    {
      path: '/section-1',
      name: 'section-1',
      component: Section1,
    },
    {
      path: '/section-2',
      name: 'section-2',
      component: Section2,
    },
    {
      path: '/section-3',
      name: 'section-3',
      component: Section3,
    },
    {
      path: '/section-4',
      name: 'section-4',
      component: Section4,
    },
    {
      path: '/section-5',
      name: 'section-5',
      component: Section5,
    },
  ],
})

export default router
