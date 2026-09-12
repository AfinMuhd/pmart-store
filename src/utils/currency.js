const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatINR(amount) {
  return rupeeFormatter.format(Math.round(Number(amount) || 0))
}
