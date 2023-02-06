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
