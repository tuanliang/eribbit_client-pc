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

/**
 * 获取热销榜数据
 * @param {String} id - 商品ID
 * @param {Interger} limit - 商品数量
 * @param {Interger} type - 热销类型：1为24小时，2为周榜，3为总榜，默认为1
 * @returns
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
  return request('/goods/hot', 'get', { id, limit, type })
}
