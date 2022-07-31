import request from '@/utils/requst'
/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns promise
 */

// axios中做了封装,POST请求 自动加了content-type a'pplaycation/json
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 *
 * @param {String} mobile
 * @returns promise
 */
export const getCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
