// 所有关于频道的接口
import request from '@/utils/request'

export const getChannelApi = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannelApi = () => {
  return request({
    url: '/v1_0/channels'
  })
}
