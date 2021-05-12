import request from '@/utils/request'
import requestToken from '@/utils/requestToken'

// 获取文章/状态详情
export function contInfoApi (data) {
  return request({
    url: '/cont/info',
    method: 'POST',
    data
  })
}

// 获取评论列表
export function commentListApi (data) {
  return request({
    url: '/cont_comment/list',
    method: 'POST',
    data
  })
}

// 关注
export function followApi (data) {
  return requestToken({
    url: '/user/follow/follow',
    method: 'POST',
    data
  })
}

// 取消关注
export function unFollowApi (data) {
  return requestToken({
    url: '/user/follow/unfollow',
    method: 'POST',
    data
  })
}

// 对评论点赞
export function likeCommentApi (data) {
  return requestToken({
    url: '/cont_comment/like_comment',
    method: 'POST',
    data
  })
}

// 取消评论点赞
export function cancelLikeCommentApi (data) {
  return requestToken({
    url: '/cont_comment/cancel_like_comment',
    method: 'POST',
    data
  })
}

// 添加用户浏览数
export function addUserbrowseCntApi (data) {
  return requestToken({
    url: '/cont/add_userbrowse_cnt',
    method: 'POST',
    data
  })
}
