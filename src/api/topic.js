// 分享话题的接口
import request from '@/utils/request'

// 获取话题的详情
export function getEventDetailApi (data) {
  return request({
    url: `/topic/h5/info?topicId=${data}`,
    method: 'POST'
  })
}

//  话题讨论内容列表
export function getContListApi (currentPage, topicId) {
  return request({
    url: `userDynamic/h5/relation/recommend?currentPage=${currentPage}&topicId=${topicId}`,
    method: 'GET',
  })
}
