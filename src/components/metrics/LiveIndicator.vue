<script setup>
import { computed } from 'vue'
import { useMetrics } from '@/composables/useMetrics'

const { apyAllTime, loading } = useMetrics({ autoFetch: false })

const formattedApy = computed(() => {
  if (loading.value || apyAllTime.value === null) return '--'
  const sign = apyAllTime.value >= 0 ? '+' : ''
  return `${sign}${apyAllTime.value.toFixed(1)}%`
})

const isPositive = computed(() => {
  return apyAllTime.value !== null && apyAllTime.value >= 0
})
</script>

<template>
  <div
    class="live-badge"
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
    <span class="info-icon" data-tooltip="Annualized percentage yield since strategy inception">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.25"/>
        <path d="M7 6.5V10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
        <circle cx="7" cy="4.5" r="0.75" fill="currentColor"/>
      </svg>
    </span>
  </div>
</template>

<style scoped>
.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.info-icon {
  cursor: help;
  opacity: 0.6;
  transition: opacity 0.15s;
  position: relative;
  display: inline-flex;
}

.info-icon:hover {
  opacity: 1;
}

.info-icon[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  transform: translateX(-50%);
  padding: 8px 12px;
  background: #0F172A;
  color: white;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  white-space: normal;
  width: max-content;
  max-width: 220px;
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s, visibility 0.15s;
  z-index: 100;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.info-icon[data-tooltip]::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: calc(100% + 2px);
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #0F172A;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s, visibility 0.15s;
  z-index: 100;
}

.info-icon[data-tooltip]:hover::after,
.info-icon[data-tooltip]:hover::before {
  opacity: 1;
  visibility: visible;
}
</style>
