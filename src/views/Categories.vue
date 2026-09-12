<template>
  <div class="mx-auto max-w-7xl px-4 py-10">
    <h1 class="font-display text-4xl">Categories</h1>
    <p class="mt-2 text-slate-500">Choose an aisle to start shopping.</p>
    <div v-if="loading" class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div v-for="n in 8" :key="n" class="h-36 animate-pulse rounded-2xl bg-white"></div>
    </div>
    <div v-else class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CategoryCard from '@/components/CategoryCard.vue'
import { getCategories } from '@/services/catalogService'

const loading = ref(true)
const categories = ref([])

onMounted(async () => {
  categories.value = await getCategories()
  loading.value = false
})
</script>
