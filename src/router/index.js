import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../plugins/firebase'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default'),
    meta: {
      requiresAuth: true
    },
    children: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: () => import('../views/Produtos.vue')
    },
    {
      path: '/venda',
      name: 'Venda',
      component: () => import('../views/Venda.vue')
    },
  ],
  },
  {
    path: '/',
    component: () => import('@/layouts/Blank'),
    children: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    }
   ]
 },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})


export default router
