<script setup>
import { onMounted } from 'vue'
import { useMetricsStore } from '@/stores/metricsStore'
import LiveIndicator from '@/components/metrics/LiveIndicator.vue'
import MetricsGrid from '@/components/metrics/MetricsGrid.vue'

const store = useMetricsStore()

onMounted(() => {
  store.fetchAll()
  store.startPolling(60000)
})
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <LiveIndicator />
        </div>

        <h1 class="hero-title">
          <span class="title-line">Delta-Neutral</span>
          <span class="title-line title-accent">Funding Strategy</span>
        </h1>

        <p class="hero-subtitle">
          Capturing funding rate yields through automated, market-neutral positions.
          <span class="highlight">Targeting &gt;10% APY</span> without directional exposure.
        </p>

        <div class="hero-cta">
          <router-link to="/performance" class="cta-primary">
            <span>View Performance</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <router-link to="/strategy" class="cta-secondary">
            Learn How It Works
          </router-link>
        </div>
      </div>

      <!-- Decorative gradient orb -->
      <div class="hero-orb"></div>
    </section>

    <!-- Metrics Section -->
    <section class="metrics-section">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">Live Metrics</span>
          <h2 class="section-title">Performance at a Glance</h2>
        </div>

        <MetricsGrid compact />
      </div>
    </section>

    <!-- Strategy Overview -->
    <section class="overview-section">
      <div class="section-container">
        <div class="overview-grid">
          <div class="overview-content">
            <span class="section-label">The Strategy</span>
            <h2 class="section-title">What is Delta-Neutral?</h2>
            <p class="overview-text">
              Delta-neutral trading eliminates directional market risk by holding
              offsetting positions. I go <strong>long spot</strong> on one exchange
              while simultaneously going <strong>short perpetual futures</strong> on another.
            </p>
            <p class="overview-text">
              Perpetual futures pay <strong>funding rates</strong> at regular intervals (typically every 1, 4, or 8 hours).
              When funding is positive, shorts receive payments from longs. By capturing
              these payments while staying market-neutral, the strategy generates
              consistent yield regardless of price direction.
            </p>

            <router-link to="/strategy" class="learn-more">
              <span>Explore the full strategy</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </router-link>
          </div>

          <div class="overview-visual">
            <div class="visual-card">
              <div class="visual-row">
                <div class="visual-label">Spot Position</div>
                <div class="visual-badge long">LONG</div>
              </div>
              <div class="visual-divider">
                <span class="divider-text">+</span>
              </div>
              <div class="visual-row">
                <div class="visual-label">Futures Position</div>
                <div class="visual-badge short">SHORT</div>
              </div>
              <div class="visual-divider">
                <span class="divider-text">=</span>
              </div>
              <div class="visual-result">
                <div class="result-label">Net Exposure</div>
                <div class="result-value">Zero (ideally)</div>
                <div class="result-subtext">+ Funding Payments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="cta-section">
      <div class="section-container">
        <div class="cta-card">
          <h2 class="cta-title">Ready to dive deeper?</h2>
          <p class="cta-text">
            Explore detailed performance metrics, understand the risks involved,
            or read about the technical challenges of building this system.
          </p>
          <div class="cta-buttons">
            <router-link to="/performance" class="cta-primary">
              <span>Performance Dashboard</span>
            </router-link>
            <router-link to="/blog" class="cta-ghost">
              <span>Read the Blog</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Import a refined font for headlines */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

.home-page {
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

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1.5rem;
  overflow: hidden;
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  text-align: center;
  animation: fadeUp 0.8s ease-out;
}

.hero-badge {
  display: inline-flex;
  margin-bottom: 2rem;
  animation: fadeUp 0.8s ease-out 0.1s both;
}

.hero-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 1.5rem;
}

.title-line {
  display: block;
}

.title-accent {
  color: var(--color-accent);
  font-style: italic;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 540px;
  margin: 0 auto 2.5rem;
  animation: fadeUp 0.8s ease-out 0.2s both;
}

.highlight {
  color: var(--color-text);
  font-weight: 600;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  animation: fadeUp 0.8s ease-out 0.3s both;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.75rem;
  background: var(--color-text);
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  padding: 1rem 1.75rem;
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  border-radius: 100px;
  border: 1.5px solid var(--color-border);
  transition: all 0.25s ease;
}

.cta-secondary:hover {
  border-color: var(--color-text);
  background: var(--color-bg);
}

.cta-ghost {
  display: inline-flex;
  align-items: center;
  padding: 1rem 1.75rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cta-ghost:hover {
  color: var(--color-text);
}

/* Decorative orb */
.hero-orb {
  position: absolute;
  top: 10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: float 20s ease-in-out infinite;
}

/* Section Styles */
.section-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.section-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  color: var(--color-text);
  margin: 0;
}

/* Metrics Section */
.metrics-section {
  padding: 5rem 0;
  background: var(--color-surface);
}

/* Overview Section */
.overview-section {
  padding: 6rem 0;
  background: var(--color-bg);
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 768px) {
  .overview-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.overview-content .section-title {
  margin-bottom: 1.5rem;
}

.overview-text {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin: 0 0 1rem;
}

.overview-text strong {
  color: var(--color-text);
  font-weight: 600;
}

.learn-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.learn-more:hover {
  gap: 0.75rem;
}

/* Visual Card */
.overview-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  background: var(--color-surface);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--color-border);
}

.visual-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.visual-label {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.visual-badge {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
}

.visual-badge.long {
  background: rgba(0, 200, 83, 0.1);
  color: var(--color-profit);
}

.visual-badge.short {
  background: rgba(255, 59, 48, 0.1);
  color: var(--color-loss);
}

.visual-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
}

.divider-text {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border-radius: 50%;
  font-weight: 600;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.visual-result {
  text-align: center;
  padding: 1.25rem 0 0.5rem;
}

.result-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.result-value {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2.5rem;
  font-style: italic;
  color: var(--color-text);
}

.result-subtext {
  font-size: 0.875rem;
  color: var(--color-profit);
  font-weight: 600;
  margin-top: 0.25rem;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0 6rem;
  background: var(--color-surface);
}

.cta-card {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 1rem;
}

.cta-text {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0 0 2rem;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

/* Animations */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-20px, 20px);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero-content,
  .hero-badge,
  .hero-subtitle,
  .hero-cta,
  .hero-orb {
    animation: none;
  }
}
</style>
