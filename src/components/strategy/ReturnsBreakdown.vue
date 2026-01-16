<script setup>
import { computed } from 'vue'
import { useMetrics } from '@/composables/useMetrics'

const { overview, loading } = useMetrics({ autoFetch: false })

// Derive what we can from public API data
// Note: The public API doesn't provide detailed return source breakdown
// We show available metrics and indicate detailed breakdown is internal only
const data = computed(() => {
  if (!overview.value) return null

  const perf = overview.value.performance
  const eff = overview.value.efficiency

  return {
    // Total return is available
    totalReturn: perf?.cumulativeReturnPct || 0,
    monthlyReturn: perf?.monthlyReturnPct || 0,
    weeklyReturn: perf?.weeklyReturnPct || 0,
    // Funding to fee ratio gives us a sense of efficiency
    fundingToFeeRatio: eff?.fundingToFeeRatio || 0,
    // Capital utilization
    capitalUtilization: eff?.capitalUtilizationPct || 0
  }
})

const hasData = computed(() => data.value !== null && !loading.value)

const formatPercent = (value) => {
  if (value === null || value === undefined) return '--'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

const formatRatio = (value) => {
  if (value === null || value === undefined) return '--'
  return `${value.toFixed(1)}x`
}
</script>

<template>
  <div class="returns-breakdown">
    <div class="breakdown-header">
      <span class="period-badge">Performance Summary</span>
      <h3 class="breakdown-title">Strategy Returns</h3>
      <p class="breakdown-subtitle">Key performance indicators from the delta-neutral strategy</p>
    </div>

    <div class="breakdown-content" v-if="hasData">
      <!-- Total Return -->
      <div class="breakdown-row">
        <div class="row-label">
          <div class="row-icon total">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M5 8H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M8 5V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">All-Time Return</span>
            <span class="row-description">Cumulative strategy performance</span>
          </div>
        </div>
        <div class="row-value">
          <span class="value total" :class="data.totalReturn >= 0 ? 'positive' : 'negative'">{{ formatPercent(data.totalReturn) }}</span>
        </div>
      </div>

      <!-- Monthly Return -->
      <div class="breakdown-row">
        <div class="row-label">
          <div class="row-icon funding">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M8 3L4 7M8 3L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">Monthly Return</span>
            <span class="row-description">Performance over last 30 days</span>
          </div>
        </div>
        <div class="row-value">
          <span class="value" :class="data.monthlyReturn >= 0 ? 'positive' : 'negative'">{{ formatPercent(data.monthlyReturn) }}</span>
        </div>
      </div>

      <!-- Weekly Return -->
      <div class="breakdown-row">
        <div class="row-label">
          <div class="row-icon basis">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M2 4H14M2 12H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">Weekly Return</span>
            <span class="row-description">Performance over last 7 days</span>
          </div>
        </div>
        <div class="row-value">
          <span class="value" :class="data.weeklyReturn >= 0 ? 'positive' : 'negative'">{{ formatPercent(data.weeklyReturn) }}</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="breakdown-divider"></div>

      <!-- Funding Efficiency -->
      <div class="breakdown-row">
        <div class="row-label">
          <div class="row-icon efficiency">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L10 6H14L11 9L12 14L8 11L4 14L5 9L2 6H6L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">Funding to Fee Ratio</span>
            <span class="row-description">Funding income vs trading costs</span>
          </div>
        </div>
        <div class="row-value">
          <span class="value neutral">{{ formatRatio(data.fundingToFeeRatio) }}</span>
        </div>
      </div>

      <!-- Capital Utilization -->
      <div class="breakdown-row">
        <div class="row-label">
          <div class="row-icon utilization">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="6" width="3" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/>
              <rect x="6.5" y="4" width="3" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/>
              <rect x="11" y="2" width="3" height="12" rx="1" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">Capital Utilization</span>
            <span class="row-description">Percentage of capital deployed</span>
          </div>
        </div>
        <div class="row-value">
          <span class="value neutral">{{ formatPercent(data.capitalUtilization).replace('+', '') }}</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="breakdown-content loading-state" v-else>
      <div class="breakdown-row" v-for="i in 5" :key="i">
        <div class="row-label">
          <div class="skeleton-icon"></div>
          <div class="row-info">
            <div class="skeleton-text"></div>
            <div class="skeleton-text small"></div>
          </div>
        </div>
        <div class="row-value">
          <div class="skeleton-value"></div>
        </div>
      </div>
    </div>

    <div class="breakdown-footer">
      <p class="footer-note">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="currentColor" stroke-width="1.25"/>
          <path d="M7 4.5V7.5M7 9.5H7.005" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
        </svg>
        Live data from the trading strategy. Updates every 8 hours with funding periods.
      </p>
    </div>
  </div>
</template>

<style scoped>
.returns-breakdown {
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #94A3B8;
  --color-accent: #0066FF;
  --color-profit: #00C853;
  --color-loss: #FF3B30;
  --color-border: rgba(0, 0, 0, 0.06);
  --color-surface: #FFFFFF;
  --color-bg: #FAFBFC;

  background: var(--color-surface);
  border-radius: 20px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  max-width: 560px;
  margin: 0 auto;
}

.breakdown-header {
  padding: 2rem 2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.period-badge {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: rgba(0, 102, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  margin-bottom: 1rem;
}

.breakdown-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 0.25rem;
}

.breakdown-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.breakdown-content {
  padding: 1.5rem 2rem;
}

.breakdown-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
}

.breakdown-row:first-child {
  padding-top: 0;
}

.row-label {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  flex: 1;
  min-width: 0;
}

.row-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.row-icon.funding {
  background: rgba(0, 200, 83, 0.1);
  color: var(--color-profit);
}

.row-icon.basis {
  background: rgba(0, 102, 255, 0.1);
  color: var(--color-accent);
}

.row-icon.fees {
  background: rgba(255, 59, 48, 0.1);
  color: var(--color-loss);
}

.row-icon.total {
  background: var(--color-text);
  color: white;
}

.row-icon.efficiency {
  background: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

.row-icon.utilization {
  background: rgba(139, 92, 246, 0.1);
  color: #8B5CF6;
}

.row-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.row-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
}

.row-description {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-value {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.bar-container {
  width: 60px;
  height: 8px;
  background: var(--color-bg);
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.bar.positive {
  background: var(--color-profit);
}

.bar.negative {
  background: var(--color-loss);
}

.value {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  min-width: 70px;
  text-align: right;
}

.value.positive {
  color: var(--color-profit);
}

.value.negative {
  color: var(--color-loss);
}

.value.neutral {
  color: var(--color-text);
}

.value.total {
  font-size: 1.125rem;
}

.breakdown-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0.5rem 0;
}

.total-row {
  padding-bottom: 0;
}

.total-row .row-name {
  font-size: 1rem;
}

.breakdown-footer {
  padding: 1rem 2rem 1.5rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
}

.footer-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0;
  text-align: center;
}

.footer-note svg {
  flex-shrink: 0;
}

/* Loading State */
.loading-state .breakdown-row {
  opacity: 0.6;
}

.skeleton-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(90deg, var(--color-bg) 25%, #e2e8f0 50%, var(--color-bg) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-text {
  height: 14px;
  width: 120px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--color-bg) 25%, #e2e8f0 50%, var(--color-bg) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-text.small {
  height: 10px;
  width: 80px;
  margin-top: 4px;
}

.skeleton-bar {
  width: 60px;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--color-bg) 25%, #e2e8f0 50%, var(--color-bg) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-value {
  width: 60px;
  height: 16px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--color-bg) 25%, #e2e8f0 50%, var(--color-bg) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@media (max-width: 480px) {
  .breakdown-header,
  .breakdown-content,
  .breakdown-footer {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .bar-container {
    display: none;
  }

  .row-description {
    display: none;
  }
}
</style>
