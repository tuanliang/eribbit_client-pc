// 购物车模块

import { getNewCartGoods } from "@/api/cart"

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
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 已选商品列表
    selectedList (state, getters) {
      // 库存大于0 stock，商品有效标识为true isEffective
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品总件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length !== 0 && (getters.selectedList.length === getters.validList.length)
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
    },
    // 修改购物车商品
    updateCart (state, goods) {
      // goods 商品信息：nowPrice stock isEffective
      // goods 商品对象的字段不固定，对象中有哪些字段就改哪些字段，字段的值合理才改
      // goods 商品对象 必须有skuId
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 伤处购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 批量删除
    batchDeleteCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登陆
        } else {
          // 未登录
          // 找出选中的商品列表,遍历调用删除的mutations
          ctx.getters.selectedList.forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 全选与取消全选
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登陆
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改i购物车（选中状态，数量）
    updateCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登陆
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
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
    },
    // 获取商品列表
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 一登陆
        } else {
          // 未登录
          // 同时发送请求（有几个商品发几个请求）等所有请求成功，一并去修改本地数据
          // Promise.all(promise数组).then((dataList=>{})) 同时发送请求，所有请求成功，得到所有成功结果
          const promiseArr = ctx.state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr).then(dataList => {
            // 跟新购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 调用resolve代表操作成功
            resolve()
          })
        }
      })
    },
    // 删除购物车
    deleteCart (ctx, payload) {
      // payload就是skuId
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登陆
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    }
  }
}
