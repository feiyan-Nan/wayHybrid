// 惊喜相关接口
import request from '@/utils/requestToken'

// 我的积分头信息
export function myJpointHeadApi (data) {
  return request({
    url: '/surprise/index/my_jpoint_head',
    method: 'POST',
    data
  })
}

// 我的积分支出明细
export function myJpointDetailApi (data) {
  return request({
    url: '/surprise/index/my_jpoint_detail',
    method: 'POST',
    data
  })
}

// 礼物详情页 activity_detail
export function activityDetailApi (data) {
  return request({
    url: '/surprise/index/activity_detail',
    method: 'POST',
    data
  })
}

// 兑换奖品惊喜
export function giftExchangeApi (data, token) {
  return request({
    url: '/surprise/index/exchange',
    method: 'POST',
    data
  }, token)
}

// 获取晒的列表
export function shareGetListApi (data) {
  return request({
    url: '/cont/share/get_list',
    method: 'POST',
    data
  })
}

// 本期lucky box抽奖明细
export function luckyBoxDrawHistoryApi (data) {
  return request({
    url: '/lucky/box/draw_history',
    method: 'POST',
    data
  })
}
