<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    default: null
  },
  format: {
    type: String,
    default: 'percent', // 'percent', 'ratio', 'days', 'number'
    validator: (v) => ['percent', 'ratio', 'days', 'number'].includes(v)
  },
  showSign: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  tooltip: {
    type: String,
    default: ''
  }
})

const formattedValue = computed(() => {
  if (props.value === null || props.value === undefined) return '--'

  const num = parseFloat(props.value)
  if (isNaN(num)) return '--'

  switch (props.format) {
    case 'percent':
      const sign = props.showSign && num >= 0 ? '+' : ''
      return `${sign}${num.toFixed(2)}%`
    case 'ratio':
      return num.toFixed(2)
    case 'days':
      return `${Math.round(num)} days`
    case 'number':
      return num.toLocaleString()
    default:
      return num.toString()
  }
})

const valueClass = computed(() => {
  if (props.value === null || props.value === undefined) return ''

  const num = parseFloat(props.value)
  if (isNaN(num)) return ''

  if (props.format === 'percent' || props.format === 'ratio') {
    if (num > 0) return 'positive'
    if (num < 0) return 'negative'
  }
  return ''
})
</script>

<template>
  <div class="stat-card">
    <div class="stat-label">
      {{ label }}
      <span v-if="tooltip" class="info-icon" :data-tooltip="tooltip">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.25"/>
          <path d="M7 6.5V10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
          <circle cx="7" cy="4.5" r="0.75" fill="currentColor"/>
        </svg>
      </span>
    </div>
    <div v-if="loading" class="stat-value animate-pulse">
      <span class="inline-block w-16 h-8 bg-gray-200 rounded"></span>
    </div>
    <div v-else class="stat-value" :class="valueClass">
      {{ formattedValue }}
    </div>
  </div>
</template>
