import { defineStore } from 'pinia'
import { metricsService } from '@/services/metricsService'
import {
  LAG_DAYS,
  isLagged,
  canServeLaggedAggregates,
  asOfDate,
  formatAsOf,
  lagLabel,
  lagAdjective
} from '@/config/dataLag'

/** Polling faster than this is pointless when the data is days old. */
const LAGGED_MIN_POLL_MS = 5 * 60 * 1000

export const useMetricsStore = defineStore('metrics', {
  state: () => ({
    // Overview as at the cutoff, from /public/stats/overview (or replayed history)
    overview: null,

    // Capital metrics from /public/capital/overview
    capital: null,

    // Historical chart data from /public/stats/history, ending at the cutoff
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

    // The date the published figures are reported as at
    asOf: isLagged ? asOfDate().toISOString() : null,

    // Polling
    pollInterval: null
  }),

  getters: {
    isLagged: () => isLagged,

    lagDays: () => LAG_DAYS,

    lagLabel: () => lagLabel(),

    /** Adjective form, for "a 7-day delay". */
    lagAdjective: () => lagAdjective(),

    /** Human-readable cutoff date, e.g. "13 Sep 2026". */
    asOfLabel: (state) => (state.asOf ? formatAsOf(new Date(state.asOf)) : '--'),

    /** Monthly / return-source / capital figures can't be back-dated client-side. */
    showsAggregates: () => canServeLaggedAggregates,

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
          this.asOf = response.meta?.asOf ?? (isLagged ? asOfDate().toISOString() : null)
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
      if (!canServeLaggedAggregates) return
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
      if (!canServeLaggedAggregates) return
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
      if (!canServeLaggedAggregates) return
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
      const interval = isLagged ? Math.max(intervalMs, LAGGED_MIN_POLL_MS) : intervalMs
      this.fetchOverview()
      this.pollInterval = setInterval(() => {
        this.fetchOverview()
      }, interval)
    },

    stopPolling() {
      if (this.pollInterval) {
        clearInterval(this.pollInterval)
        this.pollInterval = null
      }
    }
  }
})
