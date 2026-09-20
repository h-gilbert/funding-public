import api from './api'
import {
  LAG_DAYS,
  isLagged,
  backendSupportsAsOf,
  canServeLaggedAggregates,
  asOfDate,
  asOfParam
} from '@/config/dataLag'

/**
 * The public API allows 20 requests per minute per IP, and replaying the
 * overview costs one request per metric. Only metrics the UI actually renders
 * are replayed. Adding one here costs every visitor another request.
 */
const REPLAYED_METRICS = [
  'apy30d',
  'apy7d',
  'apyAllTime',
  'cumulativeReturnPct',
  'capitalUtilizationPct',
  'maxDrawdownPct',
  'volatility30d'
]

/** Metrics the backend can replay historically (GET /public/stats/history). */
const HISTORY_METRICS = [
  'apy30d',
  'apy7d',
  'apyAllTime',
  'cumulativeReturnPct',
  'capitalUtilizationPct',
  'maxDrawdownPct',
  'currentDrawdownPct',
  'winRatePct',
  'volatility30d',
  'weeklyReturnPct',
  'monthlyReturnPct'
]

/** The backend clamps `days` to this, so asking for more silently truncates. */
const MAX_HISTORY_DAYS = 90

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Rebuilding the overview means one history request per metric. Fired all at
 * once they trip the backend's rate limiter, and a 429 would silently read as
 * "no value at the cutoff", so requests are throttled, deduplicated and
 * retried once.
 */
const MAX_CONCURRENT_HISTORY_REQUESTS = 2
const RETRY_DELAY_MS = 600

/**
 * A figure at a fixed past cutoff does not change, so responses are cached for
 * an hour and persisted for the session. Without this, a visitor moving
 * between pages re-spends the whole request budget on every navigation.
 */
const REQUEST_CACHE_TTL_MS = 60 * 60 * 1000
const REQUEST_CACHE_KEY = 'funding:api-cache:v1'

function createLimiter(max) {
  let active = 0
  const queue = []

  const next = () => {
    if (active >= max || !queue.length) return
    active++
    const { run, resolve, reject } = queue.shift()
    run().then(resolve, reject).finally(() => {
      active--
      next()
    })
  }

  return (run) => new Promise((resolve, reject) => {
    queue.push({ run, resolve, reject })
    next()
  })
}

const limit = createLimiter(MAX_CONCURRENT_HISTORY_REQUESTS)
const requestCache = new Map()

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function sessionCache() {
  try {
    return JSON.parse(sessionStorage.getItem(REQUEST_CACHE_KEY) || '{}')
  } catch {
    return {}
  }
}

function readPersisted(key) {
  const entry = sessionCache()[key]
  if (!entry || Date.now() - entry.at >= REQUEST_CACHE_TTL_MS) return null
  return entry.response
}

function persist(key, response) {
  try {
    const store = sessionCache()
    store[key] = { at: Date.now(), response }
    sessionStorage.setItem(REQUEST_CACHE_KEY, JSON.stringify(store))
  } catch {
    // Storage full or unavailable. The in-memory cache still applies.
  }
}

/** Throttled, deduplicated, session-cached GET against the public API. */
function fetchCached(path, params = {}) {
  // Keyed by the cutoff day so the cache turns over when the cutoff moves on.
  const key = JSON.stringify({ path, ...params, asOfDay: asOfDate().toISOString().slice(0, 10) })

  const cached = requestCache.get(key)
  if (cached && Date.now() - cached.at < REQUEST_CACHE_TTL_MS) return cached.promise

  const persisted = readPersisted(key)
  if (persisted) {
    const promise = Promise.resolve(persisted)
    requestCache.set(key, { at: Date.now(), promise })
    return promise
  }

  const promise = limit(async () => {
    try {
      return await api.get(path, { params })
    } catch (err) {
      if (err.response?.status !== 429) throw err
      await sleep(RETRY_DELAY_MS)
      return api.get(path, { params })
    }
  }).then(response => {
    if (response?.success) persist(key, response)
    return response
  }).catch(err => {
    requestCache.delete(key)
    // Rather than blank a figure because of a transient rate limit, fall back
    // to the last response for this exact cutoff, however old it is.
    const stale = sessionCache()[key]?.response
    if (stale) {
      console.warn(`[metricsService] Serving cached ${path} after error:`, err.message)
      return stale
    }
    throw err
  })

  requestCache.set(key, { at: Date.now(), promise })
  return promise
}

