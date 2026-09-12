<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader class="no-print" />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter class="no-print" />
  </div>
</template>

<script setup>
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'
</script>
