import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/Home.vue'), meta: { title: 'Home' } },
  { path: '/products', name: 'products', component: () => import('@/views/Products.vue'), meta: { title: 'Products' } },
  { path: '/products/:slug', name: 'product-details', component: () => import('@/views/ProductDetails.vue'), meta: { title: 'Product' } },
  { path: '/categories', name: 'categories', component: () => import('@/views/Categories.vue'), meta: { title: 'Categories' } },
  { path: '/cart', name: 'cart', component: () => import('@/views/Cart.vue'), meta: { title: 'Cart' } },
  { path: '/checkout', name: 'checkout', component: () => import('@/views/Checkout.vue'), meta: { title: 'Customer details' } },
  { path: '/invoice', name: 'invoice', component: () => import('@/views/InvoicePage.vue'), meta: { title: 'Invoice' } },
  { path: '/about', name: 'about', component: () => import('@/views/About.vue'), meta: { title: 'About' } },
  { path: '/contact', name: 'contact', component: () => import('@/views/Contact.vue'), meta: { title: 'Contact' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue'), meta: { title: 'Not found' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const page = to.meta.title ? `${to.meta.title} · ` : ''
  document.title = `${page}Punnamoottil Super Market`
})

export default router
