// 所有关于频道的接口
import request from '@/utils/request'

/**
 * 获取我的频道
 * @returns Promise
 */
export const getChannelApi = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannelApi = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * 删除频道
 * @param {String,Number} id 频道的id
 * @returns Promise
 */
export const delChannelApi = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 * 新增频道
 * @param {String,Number} id 频道的id
 * @param {Number} seq 需要添加的位置
 * @returns Promise
 */
export const addChannelApi = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
