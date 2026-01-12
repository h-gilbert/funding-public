<script setup>
import LeverageApyChart from '@/components/strategy/LeverageApyChart.vue'
</script>

<template>
  <div class="strategy-page">
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <span class="label">The Strategy</span>
        <h1 class="title">How Delta-Neutral Works</h1>
        <p class="subtitle">
          Understanding the mechanics, the target returns, and the risks involved
          in automated funding rate capture.
        </p>
      </div>
    </section>

    <!-- Target Returns -->
    <section class="section">
      <div class="container">
        <div class="card highlight-card">
          <div class="highlight-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L20 12L28 13.5L22 19.5L23.5 28L16 24L8.5 28L10 19.5L4 13.5L12 12L16 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2 class="highlight-title">Target: &gt;10% Annual Returns</h2>
          <p class="highlight-text">
            Returns are generated through consistent funding rate payments, not market speculation.
            Performance varies based on market conditions and funding rate availability across exchanges.
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">The Mechanics</h2>
        <p class="section-subtitle">
          A delta-neutral position eliminates directional risk while capturing yield
        </p>

        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3 class="step-title">Open Spot Long</h3>
            <p class="step-text">
              Buy the asset on a spot exchange (e.g., MEXC). This gives direct
              exposure to the asset's price movement.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">2</div>
            <h3 class="step-title">Open Futures Short</h3>
            <p class="step-text">
              Simultaneously short the same asset on perpetual futures (e.g., KuCoin).
              This offsets the spot position, making net exposure zero.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">3</div>
            <h3 class="step-title">Collect Funding</h3>
            <p class="step-text">
              Every 8 hours, funding payments are exchanged between longs and shorts.
              When funding is positive, shorts receive payments automatically.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">4</div>
            <h3 class="step-title">Exit When Optimal</h3>
            <p class="step-text">
              Close both positions when funding rates turn unfavorable or when
              a better opportunity emerges elsewhere.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Leverage & Capital Efficiency -->
    <section class="section">
      <div class="container">
        <h2 class="section-title center">Leverage & Capital Efficiency</h2>
        <p class="section-subtitle center">
          How leverage affects funding rate capture without increasing directional risk
        </p>

        <LeverageApyChart :base-apy="10" />

        <div class="chart-explanation">
          <p>
            With delta-neutral positions, <strong>leverage doesn't amplify directional risk</strong> —
            it only affects how much of the funding rate you can capture relative to your capital.
          </p>
          <p>
            The curve shows diminishing returns: going from 3x to 5x leverage only increases
            capture from 75% to 83%. The <strong>sweet spot at 3-5x</strong> balances capital
            efficiency against liquidation risk — capturing most of the yield while maintaining
            a safe margin buffer.
          </p>
        </div>
      </div>
    </section>

    <!-- Risks I AM Taking -->
    <section class="section">
      <div class="container">
        <div class="risk-header">
          <div class="risk-icon danger">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <h2 class="section-title">Risks I AM Taking</h2>
            <p class="section-subtitle">These are real risks inherent to this strategy</p>
          </div>
        </div>

        <div class="risk-grid">
          <div class="risk-card">
            <h3 class="risk-title">Exchange Risk</h3>
            <p class="risk-text">
              Funds are held on centralized exchanges (KuCoin, MEXC). If an exchange
              fails, is hacked, or freezes withdrawals, capital could be lost.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Execution Risk</h3>
            <p class="risk-text">
              Slippage during entry/exit, failed orders, and API downtime can all
              impact position execution and profitability.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Funding Rate Risk</h3>
            <p class="risk-text">
              Funding rates can turn negative, meaning shorts pay longs. Extended
              periods of negative funding eat into profits.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Liquidation Risk</h3>
            <p class="risk-text">
              Extreme volatility could liquidate the futures position before
              rebalancing can occur, causing asymmetric losses.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Technical Risk</h3>
            <p class="risk-text">
              Bugs in the bot logic, rate limiting issues, synchronization failures,
              and unexpected API changes can cause problems.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Counterparty Risk</h3>
            <p class="risk-text">
              Exchanges may change fees, margin requirements, or delist assets
              without adequate warning, affecting positions.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Basis Risk</h3>
            <p class="risk-text">
              Spot and futures prices can temporarily diverge significantly,
              causing unrealized P&L volatility even if funding is positive.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Operational Risk</h3>
            <p class="risk-text">
              Server downtime, network issues, and situations requiring manual
              intervention can impact the strategy's performance.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Risks I'm NOT Taking -->
    <section class="section section-success">
      <div class="container">
        <div class="risk-header">
          <div class="risk-icon success">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 class="section-title">Risks I'm NOT Taking</h2>
            <p class="section-subtitle">Compared to directional trading, these risks are eliminated</p>
          </div>
        </div>

        <div class="benefit-grid">
          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No Directional Market Risk</h3>
              <p class="benefit-text">Price can go to $10k or $100k — the strategy doesn't care.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No Timing Risk</h3>
              <p class="benefit-text">Not trying to predict market tops or bottoms.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No Emotional Trading</h3>
              <p class="benefit-text">Automated system removes FOMO and panic decisions.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No Leverage Amplification</h3>
              <p class="benefit-text">Net exposure is zero; leverage is only for capital efficiency.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No Black Swan Price Exposure</h3>
              <p class="benefit-text">A 50% crash doesn't mean 50% loss.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No Short Squeeze Risk</h3>
              <p class="benefit-text">Matched long position offsets short exposure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="section">
      <div class="container">
        <h2 class="section-title center">Risk Comparison</h2>
        <p class="section-subtitle center">Delta-neutral vs. directional trading</p>

        <div class="table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Risk Factor</th>
                <th>Directional Trading</th>
                <th>Delta-Neutral</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Market direction</td>
                <td class="danger">High exposure</td>
                <td class="success">Hedged</td>
              </tr>
              <tr>
                <td>Volatility impact</td>
                <td class="danger">Major factor</td>
                <td class="success">Minimal impact</td>
              </tr>
              <tr>
                <td>Emotional decisions</td>
                <td class="danger">Common</td>
                <td class="success">Automated</td>
              </tr>
              <tr>
                <td>Potential upside</td>
                <td class="neutral">Unlimited</td>
                <td class="neutral">Capped at funding</td>
              </tr>
              <tr>
                <td>Potential downside</td>
                <td class="danger">-100%</td>
                <td class="warning">Exchange/execution risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section-alt">
      <div class="container center">
        <h2 class="section-title">Want to see the results?</h2>
        <p class="section-subtitle">Check out the live performance dashboard</p>
        <router-link to="/performance" class="cta-button">
          View Performance
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

