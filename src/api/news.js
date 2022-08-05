import request from '@/utils/request'

/**
 *
 * @param {*} channelId 频道id
 * @param {*} timestamp 请求第一页数据传当前的时间戳，请求上一页传上一页的时间戳
 * @returns Promise
 */
export const getNewsAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
