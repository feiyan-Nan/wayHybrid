import request from '@/utils/request'

//  lucky box详情页接口
export function luckBoxDetailApi (data) {
  return request({
    url: '/lucky/box/get_detail',
    method: 'POST',
    data
  })
}
