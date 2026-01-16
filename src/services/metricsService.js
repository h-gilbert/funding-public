import api from './api'

export const metricsService = {
  /**
   * Get the summary of all key metrics
   * Maps to: GET /api/metrics/summary
   */
  async getSummary() {
    return api.get('/metrics/summary')
  },

  /**
   * Get return source attribution breakdown
   * Maps to: GET /api/metrics/return-sources
   * @param {string} period - Time period: '7d', '30d', '90d', or 'all'
   */
  async getReturnSources(period = '30d') {
    return api.get('/metrics/return-sources', {
      params: { period }
    })
  },

  /**
   * Get historical time series data for charting
   * Maps to: GET /api/metrics/chart-data
   * @param {string} metric - The metric name (e.g., 'apy_30d', 'cumulative_net_pnl')
   * @param {number} days - Number of days of history
   */
  async getChartData(metric = 'apy_30d', days = 30) {
    return api.get('/metrics/chart-data', {
      params: { metric, days }
    })
  },

  /**
   * Get aggregated metrics by time period (monthly breakdown)
   * Maps to: GET /api/metrics/rollups
   * @param {string} granularity - 'daily', 'weekly', or 'monthly'
   */
  async getRollups(granularity = 'monthly') {
    return api.get('/metrics/rollups', {
      params: { granularity }
    })
  },

  /**
   * Get the latest metrics snapshot
   * Maps to: GET /api/metrics/latest
   */
  async getLatest() {
    return api.get('/metrics/latest')
  },

  /**
   * Get performance KPIs with period comparisons
   * Maps to: GET /api/metrics/performance
   */
  async getPerformance() {
    return api.get('/metrics/performance')
  }
}
