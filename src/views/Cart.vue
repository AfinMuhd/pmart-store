<template>
  <div class="mx-auto max-w-7xl px-4 py-10">
    <h1 class="font-display text-4xl">Your cart</h1>

    <div v-if="!cart.resolvedLines.length" class="card mt-8 p-10 text-center">
      <p class="text-5xl" aria-hidden="true">🧺</p>
      <h2 class="mt-4 font-display text-3xl">Your cart is empty</h2>
      <p class="mt-2 text-slate-500">Add groceries to see totals, discounts and an invoice preview.</p>
      <RouterLink to="/products" class="btn-primary mt-6">Continue shopping</RouterLink>
    </div>

    <div v-else class="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
      <section class="card p-5">
        <div class="mb-2 flex items-center justify-between">
          <h2 class="font-semibold">Items</h2>
          <button type="button" class="text-sm text-red-600 hover:underline" @click="clear">Clear cart</button>
        </div>
        <CartItem v-for="line in cart.resolvedLines" :key="line.product.id" :line="line" />
        <RouterLink to="/products" class="btn-secondary mt-4">Continue shopping</RouterLink>
      </section>
      <CartSummary>
        <RouterLink class="btn-primary mt-5 w-full" to="/checkout">Proceed to Invoice</RouterLink>
      </CartSummary>
    </div>
  </div>
</template>

<script setup>
import CartItem from '@/components/CartItem.vue'
import CartSummary from '@/components/CartSummary.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

function clear() {
  if (window.confirm('Remove all items from your cart?')) {
    cart.clearCart()
  }
}
</script>
