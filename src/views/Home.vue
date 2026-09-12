<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-emerald-600 text-white">
      <div class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">Punnamoottil Super Market</p>
          <h1 class="mt-3 font-display text-4xl leading-tight md:text-6xl">Fresh groceries, honest prices, every day.</h1>
          <p class="mt-4 max-w-lg text-lg text-brand-50">
            Shop rice, oil, spices, dairy and household essentials from your neighbourhood supermarket — then print a clean invoice at the counter.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/products" class="btn-primary bg-white text-brand-800 hover:bg-brand-50">Shop now</RouterLink>
            <RouterLink to="/categories" class="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">Browse categories</RouterLink>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-3xl bg-white/10 p-6 backdrop-blur">
            <p class="text-4xl">🥬</p>
            <p class="mt-3 font-semibold">Daily produce</p>
            <p class="text-sm text-brand-100">Nendran, tomato, onion and more</p>
          </div>
          <div class="mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur">
            <p class="text-4xl">🍚</p>
            <p class="mt-3 font-semibold">Rice & grains</p>
            <p class="text-sm text-brand-100">Matta, ponni and basmati</p>
          </div>
          <div class="rounded-3xl bg-orange-400/90 p-6 text-ink">
            <p class="text-sm font-semibold uppercase">This week</p>
            <p class="mt-2 font-display text-3xl">Up to ₹74 off oils</p>
          </div>
          <div class="rounded-3xl bg-white/10 p-6 backdrop-blur">
            <p class="text-4xl">🥛</p>
            <p class="mt-3 font-semibold">Dairy staples</p>
            <p class="text-sm text-brand-100">Milk, curd, ghee and butter</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-14">
      <div class="mb-6 flex items-end justify-between">
        <div>
          <h2 class="font-display text-3xl">Shop by category</h2>
          <p class="mt-1 text-slate-500">Tap a category to see matching products.</p>
        </div>
        <RouterLink to="/categories" class="hidden text-sm font-semibold text-brand-700 md:inline">View all</RouterLink>
      </div>
      <div v-if="loading" class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div v-for="n in 8" :key="n" class="h-36 animate-pulse rounded-2xl bg-white"></div>
      </div>
      <div v-else class="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-6">
      <h2 class="mb-6 font-display text-3xl">Featured products</h2>
      <ProductGrid :products="featured" />
    </section>

    <section class="mx-auto max-w-7xl px-4 py-12">
      <h2 class="mb-6 font-display text-3xl">Popular this week</h2>
      <ProductGrid :products="popular" />
    </section>

    <section class="mx-auto max-w-7xl px-4 py-8">
      <div class="overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-500 to-amber-400 p-8 text-ink md:p-12">
        <p class="text-sm font-bold uppercase tracking-widest">Offers</p>
        <h2 class="mt-2 font-display text-4xl">Festival pantry refill</h2>
        <p class="mt-3 max-w-xl text-lg">
          Save on 5 kg rice, coconut oil and masala combos. Add to cart, then generate a store invoice in seconds.
        </p>
        <RouterLink to="/products?sort=discount-desc" class="btn-primary mt-6 bg-ink text-white hover:bg-slate-800">See discounted items</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CategoryCard from '@/components/CategoryCard.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import { getCategories, getProducts } from '@/services/catalogService'

const loading = ref(true)
const categories = ref([])
const featured = ref([])
const popular = ref([])

onMounted(async () => {
  const [cats, products] = await Promise.all([getCategories(), getProducts()])
  categories.value = cats
  featured.value = products.filter((product) => product.featured).slice(0, 8)
  popular.value = products.filter((product) => product.popular).slice(0, 8)
  loading.value = false
})
</script>
