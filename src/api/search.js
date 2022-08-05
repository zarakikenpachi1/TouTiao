import request from '@/utils/request'
/**
 *获取搜索建议
 * @param {String} q
 * @returns promise
 */
export const getsearchSuggestionApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
