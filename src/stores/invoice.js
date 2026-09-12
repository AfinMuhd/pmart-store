import { defineStore } from 'pinia'
import { ref } from 'vue'
import { nextInvoiceNumber } from '@/services/invoiceNumber'
import { useCartStore } from '@/stores/cart'

const LAST_INVOICE_KEY = 'punnamood_last_invoice_v1'

function loadLastInvoice() {
  try {
    return JSON.parse(sessionStorage.getItem(LAST_INVOICE_KEY) || 'null')
  } catch {
    return null
  }
}

export const useInvoiceStore = defineStore('invoice', () => {
  const current = ref(loadLastInvoice())

  function persist(invoice) {
    current.value = invoice
    sessionStorage.setItem(LAST_INVOICE_KEY, JSON.stringify(invoice))
  }

  function createInvoice(customer) {
    const cart = useCartStore()
    if (!cart.resolvedLines.length) {
      throw new Error('Your cart is empty.')
    }

    const invoice = {
      number: nextInvoiceNumber(),
      issuedAt: new Date().toISOString(),
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        email: (customer.email || '').trim(),
      },
      items: cart.resolvedLines.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        weight: line.product.weight,
        quantity: line.quantity,
        price: line.product.price,
        mrp: line.product.mrp,
        lineTotal: line.lineTotal,
        lineDiscount: line.lineDiscount,
      })),
      subtotal: cart.subtotal,
      discount: cart.totalDiscount,
      grandTotal: cart.grandTotal,
    }

    persist(invoice)
    return invoice
  }

  return {
    current,
    createInvoice,
    persist,
  }
})
