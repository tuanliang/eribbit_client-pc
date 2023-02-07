// 订单相关的API函数

import request from "@/utils/request"

// 结算页面-生成订单
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

// 添加收货地址
export const addAddress = (form) => {
  return request('/member/address', 'post', form)
}

// 提交订单
export const submitOrder = (order) => {
  return request('/member/order', 'post', order)
}

// 获取订单详情
export const findOrderDetail = (orderId) => {
  return request('/member/order/' + orderId, 'get')
}

/**
 * 获取订单列表
 * @param {String} page -  页码
 * @param {String} pageSize -  每页条数
 * @param {String} orderState - 订单状态 1为待付款 2为代发货 3为待收货 4为待评价 5为已完成 6为已取消 为传参数或为0为全部
 * @returns
 */
export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request('/member/order', 'get', { page, pageSize, orderState })
}
