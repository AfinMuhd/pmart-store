<template>
  <div class="mx-auto max-w-3xl px-4 py-14">
    <h1 class="font-display text-4xl">Contact</h1>
    <div class="card mt-8 space-y-3 p-6 text-slate-700">
      <p class="font-semibold text-ink">{{ store.name }}</p>
      <p>{{ store.addressLines.join(', ') }}</p>
      <p>Phone: <a class="text-brand-700" :href="`tel:${store.phone}`">{{ store.phone }}</a></p>
      <p>Email: <a class="text-brand-700" :href="`mailto:${store.email}`">{{ store.email }}</a></p>
      <p>{{ store.hours }}</p>
    </div>
  </div>
</template>

<script setup>
import storeInfo from '@/config/storeInfo'

const store = storeInfo
</script>
