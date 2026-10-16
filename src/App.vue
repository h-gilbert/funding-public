<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <p class="bg-background-secondary border-b border-gray-100 text-center text-sm text-text-secondary px-4 py-3">Bot retired. This archive shows the final published snapshot.</p>
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
