// import store from '@/store'
import request from '@/utils/request'
import storage from '@/utils/storage'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
    // headers: {
    //   // Bearer 后面一定要有空格
    //   Authorization: 'Bearer ' + store.state.tokenObj.token
    // }
  })
}

export const getAllChannels = () =>
  request({
    url: '/v1_0/channels'
  })

export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 * 添加频道
 * @param {*} id 频道id
 * @param {*} seq 添加频道的索引号
 * @returns Promise
 */
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// 设置本地存储
const TOUTIAO_CHANNELS = 'TOUTIAO_CHANNELS'

export const setMyChannelsToLocal = (myChannels) => {
  storage.set(TOUTIAO_CHANNELS, myChannels)
}

export const getMyChannelByLocal = () => {
  return storage.get(TOUTIAO_CHANNELS)
}
