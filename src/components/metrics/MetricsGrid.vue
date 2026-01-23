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

  const tooltips = {
    apy30d: 'Annualized percentage yield based on the last 30 days of returns',
    apy7d: 'Annualized percentage yield based on the last 7 days of returns',
    apyAllTime: 'Annualized percentage yield since strategy inception',
    totalReturn: 'Cumulative return since strategy inception, not annualized',
    winRate: 'Percentage of closed positions that were profitable',
    maxDrawdown: 'Largest peak-to-trough decline in portfolio value',
    currentDrawdown: 'Current decline from the most recent portfolio peak',
    volatility: 'Standard deviation of daily returns over the past 30 days, annualized',
    capitalUtilization: 'Percentage of available capital currently deployed in positions',
    openPositions: 'Number of active trading positions currently open',
    daysRunning: 'Total number of days the strategy has been active'
  }

  if (props.compact) {
    // Show only key metrics for homepage
    return [
      { label: '30-Day APY', value: performance?.apy30d, format: 'percent', tooltip: tooltips.apy30d },
      { label: 'Win Rate', value: efficiency?.winRatePct, format: 'percent', showSign: false, tooltip: tooltips.winRate },
      { label: 'Total Return', value: performance?.cumulativeReturnPct, format: 'percent', tooltip: tooltips.totalReturn },
      { label: 'Days Running', value: activity?.daysRunning, format: 'days', tooltip: tooltips.daysRunning }
    ]
  }

  // Full metrics for performance page
  return [
    { label: '30-Day APY', value: performance?.apy30d, format: 'percent', tooltip: tooltips.apy30d },
    { label: '7-Day APY', value: performance?.apy7d, format: 'percent', tooltip: tooltips.apy7d },
    { label: 'All-Time APY', value: performance?.apyAllTime, format: 'percent', tooltip: tooltips.apyAllTime },
    { label: 'Total Return', value: performance?.cumulativeReturnPct, format: 'percent', tooltip: tooltips.totalReturn },
    { label: 'Win Rate', value: efficiency?.winRatePct, format: 'percent', showSign: false, tooltip: tooltips.winRate },
    { label: 'Max Drawdown', value: risk?.maxDrawdownPct ? -Math.abs(risk.maxDrawdownPct) : null, format: 'percent', tooltip: tooltips.maxDrawdown },
    { label: 'Volatility (30d)', value: risk?.volatility30d, format: 'percent', showSign: false, tooltip: tooltips.volatility },
    { label: 'Capital Utilization', value: efficiency?.capitalUtilizationPct, format: 'percent', showSign: false, tooltip: tooltips.capitalUtilization },
    { label: 'Open Positions', value: activity?.openPositionsCount, format: 'number', tooltip: tooltips.openPositions },
    { label: 'Days Running', value: activity?.daysRunning, format: 'days', tooltip: tooltips.daysRunning }
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
      :tooltip="metric.tooltip"
    />
  </div>
</template>
