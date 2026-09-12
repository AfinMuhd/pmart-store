<template>
  <aside class="card p-5">
    <h2 class="font-display text-2xl">Order summary</h2>
    <dl class="mt-4 space-y-3 text-sm">
      <div class="flex justify-between">
        <dt>Subtotal</dt>
        <dd class="font-medium">{{ formatINR(cart.subtotal) }}</dd>
      </div>
      <div class="flex justify-between text-brand-700">
        <dt>Discount</dt>
        <dd class="font-medium">{{ formatINR(cart.totalDiscount) }}</dd>
      </div>
      <div class="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-bold">
        <dt>Grand Total</dt>
        <dd>{{ formatINR(cart.grandTotal) }}</dd>
      </div>
    </dl>
    <p class="mt-3 text-xs text-slate-500">{{ cart.totalItems }} item{{ cart.totalItems === 1 ? '' : 's' }} in cart</p>
    <slot />
  </aside>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { formatINR } from '@/utils/currency'

const cart = useCartStore()
</script>
