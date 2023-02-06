import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const LayOut = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const Cart = () => import('@/views/cart/index')

const Login = () => import('@/views/login/index')
const LoginCallBack = () => import('@/views/login/callback')

const Checkout = () => import('@/views/member/pay/checkout.vue')
const Pay = () => import('@/views/member/pay/index.vue')
const PayResult = () => import('@/views/member/pay/result.vue')

// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: LayOut,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout },
      { path: '/member/pay', component: Pay },
      { path: '/pay/callback', component: PayResult },
    ]
  },
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallBack }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登陆的路由：地址是以 /member开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
