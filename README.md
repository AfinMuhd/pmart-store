# Punnamoottil Super Market — Phase 1 Frontend

A Vue 3 supermarket shopping website for browsing products, managing a cart, and generating a printable invoice. All catalogue data lives in local JSON. There is no backend in Phase 1.

## Setup

```bash
npm install
npm run generate:placeholders
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Installed dependencies

**Runtime**

- `vue`
- `vue-router`
- `pinia`

**Tooling**

- `vite`
- `@vitejs/plugin-vue`
- `tailwindcss`
- `postcss`
- `autoprefixer`

Print / Save as PDF uses the browser print dialog and print CSS (`src/services/printService.js`) so no extra PDF library is required.

## Project structure

```text
src/
├── assets/
├── components/
│   ├── Header.vue
│   ├── Footer.vue
│   ├── SearchBar.vue
│   ├── CategoryCard.vue
│   ├── ProductCard.vue
│   ├── ProductGrid.vue
│   ├── ProductImage.vue
│   ├── CartItem.vue
│   ├── CartSummary.vue
│   ├── QuantitySelector.vue
│   └── Invoice.vue
├── views/
│   ├── Home.vue
│   ├── Products.vue
│   ├── ProductDetails.vue
│   ├── Categories.vue
│   ├── Cart.vue
│   ├── Checkout.vue
│   ├── InvoicePage.vue
│   ├── About.vue
│   └── Contact.vue
├── data/
│   ├── products.json
│   └── categories.json
├── services/
│   ├── catalogService.js
│   ├── invoiceNumber.js
│   └── printService.js
├── stores/
│   ├── cart.js
│   └── invoice.js
├── utils/
│   ├── currency.js
│   ├── pricing.js
│   └── validation.js
├── router/
│   └── index.js
└── App.vue
public/
└── products/
```

## Cart architecture

Pinia (`src/stores/cart.js`) stores only `{ productId, quantity }` and writes that array to `localStorage` (`punnamood_cart_v1`).

On load and after every cart change, the store hydrates line items from `catalogService` (JSON today, API-ready tomorrow). Totals come from `src/utils/pricing.js`:

- line total = price × quantity
- subtotal = sum of line totals
- discount = sum of (mrp − price) × quantity
- grand total = subtotal

Getters: `totalItems`, `subtotal`, `totalDiscount`, `grandTotal`.

## Invoice generation

1. Cart → **Proceed to Invoice** → `/checkout`
2. Customer name, phone, and address are validated (`src/utils/validation.js`)
3. Empty carts cannot generate an invoice
4. `invoiceNumber.js` issues `INV-YYYYMMDD-001` using a localStorage sequence
5. The snapshot is kept in the invoice Pinia store and `sessionStorage` so refresh on `/invoice` still works
6. Print / Save as PDF call `window.print()` with CSS that hides header, footer, and buttons

## Adding or editing products

Edit `src/data/products.json` and `src/data/categories.json`. Keep `categoryId` aligned with a category `id`. Then run:

```bash
npm run generate:placeholders
```

Replace the generated SVG in `public/products/` with a real photo if you have one. Use the same filename as `image` in JSON.

Required product fields: `id`, `name`, `slug`, `category`, `categoryId`, `brand`, `weight`, `unit`, `mrp`, `price`, `discount`, `image`, `description`, `inStock`.

Optional: `stockQty`, `featured`, `popular`.

## Phase 2 (not in this build)

Do **not** look for these here — they are explicitly out of Phase 1:

- Go/Gin API, PostgreSQL/MySQL
- Authentication, registration, login
- Online payment and real order processing
- Admin dashboard, delivery, live inventory, multi-store
- `GET /api/products` and server-side cart endpoints

To prepare for Phase 2, swap implementations inside `src/services/catalogService.js`, `src/stores/cart.js`, and `src/services/invoiceNumber.js` without rewriting the Vue views.
