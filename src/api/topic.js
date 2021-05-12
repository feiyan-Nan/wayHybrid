// 分享话题的接口
import request from '@/utils/request'

// 获取话题的详情
export function getEventDetailApi (data) {
  return request({
    url: '/event/v1/online/detail',
    method: 'POST',
    data
  })
}

//  线下话题讨论内容列表
export function getContListApi (data) {
  return request({
    url: 'event/v1/online/topic/get_cont_list',
    method: 'POST',
    data
  })
}
