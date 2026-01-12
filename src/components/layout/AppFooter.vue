<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-background-secondary border-t border-gray-100">
    <div class="container-narrow py-12">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">DN</span>
            </div>
            <span class="font-semibold text-text-primary">Delta-Neutral</span>
          </div>
          <p class="text-body-sm text-text-secondary max-w-xs">
            Automated delta-neutral funding rate strategy showcasing live performance metrics.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-text-primary mb-4">Pages</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-body-sm text-text-secondary hover:text-accent transition-colors">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/performance" class="text-body-sm text-text-secondary hover:text-accent transition-colors">
                Performance
              </router-link>
            </li>
            <li>
              <router-link to="/strategy" class="text-body-sm text-text-secondary hover:text-accent transition-colors">
                Strategy
              </router-link>
            </li>
            <li>
              <router-link to="/blog" class="text-body-sm text-text-secondary hover:text-accent transition-colors">
                Blog
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Disclaimer -->
        <div>
          <h4 class="font-semibold text-text-primary mb-4">Disclaimer</h4>
          <p class="text-body-sm text-text-tertiary">
            This is a personal project for educational purposes. Past performance does not guarantee future results. Trading cryptocurrencies involves significant risk.
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-body-sm text-text-tertiary text-center">
          &copy; {{ currentYear }} Delta-Neutral Strategy. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
