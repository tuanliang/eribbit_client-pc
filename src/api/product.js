// 提供商品相关的API函数
import request from "@/utils/request"

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 * @returns
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * 获取推荐商品 | 猜你喜欢
 * @param {String} id - 商品ID，传入id是商品推荐，不传是猜你喜欢
 * @param {Interger} limit - 商品数量
 * @returns
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}
