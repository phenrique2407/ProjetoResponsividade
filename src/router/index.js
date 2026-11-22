import { createRouter, createWebHistory } from 'vue-router'
import { sections, challengePage } from '@/data/sections'

// Carregamento sob demanda (lazy loading): cada tela vira um arquivo JS
// separado e só é baixada quando a pessoa acessa a rota.
const views = {
  'secao-1': () => import('@/views/Section1.vue'),
  'secao-2': () => import('@/views/Section2.vue'),
  'secao-3': () => import('@/views/Section3.vue'),
  'secao-4': () => import('@/views/Section4.vue'),
  'secao-5': () => import('@/views/Section5.vue'),
}

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Início' },
  },
  ...sections.map((s) => ({
    path: s.path,
    name: s.name,
    component: views[s.name],
    meta: { title: `${s.number}. ${s.title}` },
  })),
  {
    path: challengePage.path,
    name: challengePage.name,
    component: () => import('@/views/ChallengeView.vue'),
    meta: { title: challengePage.title },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'nao-encontrada',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página não encontrada' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | Guia de Responsividade`
})

export default router
