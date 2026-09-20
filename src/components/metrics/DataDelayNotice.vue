<script setup>
import { useMetrics } from '@/composables/useMetrics'

defineProps({
  // 'banner' for page headers, 'inline' for a quieter line under a section
  variant: {
    type: String,
    default: 'banner',
    validator: (v) => ['banner', 'inline'].includes(v)
  }
})

const { isLagged, lagAdjective, asOfLabel } = useMetrics({ autoFetch: false })
</script>

<template>
  <p v-if="isLagged" class="delay-notice" :class="variant">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.25"/>
      <path d="M7 3.75V7L9 8.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>
      Figures are published on a {{ lagAdjective }} delay and are shown
      <strong>as at {{ asOfLabel }}</strong>.
    </span>
  </p>
</template>

<style scoped>
.delay-notice {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #475569;
  font-size: 0.8125rem;
  line-height: 1.4;
}

.delay-notice svg {
  flex-shrink: 0;
}

.delay-notice strong {
  font-weight: 600;
  color: #0F172A;
}

.delay-notice.banner {
  padding: 0.625rem 0.875rem;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
}

.delay-notice.inline {
  padding: 0;
  background: none;
  border: none;
}
</style>
