import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    category,
    cart
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage
    createPersistedState({
      // 本地存储名字
      key: 'erabbit-client-pc-store',
      // 指定需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
