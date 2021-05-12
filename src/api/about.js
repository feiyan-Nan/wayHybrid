// 关于我们的接口
import request from '@/utils/request'
// 获取版本信息
export function recentVersionApi (data) {
  return request({
    url: '/version/recent',
    method: 'POST',
    data
  })
}
