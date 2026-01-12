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
      return `${sign}${num.toFixed(1)}%`
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
  <div class="stat-card" :title="tooltip">
    <div class="stat-label">{{ label }}</div>
    <div v-if="loading" class="stat-value animate-pulse">
      <span class="inline-block w-16 h-8 bg-gray-200 rounded"></span>
    </div>
    <div v-else class="stat-value" :class="valueClass">
      {{ formattedValue }}
    </div>
  </div>
</template>
