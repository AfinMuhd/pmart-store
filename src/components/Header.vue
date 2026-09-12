<template>
  <header class="sticky top-0 z-40 border-b border-brand-100/80 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
      <RouterLink to="/" class="flex shrink-0 items-center gap-2">
        <span class="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-lg text-white" aria-hidden="true">🛒</span>
        <span class="leading-tight">
          <span class="block font-display text-lg text-brand-800">Punnamoottil</span>
          <span class="block text-[11px] uppercase tracking-[0.18em] text-brand-600">Super Market</span>
        </span>
      </RouterLink>

      <div class="hidden flex-1 md:block">
        <SearchBar />
      </div>

      <nav class="hidden items-center gap-5 text-sm font-medium text-slate-700 lg:flex" aria-label="Primary">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="hover:text-brand-700">
          {{ link.label }}
        </RouterLink>
      </nav>

      <RouterLink to="/cart" class="relative ml-auto rounded-full p-2 hover:bg-brand-50" aria-label="Open cart">
        <span class="text-2xl" aria-hidden="true">🛒</span>
        <span
          v-if="cart.totalItems"
          class="absolute -right-1 -top-1 min-w-5 rounded-full bg-orange-500 px-1.5 text-center text-xs font-bold text-white"
        >
          {{ cart.totalItems }}
        </span>
      </RouterLink>

      <button
        type="button"
        class="rounded-lg p-2 lg:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="sr-only">Menu</span>
        <span class="block h-0.5 w-6 bg-ink"></span>
        <span class="mt-1.5 block h-0.5 w-6 bg-ink"></span>
        <span class="mt-1.5 block h-0.5 w-6 bg-ink"></span>
      </button>
    </div>

    <div class="border-t border-brand-50 px-4 py-3 md:hidden">
      <SearchBar />
    </div>

    <div v-if="menuOpen" id="mobile-menu" class="border-t border-brand-100 bg-white px-4 py-3 lg:hidden">
      <nav class="flex flex-col gap-3 text-sm font-medium" aria-label="Mobile">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" @click="menuOpen = false">
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const menuOpen = ref(false)
const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/cart', label: 'Cart' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
</script>