.strategy-page {
  --color-bg: #FAFBFC;
  --color-surface: #FFFFFF;
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #94A3B8;
  --color-accent: #0066FF;
  --color-profit: #00C853;
  --color-loss: #FF3B30;
  --color-warning: #F59E0B;
  --color-border: rgba(0, 0, 0, 0.06);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero */
.hero {
  padding: 6rem 0 4rem;
  text-align: center;
  background: var(--color-bg);
}

.label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 1rem;
}

.subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Sections */
.section {
  padding: 5rem 0;
}

.section-alt {
  background: var(--color-bg);
}

.section-success {
  background: linear-gradient(180deg, rgba(0, 200, 83, 0.03) 0%, var(--color-surface) 100%);
}

.section-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}

.section-title.center {
  text-align: center;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0 0 3rem;
}

.section-subtitle.center {
  text-align: center;
}

/* Chart explanation */
.chart-explanation {
  max-width: 600px;
  margin: 2rem auto 0;
  text-align: center;
}

.chart-explanation p {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0 0 1rem;
}

.chart-explanation p:last-child {
  margin-bottom: 0;
}

.chart-explanation strong {
  color: var(--color-text);
  font-weight: 600;
}

/* Highlight Card */
.highlight-card {
  background: linear-gradient(135deg, var(--color-accent) 0%, #0052CC 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
}

.highlight-icon {
  display: inline-flex;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.highlight-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  margin: 0 0 1rem;
}

.highlight-text {
  font-size: 1.0625rem;
  line-height: 1.7;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Steps Grid */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.step-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--color-border);
}

.step-number {
  width: 36px;
  height: 36px;
  background: var(--color-accent);
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.step-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.75rem;
}

.step-text {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
}

/* Risk Header */
.risk-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 2.5rem;
}

.risk-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.risk-icon.danger {
  background: rgba(255, 59, 48, 0.1);
  color: var(--color-loss);
}

.risk-icon.success {
  background: rgba(0, 200, 83, 0.1);
  color: var(--color-profit);
}

/* Risk Grid */
.risk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.risk-card {
  background: rgba(255, 59, 48, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 59, 48, 0.15);
}

.risk-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}

.risk-text {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
}

/* Benefit Grid */
.benefit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.benefit-card {
  display: flex;
  gap: 1rem;
  background: rgba(0, 200, 83, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 200, 83, 0.15);
}

.benefit-check {
  width: 28px;
  height: 28px;
  background: rgba(0, 200, 83, 0.1);
  color: var(--color-profit);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.25rem;
}

.benefit-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

/* Comparison Table */
.table-wrapper {
  overflow-x: auto;
  margin-top: 2rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-surface);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
}

.comparison-table th,
.comparison-table td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.comparison-table th {
  background: var(--color-bg);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.comparison-table td {
  font-size: 0.9375rem;
  color: var(--color-text);
}

.comparison-table td.success {
  color: var(--color-profit);
  font-weight: 500;
}

.comparison-table td.danger {
  color: var(--color-loss);
  font-weight: 500;
}

.comparison-table td.warning {
  color: var(--color-warning);
  font-weight: 500;
}

.comparison-table td.neutral {
  color: var(--color-text-secondary);
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

/* CTA Button */
.center {
  text-align: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--color-text);
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s ease;
  margin-top: 1.5rem;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}
</style>
