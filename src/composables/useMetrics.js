import { computed, onMounted, onUnmounted } from 'vue'
import { useMetricsStore } from '@/stores/metricsStore'

export function useMetrics(options = {}) {
  const { autoFetch = true, pollInterval = 60000 } = options
  const store = useMetricsStore()

  const overview = computed(() => store.overview)
  const capital = computed(() => store.capital)
  const monthly = computed(() => store.monthly)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const lastUpdated = computed(() => store.lastUpdated)

  // Performance metrics
  const performance = computed(() => store.overview?.performance || null)
  const risk = computed(() => store.overview?.risk || null)
  const efficiency = computed(() => store.overview?.efficiency || null)
  const activity = computed(() => store.overview?.activity || null)

  // Key metrics shortcuts
  const apy30d = computed(() => store.overview?.performance?.apy30d ?? null)
  const apy7d = computed(() => store.overview?.performance?.apy7d ?? null)
  const apyAllTime = computed(() => store.overview?.performance?.apyAllTime ?? null)
  const cumulativeReturn = computed(() => store.overview?.performance?.cumulativeReturnPct ?? null)
  const monthlyReturn = computed(() => store.overview?.performance?.monthlyReturnPct ?? null)
  const weeklyReturn = computed(() => store.overview?.performance?.weeklyReturnPct ?? null)
  const dailyReturn = computed(() => store.overview?.performance?.dailyReturnPct ?? null)
  const maxDrawdown = computed(() => store.overview?.risk?.maxDrawdownPct ?? null)
  const currentDrawdown = computed(() => store.overview?.risk?.currentDrawdownPct ?? null)
  const volatility = computed(() => store.overview?.risk?.volatility30d ?? null)
  const winRate = computed(() => store.overview?.efficiency?.winRatePct ?? null)
  const capitalUtilization = computed(() => store.overview?.efficiency?.capitalUtilizationPct ?? null)
  const fundingToFeeRatio = computed(() => store.overview?.efficiency?.fundingToFeeRatio ?? null)
  const daysRunning = computed(() => store.overview?.activity?.daysRunning ?? null)
  const openPositions = computed(() => store.overview?.activity?.openPositionsCount ?? null)
  const totalPositionsClosed = computed(() => store.overview?.activity?.totalPositionsClosed ?? null)

  // Capital metrics
  const capitalReturnPct = computed(() => store.capital?.returnPct ?? null)
  const realizedApy = computed(() => store.capital?.realizedApy ?? null)

  onMounted(() => {
    if (autoFetch) {
      store.startPolling(pollInterval)
    }
  })

  onUnmounted(() => {
    store.stopPolling()
  })

  const refresh = () => store.fetchOverview()
  const fetchAll = () => store.fetchAll()

  return {
    // Data
    overview,
    capital,
    monthly,
    performance,
    risk,
    efficiency,
    activity,

    // Performance metrics
    apy30d,
    apy7d,
    apyAllTime,
    cumulativeReturn,
    monthlyReturn,
    weeklyReturn,
    dailyReturn,

    // Risk metrics
    maxDrawdown,
    currentDrawdown,
    volatility,

    // Efficiency metrics
    winRate,
    capitalUtilization,
    fundingToFeeRatio,

    // Activity metrics
    daysRunning,
    openPositions,
    totalPositionsClosed,

    // Capital metrics
    capitalReturnPct,
    realizedApy,

    // UI state
    loading,
    error,
    lastUpdated,

    // Actions
    refresh,
    fetchAll
  }
}
