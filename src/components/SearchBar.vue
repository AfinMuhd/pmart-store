<template>
  <form role="search" class="relative" @submit.prevent="submit">
    <label class="sr-only" for="site-search">Search products</label>
    <input
      id="site-search"
      v-model="query"
      type="search"
      placeholder="Search atta, rice, oil, snacks..."
      class="w-full rounded-full border border-brand-100 bg-cream px-4 py-2.5 pr-12 text-sm outline-none ring-brand-500 focus:bg-white focus:ring-2"
    />
    <button type="submit" class="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-brand-600 px-3 py-1.5 text-white" aria-label="Search">
      🔍
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

function submit() {
  const q = query.value.trim()
  router.push({ path: '/products', query: q ? { q } : {} })
}
</script>
