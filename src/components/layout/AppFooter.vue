<template>
  <footer class="bg-background-secondary border-t border-gray-100">
    <div class="container-narrow py-12">
      <div class="grid md:grid-cols-2 gap-8">
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
            A personal project exploring crypto market structure and attempting to generate alpha. Past performance does not guarantee future results. This strategy involves <router-link to="/strategy#risks" class="text-text-secondary hover:text-accent transition-colors underline">risk</router-link>.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
