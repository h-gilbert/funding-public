<script setup>
import { asOfLabel } from '@/data/snapshot'
defineProps({ variant: { type: String, default: 'banner' } })
</script>

<template>
  <p class="text-sm text-text-secondary" :class="variant === 'banner' ? 'bg-background-secondary rounded-lg p-4' : ''">
    Bot retired. Final snapshot as at <strong>{{ asOfLabel }}</strong>.
    Figures are frozen and no longer update.
  </p>
</template>
