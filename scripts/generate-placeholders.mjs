import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const products = JSON.parse(await readFile(path.join(root, 'src/data/products.json'), 'utf8'))
const outDir = path.join(root, 'public/products')
await mkdir(outDir, { recursive: true })

const palettes = [
  ['#166534', '#dcfce7'],
  ['#9a3412', '#ffedd5'],
  ['#1e3a8a', '#dbeafe'],
  ['#854d0e', '#fef9c3'],
  ['#9f1239', '#ffe4e6'],
]

for (const [index, product] of products.entries()) {
  const [fg, bg] = palettes[index % palettes.length]
  const initials = product.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="${bg}"/>
  <circle cx="300" cy="250" r="120" fill="${fg}"/>
  <text x="300" y="262" text-anchor="middle" font-size="64" font-family="Arial" fill="white">${initials}</text>
  <text x="300" y="420" text-anchor="middle" font-size="28" font-family="Arial" fill="#14532d">${escapeXml(product.name)}</text>
  <text x="300" y="460" text-anchor="middle" font-size="20" font-family="Arial" fill="#3f6212">${escapeXml(product.weight)}</text>
</svg>`
  const filename = path.basename(product.image)
  await writeFile(path.join(outDir, filename), svg)
}

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[char]))
}

console.log(`Wrote ${products.length} product placeholders`)
