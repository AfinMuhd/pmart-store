<template>
  <footer class="mt-16 bg-brand-900 text-brand-50">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
      <div>
        <p class="font-display text-2xl text-white">Punnamoottil Super Market</p>
        <p class="mt-3 text-sm leading-6 text-brand-100">
          Neighbourhood groceries, household essentials, and daily fresh produce — packed with care from Punnamood.
        </p>
      </div>
      <div>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-brand-200">About</h2>
        <ul class="mt-3 space-y-2 text-sm">
          <li><RouterLink to="/about" class="hover:text-white">Our store</RouterLink></li>
          <li><RouterLink to="/products" class="hover:text-white">Shop products</RouterLink></li>
          <li><RouterLink to="/categories" class="hover:text-white">Categories</RouterLink></li>
        </ul>
      </div>
      <div>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-brand-200">Contact</h2>
        <ul class="mt-3 space-y-2 text-sm text-brand-100">
          <li>{{ store.addressLines.join(', ') }}</li>
          <li><a :href="`tel:${store.phone}`" class="hover:text-white">{{ store.phone }}</a></li>
          <li><a :href="`mailto:${store.email}`" class="hover:text-white">{{ store.email }}</a></li>
          <li>{{ store.hours }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-brand-200">Follow</h2>
        <div class="mt-3 flex gap-3 text-sm">
          <a href="#" class="rounded-full border border-brand-700 px-3 py-1 hover:bg-brand-800">Instagram</a>
          <a href="#" class="rounded-full border border-brand-700 px-3 py-1 hover:bg-brand-800">Facebook</a>
          <a href="#" class="rounded-full border border-brand-700 px-3 py-1 hover:bg-brand-800">WhatsApp</a>
        </div>
      </div>
    </div>
    <p class="border-t border-brand-800 py-4 text-center text-xs text-brand-200">
      © {{ year }} Punnamoottil Super Market. All rights reserved. Phase 1 — in-store invoice preview only.
    </p>
  </footer>
</template>

<script setup>
import storeInfo from '@/config/storeInfo'

const store = storeInfo
const year = new Date().getFullYear()
</script>
