import api from './api'

export const metricsService = {
  /**
   * Get performance overview (percentages only)
   * Maps to: GET /api/public/stats/overview
   */
  async getOverview() {
    return api.get('/public/stats/overview')
  },

  /**
   * Get capital metrics overview (percentages only)
   * Maps to: GET /api/public/capital/overview
   */
  async getCapitalOverview() {
    return api.get('/public/capital/overview')
  },

  /**
   * Get historical time series data for charting
   * Maps to: GET /api/public/stats/history
   * @param {string} metric - Metric name: 'apy30d', 'cumulativeReturnPct', etc.
   * @param {number} days - Number of days (1-90)
   * @param {string} granularity - 'snapshot', 'daily', or 'weekly'
   */
  async getHistory(metric = 'apy30d', days = 30, granularity = 'daily') {
    return api.get('/public/stats/history', {
      params: { metric, days, granularity }
    })
  },

  /**
   * Get month-over-month performance
   * Maps to: GET /api/public/stats/monthly
   */
  async getMonthly() {
    return api.get('/public/stats/monthly')
  },

  /**
   * Health check
   * Maps to: GET /api/public/health
   */
  async getHealth() {
    return api.get('/public/health')
  }
}
