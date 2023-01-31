// 用户相关的接口

import request from "@/utils/request"

/**
 * 账号密码登录
 * @param {String} account -账号
 * @param {String} password -密码
 * @returns Promis
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
