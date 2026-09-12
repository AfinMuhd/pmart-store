<template>
  <div class="inline-flex items-center rounded-full border border-brand-100 bg-white">
    <button type="button" class="px-3 py-1.5 text-lg" :disabled="modelValue <= min" aria-label="Decrease quantity" @click="change(-1)">
      −
    </button>
    <span class="min-w-8 text-center text-sm font-semibold" aria-live="polite">{{ modelValue }}</span>
    <button type="button" class="px-3 py-1.5 text-lg" :disabled="modelValue >= max" aria-label="Increase quantity" @click="change(1)">
      +
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 12 },
})

const emit = defineEmits(['update:modelValue', 'decrease-at-min'])

function change(delta) {
  const next = props.modelValue + delta
  if (delta < 0 && props.modelValue <= props.min) {
    emit('decrease-at-min')
    return
  }
  if (next < props.min || next > props.max) return
  emit('update:modelValue', next)
}
</script>
