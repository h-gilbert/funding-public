<script setup>
import { ref, computed } from 'vue'

// Placeholder data - will be replaced with real API data
const placeholderData = ref({
  funding: 12.4,
  basis: 2.1,
  fees: -1.8,
})

const total = computed(() => {
  return placeholderData.value.funding + placeholderData.value.basis + placeholderData.value.fees
})

const maxAbsValue = computed(() => {
  return Math.max(
    Math.abs(placeholderData.value.funding),
    Math.abs(placeholderData.value.basis),
    Math.abs(placeholderData.value.fees)
  )
})

const getBarWidth = (value) => {
  return (Math.abs(value) / maxAbsValue.value) * 100
}
</script>

<template>
  <div class="returns-breakdown">
    <div class="breakdown-header">
      <span class="placeholder-badge">Sample Data</span>
      <h3 class="breakdown-title">Where Returns Come From</h3>
      <p class="breakdown-subtitle">Breakdown of strategy performance components</p>
    </div>

    <div class="breakdown-content">
      <!-- Funding Rate Income -->
      <div class="breakdown-row">
        <div class="row-label">
          <div class="row-icon funding">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M8 3L4 7M8 3L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">Funding Rate Income</span>
            <span class="row-description">Payments from perpetual futures shorts</span>
          </div>
        </div>
        <div class="row-value">
          <div class="bar-container">
            <div
              class="bar positive"
              :style="{ width: getBarWidth(placeholderData.funding) + '%' }"
            ></div>
          </div>
          <span class="value positive">+{{ placeholderData.funding.toFixed(1) }}%</span>
        </div>
      </div>

      <!-- Basis P&L -->
      <div class="breakdown-row">
        <div class="row-label">
          <div class="row-icon basis">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M2 4H14M2 12H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">Basis P&L</span>
            <span class="row-description">Spot-futures price convergence gains</span>
          </div>
        </div>
        <div class="row-value">
          <div class="bar-container">
            <div
              class="bar positive"
              :style="{ width: getBarWidth(placeholderData.basis) + '%' }"
            ></div>
          </div>
          <span class="value positive">+{{ placeholderData.basis.toFixed(1) }}%</span>
        </div>
      </div>

      <!-- Trading Fees -->
      <div class="breakdown-row">
        <div class="row-label">
          <div class="row-icon fees">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13V3M8 13L4 9M8 13L12 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">Trading Fees</span>
            <span class="row-description">Exchange fees for entry/exit trades</span>
          </div>
        </div>
        <div class="row-value">
          <div class="bar-container">
            <div
              class="bar negative"
              :style="{ width: getBarWidth(placeholderData.fees) + '%' }"
            ></div>
          </div>
          <span class="value negative">{{ placeholderData.fees.toFixed(1) }}%</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="breakdown-divider"></div>

      <!-- Total -->
      <div class="breakdown-row total-row">
        <div class="row-label">
          <div class="row-icon total">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M5 8H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M8 5V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="row-info">
            <span class="row-name">Net Return</span>
            <span class="row-description">Total annualized performance</span>
          </div>
        </div>
        <div class="row-value">
          <span class="value total positive">+{{ total.toFixed(1) }}%</span>
        </div>
      </div>
    </div>

    <div class="breakdown-footer">
      <p class="footer-note">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="currentColor" stroke-width="1.25"/>
          <path d="M7 4.5V7.5M7 9.5H7.005" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
        </svg>
        This breakdown shows sample data. Real metrics will be available once the backend is connected.
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

.placeholder-badge {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: rgba(148, 163, 184, 0.15);
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
  min-width: 60px;
  text-align: right;
}

.value.positive {
  color: var(--color-profit);
}

.value.negative {
  color: var(--color-loss);
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
