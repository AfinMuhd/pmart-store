import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

const productsById = new Map(productsData.map((product) => [product.id, product]))
const productsBySlug = new Map(productsData.map((product) => [product.slug, product]))

export async function getProducts() {
  return clone(productsData)
}

export async function getCategories() {
  return clone(categoriesData)
}

export async function getProductBySlug(slug) {
  const product = productsBySlug.get(slug)
  return product ? clone(product) : null
}

export async function getProductById(id) {
  const product = productsById.get(Number(id))
  return product ? clone(product) : null
}

export async function getRelatedProducts(product, limit = 4) {
  const products = await getProducts()
  return products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
    .slice(0, limit)
}

export function getMaxQuantity(product) {
  if (!product?.inStock) return 0
  const stock = Number(product.stockQty)
  if (Number.isFinite(stock) && stock > 0) return stock
  return 12
}
