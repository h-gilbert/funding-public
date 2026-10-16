<script setup>
import { computed } from 'vue'
import MetricCard from './MetricCard.vue'
import { overview } from '@/data/snapshot'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

const loading = false

// Keep fields that were withheld from the final public snapshot hidden.
const isWithheld = (field) => {
  const [group, key] = field.split('.')
  return overview[group]?.[key] == null
}

const metrics = computed(() => {
  if (!overview) return []

  const { performance, risk, efficiency, activity } = overview

  const tooltips = {
    apy30d: 'Annualized percentage yield based on the last 30 days of returns',
    apy7d: 'Annualized percentage yield based on the last 7 days of returns',
    apyAllTime: 'Annualized percentage yield since strategy inception',
    totalReturn: 'Cumulative return since strategy inception, not annualized',
    maxDrawdown: 'Largest peak-to-trough decline in portfolio value',
    currentDrawdown: 'Current decline from the most recent portfolio peak',
    volatility: 'Standard deviation of daily returns over the past 30 days, annualized',
    capitalUtilization: 'Percentage of available capital deployed in positions',
    openPositions: 'Number of trading positions open',
    daysRunning: 'Number of days active at the final snapshot'
  }

  if (props.compact) {
    // Show only key metrics for homepage
    return [
      { field: 'performance.apy30d', label: '30-Day APY', value: performance?.apy30d, format: 'percent', tooltip: tooltips.apy30d },
      { field: 'performance.cumulativeReturnPct', label: 'Total Return', value: performance?.cumulativeReturnPct, format: 'percent', tooltip: tooltips.totalReturn },
      { field: 'activity.daysRunning', label: 'Days Active', value: activity?.daysRunning, format: 'days', tooltip: tooltips.daysRunning }
    ].filter(m => !isWithheld(m.field))
  }

  // Full metrics for performance page
  return [
    { field: 'performance.apy30d', label: '30-Day APY', value: performance?.apy30d, format: 'percent', tooltip: tooltips.apy30d },
    { field: 'performance.apy7d', label: '7-Day APY', value: performance?.apy7d, format: 'percent', tooltip: tooltips.apy7d },
    { field: 'performance.apyAllTime', label: 'All-Time APY', value: performance?.apyAllTime, format: 'percent', tooltip: tooltips.apyAllTime },
    { field: 'performance.cumulativeReturnPct', label: 'Total Return', value: performance?.cumulativeReturnPct, format: 'percent', tooltip: tooltips.totalReturn },
    { field: 'risk.maxDrawdownPct', label: 'Max Drawdown', value: risk?.maxDrawdownPct ? -Math.abs(risk.maxDrawdownPct) : null, format: 'percent', tooltip: tooltips.maxDrawdown },
    { field: 'risk.volatility30d', label: 'Volatility (30d)', value: risk?.volatility30d, format: 'percent', showSign: false, tooltip: tooltips.volatility },
    { field: 'efficiency.capitalUtilizationPct', label: 'Capital Utilization', value: efficiency?.capitalUtilizationPct, format: 'percent', showSign: false, tooltip: tooltips.capitalUtilization },
    { field: 'activity.openPositionsCount', label: 'Open Positions', value: activity?.openPositionsCount, format: 'number', tooltip: tooltips.openPositions },
    { field: 'activity.daysRunning', label: 'Days Active', value: activity?.daysRunning, format: 'days', tooltip: tooltips.daysRunning }
  ].filter(m => !isWithheld(m.field))
})
</script>

<template>
  <div
    class="grid gap-4"
    :class="compact ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'"
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
