<template>
  <div class="relative aspect-square overflow-hidden rounded-2xl bg-brand-50">
    <img
      v-if="!failed"
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      @error="failed = true"
    />
    <div v-else class="grid h-full place-items-center px-4 text-center">
      <div>
        <p class="text-4xl" aria-hidden="true">{{ emoji }}</p>
        <p class="mt-2 text-sm font-medium text-brand-800">{{ alt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  emoji: { type: String, default: '🛒' },
})

const failed = ref(false)
</script>
