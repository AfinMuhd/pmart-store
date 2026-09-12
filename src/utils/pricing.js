export function lineItemTotal(price, quantity) {
  return (Number(price) || 0) * (Number(quantity) || 0)
}

export function lineItemDiscount(mrp, price, quantity) {
  const saving = Math.max(0, (Number(mrp) || 0) - (Number(price) || 0))
  return saving * (Number(quantity) || 0)
}

export function cartSubtotal(items) {
  return items.reduce((sum, item) => sum + lineItemTotal(item.price, item.quantity), 0)
}

export function cartDiscount(items) {
  return items.reduce(
    (sum, item) => sum + lineItemDiscount(item.mrp, item.price, item.quantity),
    0,
  )
}

export function cartGrandTotal(items) {
  return cartSubtotal(items)
}

export function discountPercent(mrp, price) {
  const list = Number(mrp) || 0
  const selling = Number(price) || 0
  if (list <= 0 || selling >= list) return 0
  return Math.round(((list - selling) / list) * 100)
}
