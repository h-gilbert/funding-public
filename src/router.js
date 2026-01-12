import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      title: 'Delta-Neutral Funding Strategy',
      description: 'Automated delta-neutral funding rate strategy with live performance metrics.'
    }
  },
  {
    path: '/performance',
    name: 'Performance',
    component: () => import('@/views/PerformancePage.vue'),
    meta: {
      title: 'Performance | Delta-Neutral Strategy',
      description: 'Live APY, ROI, Sharpe ratio, and historical performance charts.'
    }
  },
  {
    path: '/strategy',
    name: 'Strategy',
    component: () => import('@/views/StrategyPage.vue'),
    meta: {
      title: 'How It Works | Delta-Neutral Strategy',
      description: 'Understanding delta-neutral funding rate arbitrage and risk mitigation.'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogListPage.vue'),
    meta: {
      title: 'Blog | Delta-Neutral Strategy',
      description: 'Technical articles on building automated trading systems.'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('@/views/BlogPostPage.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: {
      title: '404 - Page Not Found'
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
