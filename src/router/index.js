import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

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

const MemberLayout = () => import('@/views/member/Layout.vue')
const MemberHome = () => import('@/views/member/home/index.vue')
const MemberOrder = () => import('@/views/member/order/index.vue')
const MemberOrderDetail = () => import('@/views/member/order/detail.vue')

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
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          {
            path: '/member/order/',
            component: { render: () => h(<RouterView />) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberOrderDetail }
            ]
          }
        ]
      },
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
