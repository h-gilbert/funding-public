import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      title: 'Archived | Delta-Neutral Funding Strategy',
      description: 'Archived funding rate arbitrage project. The bot is retired. Its final published snapshot is preserved with no live data connection.'
    }
  },
  {
    path: '/performance',
    name: 'Performance',
    component: () => import('@/views/PerformancePage.vue'),
    meta: {
      title: 'Final snapshot | Retired Delta-Neutral Bot',
      description: 'Final published performance snapshot of the retired delta-neutral funding bot. Figures no longer update.'
    }
  },
  {
    path: '/strategy',
    name: 'Strategy',
    component: () => import('@/views/StrategyPage.vue'),
    meta: {
      title: 'Archived strategy | Delta-Neutral Strategy',
      description: 'How delta-neutral funding rate capture works, and what can go wrong.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: {
      title: '404 - Page not found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

// Update document title and meta on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Delta-Neutral Strategy'

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }

  next()
})

export default router
