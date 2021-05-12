// 分享的活动的接口
import request from '@/utils/request'

// 获取活动的信息
export function getEventDetailApi (data) {
  return request({
    url: '/event/v1/detail',
    method: 'POST',
    data
  })
}

//  线下活动详情页晒活动列表
export function getContListApi (data) {
  return request({
    url: '/event/offline/get_cont_list',
    method: 'POST',
    data
  })
}
