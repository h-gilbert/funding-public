import api from './api'

export const metricsService = {
  /**
   * Get the overview of all key metrics
   */
  async getOverview() {
    return api.get('/public/stats/overview')
  },

  /**
   * Get historical time series data for a specific metric
   * @param {string} metric - The metric name (e.g., 'apy30d', 'cumulativeReturnPct')
   * @param {number} days - Number of days of history (7, 14, 30, 60, 90)
   * @param {string} granularity - 'snapshot', 'daily', or 'weekly'
   */
  async getHistory(metric = 'apy30d', days = 30, granularity = 'daily') {
    return api.get('/public/stats/history', {
      params: { metric, days, granularity }
    })
  },

  /**
   * Get monthly performance breakdown
   */
  async getMonthly() {
    return api.get('/public/stats/monthly')
  },

  /**
   * Health check for the API
   */
  async healthCheck() {
    return api.get('/public/health')
  }
}
