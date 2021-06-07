// 分享话题的接口
import request from '@/utils/request'

// 获取动态的详情
export function getDynamicDetailApi (id) {
  return request({
    url: `/share/toShare?id=${id}`,
    method: 'GET'
  })
}
