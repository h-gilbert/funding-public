import { computed, onMounted, onUnmounted } from 'vue'
import { useMetricsStore } from '@/stores/metricsStore'

export function useMetrics(options = {}) {
  const { autoFetch = true, pollInterval = 60000 } = options
  const store = useMetricsStore()

  const overview = computed(() => store.overview)
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
  const cumulativeReturn = computed(() => store.overview?.performance?.cumulativeReturnPct ?? null)
  const sharpeRatio = computed(() => store.overview?.risk?.sharpeRatio30d ?? null)
  const winRate = computed(() => store.overview?.efficiency?.winRatePct ?? null)
  const daysRunning = computed(() => store.overview?.activity?.daysRunning ?? null)

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
    performance,
    risk,
    efficiency,
    activity,

    // Key metrics
    apy30d,
    cumulativeReturn,
    sharpeRatio,
    winRate,
    daysRunning,

    // UI state
    loading,
    error,
    lastUpdated,

    // Actions
    refresh,
    fetchAll
  }
}
