<template>
  <div class="mx-auto max-w-7xl px-4 py-10">
    <p v-if="loading" class="text-slate-500">Loading product…</p>
    <div v-else-if="error" class="rounded-2xl bg-white p-10 text-center">
      <h1 class="font-display text-3xl">Product not found</h1>
      <p class="mt-2 text-slate-500">{{ error }}</p>
      <RouterLink to="/products" class="btn-primary mt-6">Back to products</RouterLink>
    </div>
    <template v-else>
      <div class="grid gap-10 md:grid-cols-2">
        <ProductImage :src="product.image" :alt="product.name" class="rounded-[2rem]" />
        <div>
          <p class="text-sm uppercase tracking-wide text-slate-400">{{ product.brand }} · {{ product.category }}</p>
          <h1 class="mt-2 font-display text-4xl">{{ product.name }}</h1>
          <p class="mt-4 text-slate-600">{{ product.description }}</p>
          <p class="mt-3 text-sm text-slate-500">{{ product.weight }} · {{ product.unit }}</p>
          <div class="mt-5 flex items-end gap-3">
            <p class="text-3xl font-bold text-brand-800">{{ formatINR(product.price) }}</p>
            <p v-if="product.mrp > product.price" class="text-lg text-slate-400 line-through">{{ formatINR(product.mrp) }}</p>
            <p v-if="product.discount" class="rounded-full bg-orange-100 px-2 py-0.5 text-sm font-semibold text-orange-700">
              Save {{ formatINR(product.discount) }}
            </p>
          </div>
          <p class="mt-3 text-sm" :class="product.inStock ? 'text-brand-700' : 'text-slate-500'">
            {{ product.inStock ? `In stock · up to ${maxQty} units` : 'Currently out of stock' }}
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-4">
            <QuantitySelector v-model="quantity" :max="Math.max(maxQty, 1)" :min="1" />
            <button type="button" class="btn-primary" :disabled="!product.inStock" @click="add">
              Add to Cart
            </button>
          </div>
          <p v-if="message" class="mt-3 text-sm" :class="ok ? 'text-brand-700' : 'text-red-600'">{{ message }}</p>
        </div>
      </div>

      <section class="mt-14">
        <h2 class="mb-6 font-display text-3xl">Related products</h2>
        <ProductGrid v-if="related.length" :products="related" />
        <p v-else class="text-slate-500">No related products in this category yet.</p>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductGrid from '@/components/ProductGrid.vue'
import ProductImage from '@/components/ProductImage.vue'
import QuantitySelector from '@/components/QuantitySelector.vue'
import { getMaxQuantity, getProductBySlug, getRelatedProducts } from '@/services/catalogService'
import { useCartStore } from '@/stores/cart'
import { formatINR } from '@/utils/currency'

const route = useRoute()
const cart = useCartStore()
const loading = ref(true)
const error = ref('')
const product = ref(null)
const related = ref([])
const quantity = ref(1)
const message = ref('')
const ok = ref(false)

const maxQty = computed(() => (product.value ? getMaxQuantity(product.value) : 0))

async function load() {
  loading.value = true
  error.value = ''
  message.value = ''
  const found = await getProductBySlug(route.params.slug)
  if (!found) {
    product.value = null
    error.value = 'This product slug is invalid or the item was removed from the catalogue.'
    loading.value = false
    return
  }
  product.value = found
  quantity.value = 1
  related.value = await getRelatedProducts(found)
  loading.value = false
}

watch(() => route.params.slug, load, { immediate: true })

async function add() {
  const result = await cart.addProduct(product.value, quantity.value)
  ok.value = result.ok
  message.value = result.ok ? 'Added to cart.' : result.message
}
</script>
