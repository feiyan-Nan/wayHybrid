// 个人主页相关的接口
import request from '@/utils/request'

// 我的-用户接口
export function infoApi (data) {
  return request({
    url: '/user/index/info',
    method: 'POST',
    data
  })
}

// 我的内容列表接口
export function contListApi (data) {
  return request({
    url: '/user/index/share/cont_list',
    method: 'POST',
    data
  })
}
