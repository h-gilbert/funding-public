<script setup>
import LeverageApyChart from '@/components/strategy/LeverageApyChart.vue'
import ReturnsBreakdown from '@/components/strategy/ReturnsBreakdown.vue'
import { useMetricsStore } from '@/stores/metricsStore'

const store = useMetricsStore()
</script>

<template>
  <div class="strategy-page">
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <span class="label">The Strategy</span>
        <h1 class="title">How delta-neutral works</h1>
        <p class="subtitle">
          How the positions work, what they pay, and what can go wrong.
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
          <h2 class="highlight-title">Target: over 10% a year</h2>
          <p class="highlight-text">
            The returns come from funding payments, not from guessing where the price goes. How much is
            on offer depends on the market and on which exchanges are paying at the time.
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">The mechanics</h2>
        <p class="section-subtitle">
          Two opposite positions cancel the price risk. The funding payments are what is left
        </p>

        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3 class="step-title">Open spot long</h3>
            <p class="step-text">
              Buy the asset outright on a spot exchange. That leg moves with the price.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">2</div>
            <h3 class="step-title">Open futures short</h3>
            <p class="step-text">
              Short the same size on perpetual futures through the exchange API.
              The two legs cancel, so net exposure is zero.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">3</div>
            <h3 class="step-title">Collect funding</h3>
            <p class="step-text">
              Longs and shorts settle funding every 8 hours on most venues.
              While funding is positive, the short leg gets paid.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">4</div>
            <h3 class="step-title">Exit when it stops paying</h3>
            <p class="step-text">
              Close both legs when funding turns against the position,
              or when another pair pays better.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Returns Breakdown -->
    <section class="section" v-if="store.showsAggregates">
      <div class="container">
        <h2 class="section-title center">Return sources</h2>
        <p class="section-subtitle center">
          Funding income, basis moves and fees, split out
        </p>
        <ReturnsBreakdown />
      </div>
    </section>

    <!-- Understanding Basis -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title center">Understanding basis</h2>
        <p class="section-subtitle center">
          How spot and futures prices sit against each other in crypto markets
        </p>

        <div class="basis-explainer">
          <div class="basis-visual">
            <div class="price-line">
              <div class="price-bar spot">
                <span class="price-label">Spot Price</span>
                <span class="price-value">$95,000</span>
              </div>
              <div class="basis-gap">
                <span class="gap-label">Basis</span>
                <span class="gap-value">+0.8%</span>
              </div>
              <div class="price-bar futures">
                <span class="price-label">Futures Price</span>
                <span class="price-value">$95,760</span>
              </div>
            </div>
          </div>

          <div class="basis-explanation">
            <div class="basis-point">
              <div class="point-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M10 4L6 8M10 4L14 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="point-content">
                <h4 class="point-title">What basis is</h4>
                <p class="point-text">
Basis is the gap between the perpetual futures price and the spot price. Futures above spot means
traders are paying up for leveraged longs. Futures below spot means the pressure is on the other
side.
                </p>
              </div>
            </div>

            <div class="basis-point">
              <div class="point-icon profit">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M7 10H13M10 7V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="point-content">
                <h4 class="point-title">Basis and funding rates</h4>
                <p class="point-text">
The two move together. Funding is the mechanism that drags the perpetual price back towards spot, so
a positive basis usually means positive funding, with longs paying shorts. That payment is the whole
business model here.
                </p>
              </div>
            </div>

            <div class="basis-point">
              <div class="point-icon warning">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 7V10M10 13H10.01M4.93 16H15.07C16.39 16 17.23 14.59 16.57 13.46L11.5 4.54C10.84 3.41 9.16 3.41 8.5 4.54L3.43 13.46C2.77 14.59 3.61 16 4.93 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="point-content">
                <h4 class="point-title">Basis volatility</h4>
                <p class="point-text">
                  Basis moves with sentiment and can swing hard in a fast market. Even with both legs on,
                  that shows up as unrealised P&L bouncing around. It is noise. I track basis apart from
                  funding income so the funding number is not buried in it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leverage & Capital Efficiency -->
    <section class="section section-alt">
      <div class="container">
<h2 class="section-title center">Leverage and capital efficiency</h2>
        <p class="section-subtitle center">
          More leverage captures more funding per dollar of capital. It adds no price risk
        </p>

        <LeverageApyChart :base-apy="10" />

        <div class="chart-explanation">
          <p>
Because the legs are hedged, <strong>leverage doesn't increase your dollar risk</strong>. It changes
how much funding you capture per dollar of capital.
          </p>
          <p>
The cost is <strong>liquidation risk</strong>. Less margin buffer means a sharp move can take out
the futures leg before a rebalance lands. You are then long spot, unhedged, and no longer collecting
anything.
          </p>
          <p>
<strong>3-5x</strong> captures 75-83% of the yield and still leaves enough margin to sit through
normal volatility.
          </p>
        </div>
      </div>
    </section>

    <!-- Risks I AM Taking -->
    <section id="risks" class="section">
      <div class="container">
        <div class="risk-header">
          <div class="risk-icon danger">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <h2 class="section-title">Risks I am taking</h2>
            <p class="section-subtitle">Every one of these can cost real money</p>
          </div>
        </div>

        <div class="risk-grid">
          <div class="risk-card">
            <h3 class="risk-title">Exchange risk</h3>
            <p class="risk-text">
The money sits on centralised exchanges. If one fails, gets hacked or halts withdrawals, that
capital is gone or stuck.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Execution risk</h3>
            <p class="risk-text">
Slippage on entry and exit, rejected orders and API outages all cost money, and can leave one leg on
without the other.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Funding rate risk</h3>
            <p class="risk-text">
