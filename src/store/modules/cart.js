// 购物车模块

export default {
  namespaced: true,
  state () {
    return {
      // 购物车列表
      list: []
    }
  },
  getters: {
    // 有效商品 列表
    validList (state) {
      // 库存大于0 stock，商品有效标识为true isEffective
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总结额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    }
  },
  mutations: {
    insertCart (state, payload) {
      // 约定加入购物车字段 必须和后端保持一致
      // 分别是：id,skuId,name,attrsText,picture,price,nowPrice,selected,stock,count,isEffective
      // 插入数据规则，先找是否有相同的商品，如果有（查询他的数量，累加到payload上，在保存最新位置,原来商品需要删除）
      // 没有（保存在最新位置即可）
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    }
  },
  actions: {
    insertCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登陆
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    }
  }
}
