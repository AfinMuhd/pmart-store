<template>
  <div class="mx-auto max-w-5xl px-4 py-10">
    <div v-if="!invoice" class="card p-10 text-center">
      <h1 class="font-display text-3xl">No invoice to display</h1>
      <p class="mt-2 text-slate-500">Generate an invoice from your cart after adding products and customer details.</p>
      <RouterLink to="/cart" class="btn-primary mt-6">Go to cart</RouterLink>
    </div>
    <template v-else>
      <div class="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="font-display text-3xl">Invoice</h1>
          <p class="text-sm text-slate-500">Print this bill or save it as a PDF from your browser print dialog.</p>
        </div>
        <div class="flex gap-3">
          <button type="button" class="btn-secondary" @click="printInvoice">Print Invoice</button>
          <button type="button" class="btn-primary" @click="saveInvoiceAsPdf">Save as PDF</button>
        </div>
      </div>
      <InvoiceDocument :invoice="invoice" />
    </template>
  </div>
</template>

<script setup>
import InvoiceDocument from '@/components/Invoice.vue'
import { printInvoice, saveInvoiceAsPdf } from '@/services/printService'
import { useInvoiceStore } from '@/stores/invoice'

const invoices = useInvoiceStore()
const invoice = invoices.current
</script>
