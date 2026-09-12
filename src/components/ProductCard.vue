<template>
  <article class="card group flex h-full flex-col p-3">
    <RouterLink :to="`/products/${product.slug}`" class="relative">
      <ProductImage :src="product.image" :alt="product.name" />
      <span
        v-if="product.discount > 0"
        class="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white"
      >
        Save {{ formatINR(product.discount) }}
      </span>
      <span
        class="absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-semibold"
        :class="product.inStock ? 'bg-brand-100 text-brand-800' : 'bg-slate-200 text-slate-600'"
      >
        {{ product.inStock ? 'In stock' : 'Out of stock' }}
      </span>
    </RouterLink>
    <div class="mt-3 flex flex-1 flex-col">
      <p class="text-xs uppercase tracking-wide text-slate-400">{{ product.brand }}</p>
      <RouterLink :to="`/products/${product.slug}`" class="mt-0.5 font-semibold leading-snug hover:text-brand-700">
        {{ product.name }}
      </RouterLink>
      <p class="mt-1 text-sm text-slate-500">{{ product.weight }} · {{ product.unit }}</p>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-lg font-bold text-brand-800">{{ formatINR(product.price) }}</span>
        <span v-if="product.mrp > product.price" class="text-sm text-slate-400 line-through">{{ formatINR(product.mrp) }}</span>
      </div>
      <button
        type="button"
        class="btn-primary mt-auto w-full"
        :disabled="!product.inStock || adding"
        @click="add"
      >
        {{ product.inStock ? (adding ? 'Adding…' : 'Add to Cart') : 'Out of stock' }}
      </button>
      <p v-if="message" class="mt-2 text-xs text-red-600">{{ message }}</p>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import ProductImage from '@/components/ProductImage.vue'
import { useCartStore } from '@/stores/cart'
import { formatINR } from '@/utils/currency'

const props = defineProps({
  product: { type: Object, required: true },
})

const cart = useCartStore()
const adding = ref(false)
const message = ref('')

async function add() {
  adding.value = true
  message.value = ''
  const result = await cart.addProduct(props.product, 1)
  if (!result.ok) message.value = result.message
  adding.value = false
}
</script>
