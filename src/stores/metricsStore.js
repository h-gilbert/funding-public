import { defineStore } from 'pinia'
import { metricsService } from '@/services/metricsService'

/**
 * Transform backend summary response to frontend format
 */
function transformSummary(data) {
  return {
    performance: {
      apy30d: parseFloat(data.apy_30d) || 0,
      apy7d: parseFloat(data.apy_7d) || 0,
      apyAllTime: parseFloat(data.apy_all_time) || 0,
      cumulativeReturnPct: parseFloat(data.cumulative_return_pct) || 0
    },
    risk: {
      sharpeRatio30d: parseFloat(data.sharpe_ratio_30d) || 0,
      maxDrawdownPct: parseFloat(data.max_drawdown_pct) || 0,
      currentDrawdownPct: parseFloat(data.current_drawdown_pct) || 0,
      volatility30d: parseFloat(data.volatility_30d) || 0
    },
    efficiency: {
      winRatePct: parseFloat(data.position_win_rate) || 0,
      capitalUtilizationPct: parseFloat(data.capital_utilization_pct) || 0,
      fundingToFeeRatio: parseFloat(data.funding_to_fee_ratio) || 0
    },
    activity: {
      openPositionsCount: data.open_positions_count || 0,
      daysRunning: data.days_running || 0
    },
    lastUpdated: data.last_updated
  }
}

/**
 * Transform backend rollups response to monthly format
 */
function transformRollups(periods) {
  return {
    months: periods.map(p => ({
      month: p.period.substring(0, 7), // "2026-01-16T00:00:00.000Z" -> "2026-01"
      returnPct: parseFloat(p.period_pnl) / parseFloat(p.ending_balance) * 100 || 0,
      positionsClosed: p.positions_closed || 0,
      winRatePct: 0, // Not available in rollups
      funding: parseFloat(p.period_funding) || 0,
      fees: parseFloat(p.period_fees) || 0
    }))
  }
}

export const useMetricsStore = defineStore('metrics', {
  state: () => ({
    // Current overview data (transformed)
    overview: null,

    // Raw summary from backend
    rawSummary: null,

    // Return sources breakdown
    returnSources: null,

    // Historical chart data
    history: {
      apy_30d: [],
      cumulative_net_pnl: []
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
    },

    hasData: (state) => {
      return state.rawSummary?.hasData ?? false
    }
  },

  actions: {
    async fetchOverview() {
      this.loading = true
      this.error = null

      try {
        const data = await metricsService.getSummary()
        if (data.hasData) {
          this.rawSummary = data
          this.overview = transformSummary(data)
          this.lastUpdated = Date.now()
        } else {
          this.error = data.message || 'No data available yet'
        }
      } catch (err) {
        console.error('[MetricsStore] Summary error:', err)
        this.error = 'Failed to load metrics'
      } finally {
        this.loading = false
      }
    },

    async fetchReturnSources(period = '30d') {
      try {
        const response = await metricsService.getReturnSources(period)
        if (response.success) {
          this.returnSources = response.data
        }
      } catch (err) {
        console.error('[MetricsStore] Return sources error:', err)
      }
    },

    async fetchHistory(metric = 'apy_30d', days = 30) {
      try {
        const response = await metricsService.getChartData(metric, days)
        if (response.data) {
          this.history[metric] = response.data.map(d => ({
            time: d.time,
            value: d.value
          }))
        }
      } catch (err) {
        console.error('[MetricsStore] Chart data error:', err)
      }
    },

    async fetchMonthly() {
      try {
        const response = await metricsService.getRollups('monthly')
        if (response.periods) {
          this.monthly = transformRollups(response.periods)
        }
      } catch (err) {
        console.error('[MetricsStore] Rollups error:', err)
      }
    },

    async fetchAll() {
      await Promise.all([
        this.fetchOverview(),
        this.fetchReturnSources('30d'),
        this.fetchHistory('apy_30d', 30),
        this.fetchHistory('cumulative_net_pnl', 90),
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