/**
 * Overview fields with no historical replay. While the lag is applied
 * client-side they are withheld rather than served at their live value.
 */
export const WITHHELD_WHILE_LAGGED = canServeLaggedAggregates
  ? []
  : [
      'performance.dailyReturnPct',
      'efficiency.fundingToFeeRatio',
      'activity.openPositionsCount',
      'activity.totalPositionsClosed',
      'activity.avgHoldTimeDays'
    ]

/** Query params to send when the backend can do the cutoff itself. */
function asOfParams(now) {
  return isLagged && backendSupportsAsOf ? { asOf: asOfParam(now) } : {}
}

function summarise(series) {
  if (!series.length) return { min: null, max: null, avg: null, latest: null, trend: 'flat' }
  const values = series.map(d => d.value).filter(v => typeof v === 'number')
  if (!values.length) return { min: null, max: null, avg: null, latest: null, trend: 'flat' }
  const latest = values[values.length - 1]
  const first = values[0]
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    avg: Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)),
    latest,
    trend: latest > first ? 'up' : latest < first ? 'down' : 'flat'
  }
}

/** Keep the `days`-long window that ends at the cutoff. */
function trimSeriesToAsOf(series, days, now = Date.now()) {
  const cutoff = asOfDate(now).getTime()
  const windowStart = cutoff - days * DAY_MS
  return series.filter(point => {
    const t = new Date(point.time).getTime()
    return !Number.isNaN(t) && t <= cutoff && t >= windowStart
  })
}

/** Latest value at or before the cutoff, or null if the series doesn't reach it. */
async function getValueAsOf(metric, now = Date.now()) {
  // Enough runway to land on a real data point even if the cutoff falls in a gap.
  const days = Math.min(Math.ceil(LAG_DAYS) + 7, MAX_HISTORY_DAYS)
  try {
    const response = await fetchCached('/public/stats/history', { metric, days, granularity: 'daily' })
    const series = response?.data?.series
    if (!response?.success || !Array.isArray(series)) return null

    const cutoff = asOfDate(now).getTime()
    const eligible = series
      .map(point => ({ t: new Date(point.time).getTime(), value: point.value }))
      .filter(point => !Number.isNaN(point.t) && point.t <= cutoff && typeof point.value === 'number')

    if (!eligible.length) return null
    return eligible[eligible.length - 1].value
  } catch (err) {
    console.error(`[metricsService] No lagged value for ${metric}:`, err.message)
    return null
  }
}

/**
 * Rebuild the overview as at the cutoff from replayable history.
 *
 * Only `daysRunning` is taken from the live overview, and only because it is a
 * clock rather than exchange data: its value at the cutoff is exactly today's
 * value minus the lag.
 */
async function composeLaggedOverview(now = Date.now()) {
  // Guards against a typo silently becoming a permanently null metric.
  const wanted = REPLAYED_METRICS.filter(m => HISTORY_METRICS.includes(m))
  const [values, live] = await Promise.all([
    Promise.all(wanted.map(metric => getValueAsOf(metric, now))),
    fetchCached('/public/stats/overview').catch(err => {
      console.error('[metricsService] Live overview unavailable:', err.message)
      return null
    })
  ])

  const at = Object.fromEntries(wanted.map((metric, i) => [metric, values[i]]))

  const liveDaysRunning = live?.data?.activity?.daysRunning
  const daysRunning = typeof liveDaysRunning === 'number'
    ? Math.max(0, Math.round(liveDaysRunning - LAG_DAYS))
    : null

  return {
    success: true,
    data: {
      performance: {
        apy30d: at.apy30d,
        apy7d: at.apy7d,
        apyAllTime: at.apyAllTime,
        cumulativeReturnPct: at.cumulativeReturnPct,
        monthlyReturnPct: at.monthlyReturnPct,
        weeklyReturnPct: at.weeklyReturnPct,
        dailyReturnPct: null
      },
      risk: {
        maxDrawdownPct: at.maxDrawdownPct,
        currentDrawdownPct: at.currentDrawdownPct,
        volatility30d: at.volatility30d
      },
      efficiency: {
        capitalUtilizationPct: at.capitalUtilizationPct,
        fundingToFeeRatio: null
      },
      activity: {
        daysRunning,
        totalPositionsClosed: null,
        openPositionsCount: null,
        avgHoldTimeDays: null
      },
      lastUpdated: asOfDate(now).toISOString()
    },
    meta: { asOf: asOfDate(now).toISOString(), lagged: true, source: 'history-replay' }
  }
}

