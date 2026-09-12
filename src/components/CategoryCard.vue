<template>
  <RouterLink
    :to="{ path: '/products', query: { category: category.slug } }"
    class="card group flex h-full flex-col overflow-hidden p-4 transition hover:-translate-y-1"
  >
    <div
      class="mb-4 grid h-16 w-16 place-items-center rounded-2xl text-2xl text-white"
      :style="{ background: category.accent }"
      aria-hidden="true"
    >
      {{ icon }}
    </div>
    <h3 class="font-semibold text-ink">{{ category.name }}</h3>
    <p class="mt-1 text-sm text-slate-500">{{ category.description }}</p>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  category: { type: Object, required: true },
})

const icons = {
  flour: '🌾',
  'rice-grains': '🍚',
  pulses: '🫘',
  'cooking-oil': '🫙',
  spices: '🌶️',
  dairy: '🥛',
  beverages: '☕',
  snacks: '🍿',
  biscuits: '🍪',
  bakery: '🍞',
  'fruits-vegetables': '🥬',
  'personal-care': '🧴',
  household: '🏠',
  cleaning: '✨',
  grocery: '🛒',
}

const icon = icons[props.category.slug] || '🛍️'
</script>
