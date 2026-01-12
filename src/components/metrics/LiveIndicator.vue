<script setup>
import { computed } from 'vue'
import { useMetrics } from '@/composables/useMetrics'

const { apy30d, loading } = useMetrics({ autoFetch: false })

const formattedApy = computed(() => {
  if (loading.value || apy30d.value === null) return '--'
  const sign = apy30d.value >= 0 ? '+' : ''
  return `${sign}${apy30d.value.toFixed(1)}%`
})

const isPositive = computed(() => {
  return apy30d.value !== null && apy30d.value >= 0
})
</script>

<template>
  <div
    class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold font-mono"
    :class="isPositive ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'"
  >
    <span class="relative flex h-2 w-2">
      <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        :class="isPositive ? 'bg-profit' : 'bg-loss'"
      ></span>
      <span
        class="relative inline-flex rounded-full h-2 w-2"
        :class="isPositive ? 'bg-profit' : 'bg-loss'"
      ></span>
    </span>
    <span>{{ formattedApy }} APY</span>
  </div>
</template>
