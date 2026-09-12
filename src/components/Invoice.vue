<template>
  <section class="print-invoice mx-auto max-w-3xl bg-white p-6 shadow-card sm:p-10">
    <header class="border-b-2 border-brand-700 pb-4 text-center">
      <p class="font-display text-3xl text-brand-800">{{ store.name }}</p>
      <p class="mt-1 text-sm text-slate-600">{{ store.addressLines.join(', ') }}</p>
      <p class="text-sm text-slate-600">Phone: {{ store.phone }} · {{ store.email }}</p>
      <p class="text-xs text-slate-500">GSTIN: {{ store.gstin }}</p>
    </header>

    <div class="mt-6 grid gap-4 text-sm sm:grid-cols-2">
      <div>
        <p><span class="font-semibold">Invoice No:</span> {{ invoice.number }}</p>
        <p><span class="font-semibold">Date:</span> {{ issuedLabel }}</p>
      </div>
      <div>
        <p class="font-semibold">Customer</p>
        <p>{{ invoice.customer.name }}</p>
        <p>{{ invoice.customer.phone }}</p>
        <p class="whitespace-pre-line">{{ invoice.customer.address }}</p>
        <p v-if="invoice.customer.email">{{ invoice.customer.email }}</p>
      </div>
    </div>

    <table class="mt-6 w-full border-collapse text-sm">
      <thead>
        <tr class="border-y-2 border-slate-800 text-left">
          <th class="py-2 font-semibold">Product</th>
          <th class="py-2 text-right font-semibold">Qty</th>
          <th class="py-2 text-right font-semibold">Price</th>
          <th class="py-2 text-right font-semibold">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in invoice.items" :key="item.id" class="border-b border-slate-200">
          <td class="py-2">
            {{ item.name }}
            <span class="block text-xs text-slate-500">{{ item.weight }}</span>
          </td>
          <td class="py-2 text-right">{{ item.quantity }}</td>
          <td class="py-2 text-right">{{ formatINR(item.price) }}</td>
          <td class="py-2 text-right">{{ formatINR(item.lineTotal) }}</td>
        </tr>
      </tbody>
    </table>

    <dl class="ml-auto mt-4 max-w-xs space-y-2 text-sm">
      <div class="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{{ formatINR(invoice.subtotal) }}</dd>
      </div>
      <div class="flex justify-between">
        <dt>Discount</dt>
        <dd>{{ formatINR(invoice.discount) }}</dd>
      </div>
      <div class="flex justify-between border-y-2 border-slate-800 py-2 text-base font-bold">
        <dt>GRAND TOTAL</dt>
        <dd>{{ formatINR(invoice.grandTotal) }}</dd>
      </div>
    </dl>

    <p class="mt-8 text-center text-sm italic text-slate-600">Thank you for shopping with us!</p>
    <p class="mt-1 text-center text-xs text-slate-400">This is a Phase 1 preview invoice generated in the browser.</p>
  </section>
</template>

<script setup>
import storeInfo from '@/config/storeInfo'
import { formatINR } from '@/utils/currency'

const props = defineProps({
  invoice: { type: Object, required: true },
})

const store = storeInfo
const issuedLabel = new Date(props.invoice.issuedAt).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
</script>