/** Endpoints that can only be served at the cutoff by the backend. */
function unavailableWhileLagged(endpoint) {
  return {
    success: false,
    unavailable: true,
    error: `${endpoint} cannot be served as at the cutoff until the backend supports ?asOf=`
  }
}

export const metricsService = {
  /**
   * Performance overview as at the cutoff (percentages only)
   * Maps to: GET /api/public/stats/overview
   */
  async getOverview() {
    const now = Date.now()
    if (!isLagged) return api.get('/public/stats/overview')
    if (backendSupportsAsOf) {
      return api.get('/public/stats/overview', { params: asOfParams(now) })
    }
    return composeLaggedOverview(now)
  },

  /**
   * Capital metrics overview (percentages only)
   * Maps to: GET /api/public/capital/overview
   */
  async getCapitalOverview() {
    if (!canServeLaggedAggregates) return unavailableWhileLagged('Capital overview')
    return api.get('/public/capital/overview', { params: asOfParams() })
  },

  /**
   * Historical time series ending at the cutoff, for charting
   * Maps to: GET /api/public/stats/history
   * @param {string} metric - Metric name: 'apy30d', 'cumulativeReturnPct', etc.
   * @param {number} days - Length of the window to return (1-90)
   * @param {string} granularity - 'snapshot', 'daily', or 'weekly'
   */
  async getHistory(metric = 'apy30d', days = 30, granularity = 'daily') {
    const now = Date.now()

    if (!isLagged || backendSupportsAsOf) {
      return fetchCached('/public/stats/history', { metric, days, granularity, ...asOfParams(now) })
    }

    // Over-fetch so that, after dropping everything newer than the cutoff, the
    // window is still `days` long. The backend caps this at MAX_HISTORY_DAYS,
    // which shortens the window for near-maximum requests.
    const requestedDays = Math.min(days + Math.ceil(LAG_DAYS), MAX_HISTORY_DAYS)
    const response = await fetchCached('/public/stats/history', { metric, days: requestedDays, granularity })

    if (!response?.success || !Array.isArray(response?.data?.series)) return response

    const series = trimSeriesToAsOf(response.data.series, days, now)
    return {
      ...response,
      data: { ...response.data, days, series, summary: summarise(series) },
      meta: { ...(response.meta || {}), asOf: asOfDate(now).toISOString(), lagged: true }
    }
  },

  /**
   * Month-over-month performance
   * Maps to: GET /api/public/stats/monthly
   */
  async getMonthly() {
    if (!canServeLaggedAggregates) return unavailableWhileLagged('Monthly breakdown')
    return api.get('/public/stats/monthly', { params: asOfParams() })
  },

  /**
   * Return source attribution (percentages only)
   * Maps to: GET /api/public/stats/return-sources
   * @param {string} period - Time period: '7d', '30d', '90d', or 'all'
   */
  async getReturnSources(period = '30d') {
    if (!canServeLaggedAggregates) return unavailableWhileLagged('Return sources')
    return api.get('/public/stats/return-sources', {
      params: { period, ...asOfParams() }
    })
  },

  /**
   * Health check
   * Maps to: GET /api/public/health
   */
  async getHealth() {
    return api.get('/public/health')
  }
}
