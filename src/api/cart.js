// 封装购物车相关的API函数
import request from "@/utils/request"

/**
 * 获取商品的最新价格 库存 是否有效
 * @param {String} skuId
 * @returns
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应的sku数据
 * @param {String} skuId - skuId
 * @returns
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 和并购物车
 * @param {Array<Object>} cartList - 购物车信息列表
 * @param {String} Object.skuId - skuId
 * @param {Boolean} Object.selected - 选中状态
 * @param {Integer} Object.count - 数量
 * @returns
 */
export const mergeCart = (cartList) => {
  return request(`/member/cart/merge`, 'post', cartList)
}
