import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { getMaxQuantity, getProductById } from '@/services/catalogService'
import { cartDiscount, cartGrandTotal, cartSubtotal, lineItemDiscount, lineItemTotal } from '@/utils/pricing'

const STORAGE_KEY = 'punnamood_cart_v1'

function loadPersistedItems() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && item.productId && item.quantity > 0)
      .map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
      }))
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref(loadPersistedItems())
  const resolvedLines = ref([])
  const hydrating = ref(false)
  let skipPersistWatch = false

  async function hydrate() {
    hydrating.value = true
    const lines = []
    const validItems = []

    for (const item of items.value) {
      const product = await getProductById(item.productId)
      if (!product) continue
      const maxQty = getMaxQuantity(product)
      const quantity = Math.min(item.quantity, maxQty || item.quantity)
      if (quantity <= 0) continue
      validItems.push({ productId: product.id, quantity })
      lines.push({
        product,
        quantity,
        lineTotal: lineItemTotal(product.price, quantity),
        lineDiscount: lineItemDiscount(product.mrp, product.price, quantity),
      })
    }

    resolvedLines.value = lines
    const changed =
      validItems.length !== items.value.length ||
      validItems.some(
        (item, index) =>
          item.productId !== items.value[index]?.productId || item.quantity !== items.value[index]?.quantity,
      )
    if (changed) {
      skipPersistWatch = true
      items.value = validItems
      skipPersistWatch = false
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    hydrating.value = false
  }

  watch(
    items,
    () => {
      if (skipPersistWatch) return
      hydrate()
    },
    { deep: true },
  )

  hydrate()

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
  )
  const pricedItems = computed(() =>
    resolvedLines.value.map((line) => ({
      mrp: line.product.mrp,
      price: line.product.price,
      quantity: line.quantity,
    })),
  )
  const subtotal = computed(() => cartSubtotal(pricedItems.value))
  const totalDiscount = computed(() => cartDiscount(pricedItems.value))
  const grandTotal = computed(() => cartGrandTotal(pricedItems.value))

  function quantityFor(productId) {
    return items.value.find((item) => item.productId === productId)?.quantity || 0
  }

  async function addProduct(product, quantity = 1) {
    if (!product?.id || !product.inStock) {
      return { ok: false, message: 'This product is currently out of stock.' }
    }
    const maxQty = getMaxQuantity(product)
    const existing = items.value.find((item) => item.productId === product.id)
    const nextQty = (existing?.quantity || 0) + quantity
    if (nextQty > maxQty) {
      return { ok: false, message: `Only ${maxQty} units available.` }
    }
    if (existing) {
      existing.quantity = nextQty
    } else {
      items.value.push({ productId: product.id, quantity: nextQty })
    }
    return { ok: true }
  }

  async function setQuantity(productId, quantity) {
    const product = await getProductById(productId)
    if (!product) {
      removeProduct(productId)
      return { ok: false, message: 'This product is no longer available.' }
    }
    const maxQty = getMaxQuantity(product)
    if (quantity <= 0) {
      removeProduct(productId)
      return { ok: true, removed: true }
    }
    if (quantity > maxQty) {
      const item = items.value.find((entry) => entry.productId === productId)
      if (item) item.quantity = maxQty
      return { ok: false, message: `Only ${maxQty} units available.` }
    }
    const item = items.value.find((entry) => entry.productId === productId)
    if (item) item.quantity = quantity
    return { ok: true }
  }

  function increment(productId) {
    const item = items.value.find((entry) => entry.productId === productId)
    if (!item) return
    setQuantity(productId, item.quantity + 1)
  }

  function decrement(productId, { confirmRemove } = {}) {
    const item = items.value.find((entry) => entry.productId === productId)
    if (!item) return { ok: true }
    if (item.quantity <= 1) {
      const shouldRemove = confirmRemove
        ? confirmRemove()
        : window.confirm('Remove this item from your cart?')
      if (shouldRemove) {
        removeProduct(productId)
        return { ok: true, removed: true }
      }
      return { ok: false }
    }
    setQuantity(productId, item.quantity - 1)
    return { ok: true }
  }

  function removeProduct(productId) {
    items.value = items.value.filter((item) => item.productId !== productId)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    resolvedLines,
    hydrating,
    totalItems,
    subtotal,
    totalDiscount,
    grandTotal,
    quantityFor,
    addProduct,
    setQuantity,
    increment,
    decrement,
    removeProduct,
    clearCart,
    hydrate,
  }
})
