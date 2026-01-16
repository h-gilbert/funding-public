import { defineStore } from 'pinia'
import { metricsService } from '@/services/metricsService'

export const useMetricsStore = defineStore('metrics', {
  state: () => ({
    // Current overview data from /public/stats/overview
    overview: null,

    // Capital metrics from /public/capital/overview
    capital: null,

    // Historical chart data from /public/stats/history
    history: {
      apy30d: [],
      cumulativeReturnPct: []
    },

    // Monthly breakdown from /public/stats/monthly
    monthly: null,

    // Return sources breakdown from /public/stats/return-sources
    returnSources: null,

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
    },

    hasData: (state) => {
      return state.overview !== null
    }
  },

  actions: {
    async fetchOverview() {
      this.loading = true
      this.error = null

      try {
        const response = await metricsService.getOverview()
        if (response.success && response.data) {
          this.overview = response.data
          this.lastUpdated = Date.now()
        } else {
          this.error = 'No data available yet'
        }
      } catch (err) {
        console.error('[MetricsStore] Overview error:', err)
        this.error = 'Failed to load metrics'
      } finally {
        this.loading = false
      }
    },

    async fetchCapital() {
      try {
        const response = await metricsService.getCapitalOverview()
        if (response.success && response.data) {
          this.capital = response.data
        }
      } catch (err) {
        console.error('[MetricsStore] Capital error:', err)
      }
    },

    async fetchHistory(metric = 'apy30d', days = 30, granularity = 'daily') {
      try {
        const response = await metricsService.getHistory(metric, days, granularity)
        if (response.success && response.data) {
          this.history[metric] = response.data.series.map(d => ({
            time: d.time,
            value: d.value
          }))
        }
      } catch (err) {
        console.error('[MetricsStore] History error:', err)
      }
    },

    async fetchMonthly() {
      try {
        const response = await metricsService.getMonthly()
        if (response.success && response.data) {
          this.monthly = response.data
        }
      } catch (err) {
        console.error('[MetricsStore] Monthly error:', err)
      }
    },

    async fetchReturnSources(period = '30d') {
      try {
        const response = await metricsService.getReturnSources(period)
        if (response.success && response.data) {
          this.returnSources = response.data
        }
      } catch (err) {
        console.error('[MetricsStore] Return sources error:', err)
      }
    },

    async fetchAll() {
      await Promise.all([
        this.fetchOverview(),
        this.fetchCapital(),
        this.fetchHistory('apy30d', 30),
        this.fetchHistory('cumulativeReturnPct', 90),
        this.fetchMonthly(),
        this.fetchReturnSources('30d')
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
