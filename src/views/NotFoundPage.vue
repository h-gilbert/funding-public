<script setup>
</script>

<template>
  <div class="not-found-page">
    <div class="container">
      <div class="content">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <router-link to="/" class="cta-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

.not-found-page {
  --color-bg: #FAFBFC;
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #CBD5E1;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.content {
  text-align: center;
}

.error-code {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 8rem;
  font-weight: 400;
  color: var(--color-text-muted);
  line-height: 1;
  margin-bottom: 1rem;
}

h1 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 0.75rem;
}

p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0 0 2rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--color-text);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
</style>
