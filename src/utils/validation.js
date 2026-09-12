const INDIAN_MOBILE = /^[6-9]\d{9}$/

export function isNonEmptyName(value) {
  return String(value || '').trim().length >= 2
}

export function isValidPhone(value) {
  const digits = String(value || '').replace(/\D/g, '')
  return INDIAN_MOBILE.test(digits)
}

export function isValidEmail(value) {
  const email = String(value || '').trim()
  if (!email) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isNonEmptyAddress(value) {
  return String(value || '').trim().length >= 8
}

export function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '').slice(0, 10)
}
