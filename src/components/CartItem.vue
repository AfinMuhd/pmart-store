<template>
  <article class="flex gap-4 border-b border-slate-100 py-4 last:border-0">
    <RouterLink :to="`/products/${line.product.slug}`" class="w-20 shrink-0">
      <ProductImage :src="line.product.image" :alt="line.product.name" />
    </RouterLink>
    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <div>
          <RouterLink :to="`/products/${line.product.slug}`" class="font-semibold hover:text-brand-700">
            {{ line.product.name }} {{ line.product.weight }}
          </RouterLink>
          <p class="text-sm text-slate-500">{{ line.product.brand }}</p>
        </div>
        <button type="button" class="text-sm text-red-600 hover:underline" @click="cart.removeProduct(line.product.id)">
          Remove
        </button>
      </div>
      <p class="mt-1 font-semibold">{{ formatINR(line.product.price) }}</p>
      <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 text-sm">
          <span class="text-slate-500">Qty:</span>
          <QuantitySelector
            :model-value="line.quantity"
            :max="maxQty"
            @update:model-value="onQuantity"
            @decrease-at-min="onDecreaseAtMin"
          />
        </div>
        <p class="font-semibold">Total: {{ formatINR(line.lineTotal) }}</p>
      </div>
    </div>
  </article>
</template>

<script setup>
import ProductImage from '@/components/ProductImage.vue'
import QuantitySelector from '@/components/QuantitySelector.vue'
import { getMaxQuantity } from '@/services/catalogService'
import { useCartStore } from '@/stores/cart'
import { formatINR } from '@/utils/currency'

const props = defineProps({
  line: { type: Object, required: true },
})

const cart = useCartStore()
const maxQty = getMaxQuantity(props.line.product)

function onQuantity(quantity) {
  cart.setQuantity(props.line.product.id, quantity)
}

function onDecreaseAtMin() {
  cart.decrement(props.line.product.id)
}
</script>
