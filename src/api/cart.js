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

/**
 * 返回购物车数据
 * @returns
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入购物车
 * @param {String} skuId - skuId
 * @param {Integer} count - 加入购物车数量
 * @returns
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除购物车商品，支持批量
 * @param {Array<string>} ids -skuId的集合
 * @returns
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}
