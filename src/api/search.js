import request from '@/utils/request'
/**
 *搜索建议
 * @param {String} q 关键词
 * @returns
 */
export const getSuggestionApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 搜索结果
 * @param {Number} page
 * @param { Number} per_page
 * @param {String} q
 * @returns
 */
export const getResultApi = (/*eslint-disable-line*/ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
