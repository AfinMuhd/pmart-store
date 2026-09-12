<template>
  <div class="mx-auto max-w-7xl px-4 py-10">
    <h1 class="font-display text-4xl">All products</h1>
    <p class="mt-2 text-slate-500">Search, filter and sort from the Punnamood aisle.</p>

    <div class="mt-6 grid gap-3 rounded-2xl bg-white p-4 md:grid-cols-4">
      <label class="text-sm">
        <span class="mb-1 block font-medium">Search</span>
        <input v-model="filters.q" type="search" class="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Product or brand" />
      </label>
      <label class="text-sm">
        <span class="mb-1 block font-medium">Category</span>
        <select v-model="filters.category" class="w-full rounded-xl border border-slate-200 px-3 py-2">
          <option value="">All categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.slug">{{ category.name }}</option>
        </select>
      </label>
      <label class="text-sm">
        <span class="mb-1 block font-medium">Sort</span>
        <select v-model="filters.sort" class="w-full rounded-xl border border-slate-200 px-3 py-2">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="discount-desc">Highest discount</option>
        </select>
      </label>
      <label class="flex items-end gap-2 pb-2 text-sm">
        <input v-model="filters.inStockOnly" type="checkbox" class="h-4 w-4 rounded border-slate-300" />
        In stock only
      </label>
    </div>

    <p v-if="loading" class="mt-8 text-slate-500">Loading products…</p>
    <template v-else>
      <p class="mt-6 text-sm text-slate-500">{{ visible.length }} product{{ visible.length === 1 ? '' : 's' }}</p>
      <div class="mt-4">
        <ProductGrid :products="visible" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductGrid from '@/components/ProductGrid.vue'
import { getCategories, getProducts } from '@/services/catalogService'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const products = ref([])
const categories = ref([])
const filters = reactive({
  q: '',
  category: '',
  sort: 'featured',
  inStockOnly: false,
})

const categoryBySlug = computed(() => Object.fromEntries(categories.value.map((category) => [category.slug, category])))

function syncFromRoute() {
  filters.q = String(route.query.q || '')
  filters.category = String(route.query.category || '')
  filters.sort = String(route.query.sort || 'featured')
  filters.inStockOnly = route.query.stock === 'in'
}

watch(
  filters,
  () => {
    const query = {
      ...(filters.q ? { q: filters.q } : {}),
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.sort !== 'featured' ? { sort: filters.sort } : {}),
      ...(filters.inStockOnly ? { stock: 'in' } : {}),
    }
    if (JSON.stringify(query) === JSON.stringify(route.query)) return
    router.replace({ query })
  },
  { deep: true },
)

watch(() => route.query, syncFromRoute)

const visible = computed(() => {
  const query = filters.q.trim().toLowerCase()
  const selected = categoryBySlug.value[filters.category]
  let list = products.value.filter((product) => {
    const matchesQuery =
      !query || [product.name, product.brand, product.category, product.description].join(' ').toLowerCase().includes(query)
    const matchesCategory = !selected || product.categoryId === selected.id
    const matchesStock = !filters.inStockOnly || product.inStock
    return matchesQuery && matchesCategory && matchesStock
  })

  const sorters = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name),
    'discount-desc': (a, b) => b.discount - a.discount,
    featured: (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
  }
  return [...list].sort(sorters[filters.sort] || sorters.featured)
})

onMounted(async () => {
  syncFromRoute()
  products.value = await getProducts()
  categories.value = await getCategories()
  loading.value = false
})
</script>
