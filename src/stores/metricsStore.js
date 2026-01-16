import { defineStore } from 'pinia'
import { metricsService } from '@/services/metricsService'

// Mock data for development when backend is unavailable
const MOCK_OVERVIEW = {
  performance: {
    apy30d: 42.7,
    apy7d: 38.2,
    apyAllTime: 45.3,
    cumulativeReturnPct: 12.8
  },
  risk: {
    sharpeRatio30d: 2.4,
    maxDrawdownPct: 3.2,
    currentDrawdownPct: 0.8,
    volatility30d: 8.5
  },
  efficiency: {
    winRatePct: 87.3,
    capitalUtilizationPct: 72.5
  },
  activity: {
    openPositionsCount: 14,
    daysRunning: 127
  }
}

export const useMetricsStore = defineStore('metrics', {
  state: () => ({
    // Current overview data
    overview: null,

    // Historical chart data
    history: {
      apy30d: [],
      cumulativeReturnPct: []
    },

    // Monthly breakdown
    monthly: null,

    // UI state
    loading: false,
    error: null,
    lastUpdated: null,

    // Polling
    pollInterval: null
  }),

  getters: {
    isStale: (state) => {
      if (!state.lastUpdated) return true
      return Date.now() - state.lastUpdated > 5 * 60 * 1000 // 5 min
    },

    currentApy: (state) => {
      return state.overview?.performance?.apy30d ?? null
    },

    isPositive: (state) => {
      const apy = state.overview?.performance?.apy30d
      return apy !== null && apy >= 0
    },

    formattedApy: (state) => {
      const apy = state.overview?.performance?.apy30d
      if (apy === null || apy === undefined) return '--'
      return `${apy >= 0 ? '+' : ''}${apy.toFixed(1)}%`
    }
  },

  actions: {
    async fetchOverview() {
      this.loading = true
      this.error = null

      try {
        const response = await metricsService.getOverview()
        if (response.success) {
          this.overview = response.data
          this.lastUpdated = Date.now()
        } else {
          this.error = response.message || 'Failed to load metrics'
          this.useMockData()
        }
      } catch (err) {
        console.warn('[MetricsStore] Backend unavailable, using mock data')
        this.useMockData()
      } finally {
        this.loading = false
      }
    },

    useMockData() {
      this.overview = MOCK_OVERVIEW
      this.lastUpdated = Date.now()
      this.error = null
    },

    async fetchHistory(metric = 'apy30d', days = 30) {
      try {
        const response = await metricsService.getHistory(metric, days, 'daily')
        if (response.success) {
          this.history[metric] = response.data.series
        }
      } catch (err) {
        console.error('[MetricsStore] History error:', err)
      }
    },

    async fetchMonthly() {
      try {
        const response = await metricsService.getMonthly()
        if (response.success) {
          this.monthly = response.data
        }
      } catch (err) {
        console.error('[MetricsStore] Monthly error:', err)
      }
    },

    async fetchAll() {
      await Promise.all([
        this.fetchOverview(),
        this.fetchHistory('apy30d', 30),
        this.fetchHistory('cumulativeReturnPct', 90),
        this.fetchMonthly()
      ])
    },

    startPolling(intervalMs = 60000) {
      this.stopPolling()
      this.fetchOverview()
      this.pollInterval = setInterval(() => {
        this.fetchOverview()
      }, intervalMs)
    },

    stopPolling() {
      if (this.pollInterval) {
        clearInterval(this.pollInterval)
        this.pollInterval = null
      }
    }
  }
})
