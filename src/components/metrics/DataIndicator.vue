<script setup>
import { overview, asOfLabel } from '@/data/snapshot'
const apy = overview.performance.apyAllTime
</script>

<template>
  <div class="inline-flex flex-wrap items-center gap-2 rounded-full bg-background-tertiary px-4 py-2 text-sm font-medium text-text-secondary">
    <span>Bot retired</span>
    <span>{{ apy >= 0 ? '+' : '' }}{{ apy.toFixed(1) }}% APY as at {{ asOfLabel }}</span>
  </div>
</template>