Funding can flip negative, which means the short leg pays instead of collecting. A long stretch of
that eats the returns.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Liquidation risk</h3>
            <p class="risk-text">
A violent move can liquidate the futures leg before a rebalance lands. The hedge disappears and the
loss runs one way.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Technical risk</h3>
            <p class="risk-text">
Bugs in the bot, rate limits, legs that fall out of sync, and exchanges changing their API without
warning. Any of these can leave a position wrong.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Counterparty risk</h3>
            <p class="risk-text">
Exchanges change fees and margin requirements, and sometimes delist a pair, with little notice.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Basis risk</h3>
            <p class="risk-text">
              Spot and futures can pull apart for a while. The unrealised P&L swings
              even while funding is still paying.
            </p>
          </div>

          <div class="risk-card">
            <h3 class="risk-title">Operational risk</h3>
            <p class="risk-text">
Servers go down, networks drop, and some situations need me to step in by hand.
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
            <h2 class="section-title">Risks I'm not taking</h2>
            <p class="section-subtitle">The ones a directional trader carries and I don't</p>
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
              <h3 class="benefit-title">No directional market risk</h3>
              <p class="benefit-text">Price can go to $10k or $100k. The strategy doesn't care.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No timing risk</h3>
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
              <h3 class="benefit-title">No emotional trading</h3>
              <p class="benefit-text">The bot doesn't chase and it doesn't panic.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No leverage amplification</h3>
              <p class="benefit-text">Net exposure is zero. Leverage only buys capital efficiency.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="benefit-title">No black swan price exposure</h3>
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
              <h3 class="benefit-title">No short squeeze risk</h3>
              <p class="benefit-text">The spot long covers the short.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scalability Limitations -->
    <section class="section">
      <div class="container">
        <div class="risk-header">
          <div class="risk-icon warning">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8V12M12 16H12.01M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <h2 class="section-title">Not infinitely scalable</h2>
            <p class="section-subtitle">More capital doesn't mean proportionally more returns</p>
          </div>
        </div>

        <div class="scalability-content">
          <div class="scalability-highlight">
            <p class="scalability-formula">More capital = lower returns</p>
          </div>

          <div class="scalability-grid">
            <div class="scalability-card">
              <h3 class="scalability-title">Liquidity constraints</h3>
              <p class="scalability-text">
                Each pair only has so much depth. Bigger positions get worse fills, and the best
                funding is usually on smaller pairs that can't absorb much size.
              </p>
            </div>

            <div class="scalability-card">
              <h3 class="scalability-title">Funding rate competition</h3>
              <p class="scalability-text">
                High funding attracts capital. As more traders pile into the same side, the rate falls
                back. This works best while few people are doing it. If everyone did it, the returns
                would go away.
              </p>
            </div>

            <div class="scalability-card">
              <h3 class="scalability-title">Opportunity scarcity</h3>
              <p class="scalability-text">
                Only a handful of coins pay well at any one time. More capital means either
                concentrating into fewer positions or taking the ones that pay less.
              </p>
            </div>

            <div class="scalability-card">
              <h3 class="scalability-title">Market impact</h3>
              <p class="scalability-text">
                Big entries and exits move the price against you. You buy higher and sell lower
                than a smaller trader would, and that comes straight out of the funding income.
              </p>
            </div>
          </div>

          <div class="scalability-note">
            <p>
<strong>There is a ceiling.</strong> This works at modest size. Past that, each extra dollar earns
less than the one before it.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title center">Risk comparison</h2>
        <p class="section-subtitle center">Delta-neutral vs. directional trading</p>

        <div class="table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Risk factor</th>
                <th>Directional trading</th>
                <th>Delta-neutral</th>
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
        <p class="section-subtitle">The numbers are on the performance page</p>
        <router-link to="/performance" class="cta-button">
          View performance
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

.risk-icon.warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
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

/* Scalability Section */
.scalability-content {
  margin-top: 1rem;
}

.scalability-highlight {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.03) 100%);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.scalability-icon {
  font-size: 2.5rem;
}

.scalability-formula {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.scalability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.scalability-card {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
}

.scalability-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.75rem;
}

.scalability-text {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin: 0;
}

.scalability-note {
  background: var(--color-bg);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  text-align: center;
}

.scalability-note p {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 700px;
  margin: 0 auto;
}

.scalability-note strong {
  color: var(--color-text);
  font-weight: 600;
}

/* Basis Trading Section */
.basis-explainer {
  margin-top: 2rem;
}

.basis-visual {
  background: var(--color-bg);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.price-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.price-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 2rem;
  border-radius: 12px;
  min-width: 140px;
}

.price-bar.spot {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.price-bar.futures {
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.08) 0%, rgba(0, 102, 255, 0.03) 100%);
  border: 1px solid rgba(0, 102, 255, 0.2);
}

.price-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.price-value {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.basis-gap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, rgba(0, 200, 83, 0.1) 0%, rgba(0, 200, 83, 0.05) 100%);
  border-radius: 100px;
  border: 1px dashed rgba(0, 200, 83, 0.3);
}

.gap-label {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.gap-value {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-profit);
}

.basis-explanation {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.basis-point {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.point-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(0, 102, 255, 0.1);
  color: var(--color-accent);
}

.point-icon.profit {
  background: rgba(0, 200, 83, 0.1);
  color: var(--color-profit);
}

.point-icon.warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
}

.point-content {
  flex: 1;
}

.point-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}

.point-text {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.point-text em {
  font-style: italic;
  color: var(--color-text);
}

@media (max-width: 600px) {
  .price-line {
    flex-direction: column;
  }

  .price-bar {
    width: 100%;
  }

  .basis-gap {
    flex-direction: row;
    width: 100%;
    justify-content: center;
    gap: 0.75rem;
  }
}
</style>
