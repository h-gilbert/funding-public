<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Placeholder until blog content is added
// Will load markdown from content/blog/{slug}.md
</script>

<template>
  <div class="blog-post-page">
    <section class="hero">
      <div class="container">
        <router-link to="/blog" class="back-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to Blog
        </router-link>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="not-found">
          <h1>Post Not Found</h1>
          <p>
            This blog post doesn't exist yet. Check back soon for new content
            about building automated trading systems.
          </p>
          <router-link to="/blog" class="cta-button">
            View All Posts
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

.blog-post-page {
  --color-bg: #FAFBFC;
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-accent: #0066FF;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero {
  padding: 2rem 0;
  background: var(--color-bg);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--color-accent);
}

.section {
  padding: 3rem 0 6rem;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 1rem;
}

.not-found p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0 0 2rem;
}

.cta-button {
  display: inline-flex;
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
