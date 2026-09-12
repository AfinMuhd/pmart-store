<template>
  <div v-if="!products.length" class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
    <p class="text-lg font-semibold">No products found</p>
    <p class="mt-2 text-slate-500">Try another search or category.</p>
  </div>
  <div v-else class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue'

defineProps({
  products: { type: Array, required: true },
})
</script>
