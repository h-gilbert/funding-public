<script setup>
// Blog list page - will display markdown posts from content/blog/
// For now, showing a placeholder until posts are added
</script>

<template>
  <div class="blog-page">
    <section class="hero">
      <div class="container">
        <span class="label">Blog</span>
        <h1 class="title">Technical Journal</h1>
        <p class="subtitle">
          Articles about building automated trading systems, overcoming technical
          challenges, and lessons learned along the way.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="coming-soon">
          <div class="coming-soon-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" stroke-width="2"/>
              <path d="M16 14H32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M16 22H32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M16 30H26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h2>Coming Soon</h2>
          <p>
            Technical articles about delta-neutral trading, rate limiting strategies,
            multi-exchange synchronization, and more are in the works.
          </p>
          <p class="coming-soon-hint">
            Check back soon or follow the project for updates.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

.blog-page {
  --color-bg: #FAFBFC;
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #94A3B8;
  --color-accent: #0066FF;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero {
  padding: 5rem 0 3rem;
  background: var(--color-bg);
  text-align: center;
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 0.75rem;
}

.subtitle {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 500px;
  margin: 0 auto;
}

.section {
  padding: 4rem 0 6rem;
}

.coming-soon {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.coming-soon-icon {
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
}

.coming-soon h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 1rem;
}

.coming-soon p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 400px;
  margin: 0 auto;
}

.coming-soon-hint {
  margin-top: 1rem !important;
  font-size: 0.875rem !important;
  color: var(--color-text-muted) !important;
}
</style>
