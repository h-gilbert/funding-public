<script setup>
import { computed } from 'vue'
import MetricCard from './MetricCard.vue'
import { useMetrics } from '@/composables/useMetrics'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

const { overview, loading } = useMetrics({ autoFetch: false })

const metrics = computed(() => {
  if (!overview.value) return []

  const { performance, risk, efficiency, activity } = overview.value

  if (props.compact) {
    // Show only key metrics for homepage
    return [
      { label: '30-Day APY', value: performance?.apy30d, format: 'percent' },
      { label: 'Win Rate', value: efficiency?.winRatePct, format: 'percent', showSign: false },
      { label: 'Total Return', value: performance?.cumulativeReturnPct, format: 'percent' },
      { label: 'Days Running', value: activity?.daysRunning, format: 'days' }
    ]
  }

  // Full metrics for performance page
  return [
    { label: '30-Day APY', value: performance?.apy30d, format: 'percent' },
    { label: '7-Day APY', value: performance?.apy7d, format: 'percent' },
    { label: 'All-Time APY', value: performance?.apyAllTime, format: 'percent' },
    { label: 'Total Return', value: performance?.cumulativeReturnPct, format: 'percent' },
    { label: 'Win Rate', value: efficiency?.winRatePct, format: 'percent', showSign: false },
    { label: 'Max Drawdown', value: risk?.maxDrawdownPct ? -Math.abs(risk.maxDrawdownPct) : null, format: 'percent' },
    { label: 'Current Drawdown', value: risk?.currentDrawdownPct ? -Math.abs(risk.currentDrawdownPct) : null, format: 'percent' },
    { label: 'Volatility (30d)', value: risk?.volatility30d, format: 'percent', showSign: false },
    { label: 'Capital Utilization', value: efficiency?.capitalUtilizationPct, format: 'percent', showSign: false },
    { label: 'Open Positions', value: activity?.openPositionsCount, format: 'number' },
    { label: 'Days Running', value: activity?.daysRunning, format: 'days' }
  ]
})
</script>

<template>
  <div
    class="grid gap-4"
    :class="compact ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'"
  >
    <MetricCard
      v-for="metric in metrics"
      :key="metric.label"
      :label="metric.label"
      :value="metric.value"
      :format="metric.format"
      :show-sign="metric.showSign !== false"
      :loading="loading"
    />
  </div>
</template>
