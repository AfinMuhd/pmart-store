<template>
  <div class="mx-auto max-w-3xl px-4 py-10">
    <h1 class="font-display text-4xl">Customer details</h1>
    <p class="mt-2 text-slate-500">We’ll use this information on your store invoice.</p>

    <div v-if="!cart.resolvedLines.length" class="card mt-8 p-8 text-center">
      <p>Your cart is empty, so an invoice cannot be generated.</p>
      <RouterLink to="/products" class="btn-primary mt-4">Continue shopping</RouterLink>
    </div>

    <form v-else class="card mt-8 space-y-4 p-6" @submit.prevent="submit">
      <label class="block text-sm">
        <span class="mb-1 block font-medium">Customer name</span>
        <input v-model="form.name" required class="w-full rounded-xl border border-slate-200 px-3 py-2" autocomplete="name" />
        <span v-if="errors.name" class="text-xs text-red-600">{{ errors.name }}</span>
      </label>
      <label class="block text-sm">
        <span class="mb-1 block font-medium">Phone number</span>
        <input v-model="form.phone" required inputmode="numeric" maxlength="10" class="w-full rounded-xl border border-slate-200 px-3 py-2" autocomplete="tel" />
        <span v-if="errors.phone" class="text-xs text-red-600">{{ errors.phone }}</span>
      </label>
      <label class="block text-sm">
        <span class="mb-1 block font-medium">Address</span>
        <textarea v-model="form.address" required rows="3" class="w-full rounded-xl border border-slate-200 px-3 py-2" autocomplete="street-address"></textarea>
        <span v-if="errors.address" class="text-xs text-red-600">{{ errors.address }}</span>
      </label>
      <label class="block text-sm">
        <span class="mb-1 block font-medium">Email <span class="font-normal text-slate-400">(optional)</span></span>
        <input v-model="form.email" type="email" class="w-full rounded-xl border border-slate-200 px-3 py-2" autocomplete="email" />
        <span v-if="errors.email" class="text-xs text-red-600">{{ errors.email }}</span>
      </label>
      <CartSummary />
      <div class="flex flex-wrap gap-3">
        <RouterLink to="/cart" class="btn-secondary">Back to cart</RouterLink>
        <button type="submit" class="btn-primary">Generate invoice</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import CartSummary from '@/components/CartSummary.vue'
import { useCartStore } from '@/stores/cart'
import { useInvoiceStore } from '@/stores/invoice'
import { isNonEmptyAddress, isNonEmptyName, isValidEmail, isValidPhone, normalizePhone } from '@/utils/validation'

const router = useRouter()
const cart = useCartStore()
const invoices = useInvoiceStore()
const form = reactive({ name: '', phone: '', address: '', email: '' })
const errors = reactive({ name: '', phone: '', address: '', email: '' })

function validate() {
  errors.name = isNonEmptyName(form.name) ? '' : 'Please enter the customer name.'
  errors.phone = isValidPhone(form.phone) ? '' : 'Enter a valid 10-digit Indian mobile number.'
  errors.address = isNonEmptyAddress(form.address) ? '' : 'Please enter a complete address.'
  errors.email = isValidEmail(form.email) ? '' : 'Enter a valid email or leave it blank.'
  return !errors.name && !errors.phone && !errors.address && !errors.email
}

function submit() {
  form.phone = normalizePhone(form.phone)
  if (!cart.resolvedLines.length) return
  if (!validate()) return
  invoices.createInvoice(form)
  router.push('/invoice')
}
</script>
