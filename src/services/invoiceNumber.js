const STORAGE_KEY = 'punnamood_invoice_seq_v1'

function todayStamp(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

function readSequence() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (parsed && typeof parsed === 'object') return parsed
  } catch {
    /* ignore corrupt storage */
  }
  return {}
}

export function peekNextInvoiceNumber(date = new Date()) {
  const stamp = todayStamp(date)
  const stored = readSequence()
  const seq = stored.date === stamp ? Number(stored.seq || 0) + 1 : 1
  return formatInvoiceNumber(stamp, seq)
}

export function nextInvoiceNumber(date = new Date()) {
  const stamp = todayStamp(date)
  const stored = readSequence()
  const seq = stored.date === stamp ? Number(stored.seq || 0) + 1 : 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: stamp, seq }))
  return formatInvoiceNumber(stamp, seq)
}

export function formatInvoiceNumber(stamp, seq) {
  return `INV-${stamp}-${String(seq).padStart(3, '0')}`
}
