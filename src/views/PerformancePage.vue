<script setup>
import { onMounted } from 'vue'
import { useMetricsStore } from '@/stores/metricsStore'
import MetricsGrid from '@/components/metrics/MetricsGrid.vue'
import LiveIndicator from '@/components/metrics/LiveIndicator.vue'

const store = useMetricsStore()

onMounted(() => {
  store.fetchAll()
  store.startPolling(60000)
})
</script>

<template>
  <div class="performance-page">
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-top">
          <span class="label">Live Dashboard</span>
          <LiveIndicator />
        </div>
        <h1 class="title">Performance Metrics</h1>
        <p class="subtitle">
          Real-time performance data updated every minute.
        </p>
      </div>
    </section>

    <!-- Full Metrics Grid -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">All Metrics</h2>
        <MetricsGrid />

        <div class="last-updated" v-if="store.lastUpdated">
          Last updated: {{ new Date(store.lastUpdated).toLocaleTimeString() }}
        </div>
      </div>
    </section>

    <!-- Monthly Breakdown -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Monthly Returns</h2>
        <p class="section-subtitle">Month-over-month performance breakdown</p>

        <!-- YTD Summary -->
        <div class="ytd-card" v-if="store.monthly?.ytd">
          <div class="ytd-header">
            <span class="ytd-label">Year to Date</span>
            <span class="ytd-year">{{ new Date().getFullYear() }}</span>
          </div>
          <div class="ytd-stats">
            <div class="ytd-stat">
              <span class="ytd-stat-value" :class="{ positive: store.monthly.ytd.returnPct >= 0, negative: store.monthly.ytd.returnPct < 0 }">
                {{ store.monthly.ytd.returnPct >= 0 ? '+' : '' }}{{ store.monthly.ytd.returnPct?.toFixed(2) || 0 }}%
              </span>
              <span class="ytd-stat-label">Return</span>
            </div>
            <div class="ytd-stat">
              <span class="ytd-stat-value neutral">{{ store.monthly.ytd.positionsClosed || 0 }}</span>
              <span class="ytd-stat-label">Positions</span>
            </div>
            <div class="ytd-stat">
              <span class="ytd-stat-value neutral">{{ store.monthly.ytd.winRatePct?.toFixed(1) || 0 }}%</span>
              <span class="ytd-stat-label">Win Rate</span>
            </div>
          </div>
        </div>

        <div class="monthly-grid" v-if="store.monthly?.months?.length">
          <div
            v-for="month in store.monthly.months"
            :key="month.month"
            class="month-card"
          >
            <div class="month-name">{{ formatMonth(month.month) }}</div>
            <div
              class="month-return"
              :class="{ positive: month.returnPct >= 0, negative: month.returnPct < 0 }"
              title="Total return for this month (not annualized)"
            >
              {{ month.returnPct >= 0 ? '+' : '' }}{{ month.returnPct?.toFixed(2) || 0 }}%
            </div>
            <div class="month-stats" v-if="month.positionsClosed > 0">
              <span>{{ month.positionsClosed }} positions</span>
              <span>{{ month.winRatePct?.toFixed(0) || 0 }}% win rate</span>
            </div>
          </div>
        </div>

        <div class="empty-state" v-else>
          <p>No monthly data available yet</p>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="disclaimer-section">
      <div class="container">
        <div class="disclaimer-content">
          <svg class="disclaimer-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="8" cy="5" r="0.75" fill="currentColor"/>
          </svg>
          <p>
            Past performance does not guarantee future results · All metrics from real trading data · Auto-refreshes every 60s
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    formatMonth(monthStr) {
      if (!monthStr) return ''
      const [year, month] = monthStr.split('-')
      const date = new Date(year, parseInt(month) - 1)
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

.performance-page {
  --color-bg: #FAFBFC;
  --color-surface: #FFFFFF;
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #94A3B8;
  --color-accent: #0066FF;
  --color-profit: #00C853;
  --color-loss: #FF3B30;
  --color-border: rgba(0, 0, 0, 0.06);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero */
.hero {
  padding: 5rem 0 3rem;
  background: var(--color-bg);
}

.hero-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 0.75rem;
}

.subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 500px;
  line-height: 1.6;
  margin: 0;
}

/* Sections */
.section {
  padding: 4rem 0;
}

.section-alt {
  background: var(--color-bg);
}

.section-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}

.section-subtitle {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin: 0 0 2rem;
}

.last-updated {
  margin-top: 1.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

/* YTD Card */
.ytd-card {
  background: linear-gradient(135deg, var(--color-accent) 0%, #0052CC 100%);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  color: white;
}

.ytd-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.ytd-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.ytd-year {
  font-family: 'SF Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.7;
}

.ytd-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.ytd-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ytd-stat-value {
  font-family: 'SF Mono', monospace;
  font-size: 1.75rem;
  font-weight: 700;
}

.ytd-stat-value.positive {
  color: #7CFF9B;
}

.ytd-stat-value.negative {
  color: #FF8A80;
}

.ytd-stat-value.neutral {
  color: white;
}

.ytd-stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Monthly Grid */
.monthly-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.month-card {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

.month-name {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.month-return {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'SF Mono', monospace;
  margin-bottom: 0.75rem;
}

.month-return.positive {
  color: var(--color-profit);
}

.month-return.negative {
  color: var(--color-loss);
}

.month-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
}

/* Disclaimer */
.disclaimer-section {
  padding: 2rem 0 4rem;
  border-top: 1px solid var(--color-border);
}

.disclaimer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  text-align: center;
}

.disclaimer-icon {
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.disclaimer-content p {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .disclaimer-content {
    flex-direction: column;
    gap: 0.5rem;
  }

  .disclaimer-content p {
    font-size: 0.75rem;
  }
}
</style>
